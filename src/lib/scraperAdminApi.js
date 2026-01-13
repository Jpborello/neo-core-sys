"use client";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for scraper admin

export const scraperAdminApi = {
  // ============================================
  // CLIENTS
  // ============================================
  
  async fetchClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createClient(client) {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select()
      .single();
    
    // Also create quota record
    if (data && !error) {
      await supabase
        .from('client_quotas')
        .insert([{
          client_id: data.id,
          monthly_searches: client.plan === 'single' ? 1000 : 5000,
          monthly_ai_analysis: client.plan === 'single' ? 0 : 200
        }]);
    }
    
    return { data, error };
  },

  async updateClient(id, updates) {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteClient(id) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);
    return { error };
  },

  // ============================================
  // API KEYS
  // ============================================
  
  async fetchAPIKeys(clientId) {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async generateAPIKey(clientId, name = 'Production') {
    // Call the generate_api_key function
    const { data: keyData, error: keyError } = await supabase
      .rpc('generate_api_key');
    
    if (keyError) return { data: null, error: keyError };
    
    const { data, error } = await supabase
      .from('api_keys')
      .insert([{
        client_id: clientId,
        key: keyData,
        name: name
      }])
      .select()
      .single();
    
    return { data, error };
  },

  async revokeAPIKey(keyId) {
    const { data, error } = await supabase
      .from('api_keys')
      .update({ active: false })
      .eq('id', keyId)
      .select()
      .single();
    return { data, error };
  },

  // ============================================
  // QUOTAS
  // ============================================
  
  async fetchQuota(clientId) {
    const { data, error } = await supabase
      .from('client_quotas')
      .select('*')
      .eq('client_id', clientId)
      .single();
    return { data, error };
  },

  async updateQuota(clientId, updates) {
    const { data, error } = await supabase
      .from('client_quotas')
      .update(updates)
      .eq('client_id', clientId)
      .select()
      .single();
    return { data, error };
  },

  async resetQuota(clientId) {
    const { data, error } = await supabase
      .from('client_quotas')
      .update({
        searches_used: 0,
        ai_analysis_used: 0
      })
      .eq('client_id', clientId)
      .select()
      .single();
    return { data, error };
  },

  // ============================================
  // USAGE LOGS
  // ============================================
  
  async fetchUsageLogs(clientId, limit = 100) {
    const { data, error } = await supabase
      .from('usage_logs')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      .limit(limit);
    return { data, error };
  },

  async getClientStats(clientId) {
    const { data, error } = await supabase
      .rpc('get_client_stats', { p_client_id: clientId });
    return { data, error };
  },

  // ============================================
  // SOURCES
  // ============================================
  
  async fetchClientSources(clientId) {
    const { data, error } = await supabase
      .from('client_sources')
      .select('*')
      .eq('client_id', clientId);
    return { data, error };
  },

  async toggleSource(clientId, source) {
    // Check if exists
    const { data: existing } = await supabase
      .from('client_sources')
      .select('*')
      .eq('client_id', clientId)
      .eq('source', source)
      .single();
    
    if (existing) {
      // Toggle enabled
      const { data, error } = await supabase
        .from('client_sources')
        .update({ enabled: !existing.enabled })
        .eq('id', existing.id)
        .select()
        .single();
      return { data, error };
    } else {
      // Create new
      const { data, error } = await supabase
        .from('client_sources')
        .insert([{
          client_id: clientId,
          source: source,
          enabled: true
        }])
        .select()
        .single();
      return { data, error };
    }
  },

  // ============================================
  // DASHBOARD STATS
  // ============================================
  
  async getDashboardStats() {
    // Total clients
    const { count: totalClients } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);
    
    // Total MRR
    const { data: clients } = await supabase
      .from('clients')
      .select('mrr')
      .eq('active', true);
    
    const totalMRR = clients?.reduce((sum, c) => sum + (c.mrr || 0), 0) || 0;
    
    // Requests this month
    const { count: requestsThisMonth } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
    
    return {
      totalClients,
      totalMRR,
      requestsThisMonth
    };
  }
};
