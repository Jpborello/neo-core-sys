
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olshzxnrrlmjzurqvarx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc2h6eG5ycmxtanp1cnF2YXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTU2MTcsImV4cCI6MjA4MDc5MTYxN30.cOdpePUGwWvcypsTqtcXO--4nl72q9nwA1xwWR6U5VY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAll() {
    console.log("--- CHECKING REMAINING COLUMNS ---");

    const columnsCheck = ['items', 'total', 'status', 'payment_status'];

    for (const col of columnsCheck) {
        const { error } = await supabase.from('orders').select(col).limit(1);
        console.log(`${col}: ${error ? "MISSING" : "EXISTS"}`);
    }
}

checkAll();
