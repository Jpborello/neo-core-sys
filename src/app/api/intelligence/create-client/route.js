import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, password, name, plan, monthlySearches, monthlyAiAnalysis } = await request.json();

        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: 'Service role key not configured' },
                { status: 500 }
            );
        }

        // 1. Create user in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (authError) {
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        const userId = authData.user.id;

        // 2. Insert client in clients table
        const { error: clientError } = await supabaseAdmin
            .from('clients')
            .insert({
                id: userId,
                name,
                plan,
                subscription_status: 'active',
                mrr: plan === 'single' ? 200000 : 500000,
                active: true,
                contact_email: email
            });

        if (clientError) {
            return NextResponse.json({ error: clientError.message }, { status: 400 });
        }

        // 3. Create quota
        const { error: quotaError } = await supabaseAdmin
            .from('client_quotas')
            .insert({
                client_id: userId,
                monthly_searches: monthlySearches,
                monthly_ai_analysis: monthlyAiAnalysis,
                searches_used: 0,
                ai_analysis_used: 0
            });

        if (quotaError) {
            return NextResponse.json({ error: quotaError.message }, { status: 400 });
        }

        // 4. Create API key
        const apiKey = `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        const { error: keyError } = await supabaseAdmin
            .from('api_keys')
            .insert({
                client_id: userId,
                key: apiKey,
                name: 'API Key Principal',
                active: true
            });

        if (keyError) {
            return NextResponse.json({ error: keyError.message }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            userId,
            email,
            apiKey
        });

    } catch (error) {
        console.error('Error creating client:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
