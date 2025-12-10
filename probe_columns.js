
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olshzxnrrlmjzurqvarx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc2h6eG5ycmxtanp1cnF2YXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTU2MTcsImV4cCI6MjA4MDc5MTYxN30.cOdpePUGwWvcypsTqtcXO--4nl72q9nwA1xwWR6U5VY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function probeColumns() {
    console.log("--- PROBING COLUMNS ---");

    // Test customer_name
    const { error: err1 } = await supabase.from('orders').select('customer_name').limit(1);
    console.log("customer_name:", err1 ? "MISSING (" + err1.message + ")" : "EXISTS");

    // Test name
    const { error: err2 } = await supabase.from('orders').select('name').limit(1);
    console.log("name:", err2 ? "MISSING (" + err2.message + ")" : "EXISTS");

    // Test client_name
    const { error: err3 } = await supabase.from('orders').select('client_name').limit(1);
    console.log("client_name:", err3 ? "MISSING (" + err3.message + ")" : "EXISTS");

    // Test customer
    const { error: err4 } = await supabase.from('orders').select('customer').limit(1);
    console.log("customer:", err4 ? "MISSING (" + err4.message + ")" : "EXISTS");
}

probeColumns();
