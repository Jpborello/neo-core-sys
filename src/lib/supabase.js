import { createClient } from '@supabase/supabase-js';

// Intelligence Supabase (separate from main Neo Core Sys)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only throw if we are trying to use the client and keys are missing,
// OR simpler: just return null if missing and handle nulls at use sites.
// For now, let's just log a warning instead of throwing error during module load
// which breaks build time static analysis.

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const supabaseAdmin = supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : null;

if (!supabaseUrl && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ Missing Supabase Environment Variables');
}

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
