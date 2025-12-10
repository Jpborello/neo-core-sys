
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olshzxnrrlmjzurqvarx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc2h6eG5ycmxtanp1cnF2YXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTU2MTcsImV4cCI6MjA4MDc5MTYxN30.cOdpePUGwWvcypsTqtcXO--4nl72q9nwA1xwWR6U5VY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPhone() {
    console.log("--- CHECKING PHONE ---");
    const { error } = await supabase.from('orders').select('customer_phone').limit(1);
    console.log("customer_phone:", error ? "MISSING" : "EXISTS");
}

checkPhone();
