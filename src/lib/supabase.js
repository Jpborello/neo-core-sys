import { createClient } from '@supabase/supabase-js';

// Intelligence Supabase (separate from main Neo Core Sys)
const supabaseUrl = process.env.NEXT_PUBLIC_INTELLIGENCE_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_INTELLIGENCE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Intelligence Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role (for server-side operations)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : null;

// Helper functions for client authentication
export const clientAuth = {
    // Sign in with email and password
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    // Sign out
    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Get current session
    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        return { session, error };
    },

    // Get current user
    async getUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        return { user, error };
    },

    // Get client data from database
    async getClientData(userId) {
        const { data, error } = await supabase
            .from('clients')
            .select('*, client_quotas(*)')
            .eq('id', userId)
            .single();
        return { data, error };
    },

    // Get client quota
    async getClientQuota(clientId) {
        const { data, error } = await supabase
            .from('client_quotas')
            .select('*')
            .eq('client_id', clientId)
            .single();
        return { data, error };
    },

    // Get client usage logs
    async getUsageLogs(clientId, limit = 10) {
        const { data, error } = await supabase
            .from('usage_logs')
            .select('*')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false })
            .limit(limit);
        return { data, error };
    }
};
