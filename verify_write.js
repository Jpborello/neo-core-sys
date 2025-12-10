
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olshzxnrrlmjzurqvarx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc2h6eG5ycmxtanp1cnF2YXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTU2MTcsImV4cCI6MjA4MDc5MTYxN30.cOdpePUGwWvcypsTqtcXO--4nl72q9nwA1xwWR6U5VY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testWrite() {
    console.log("--- TESTING WRITE PERMISSIONS ---");

    // Attempt simple insert
    const { data, error } = await supabase
        .from('orders')
        .insert([{
            table_number: 888,
            customer_name: "Node Verify",
            customer_phone: "000",
            items: [],
            total: 1,
            status: "pending",
            payment_status: "pending",
            created_at: new Date().toISOString()
        }])
        .select();

    if (error) {
        console.error("WRITE FAILED:", JSON.stringify(error, null, 2));
    } else {
        console.log("WRITE SUCCESS:", JSON.stringify(data, null, 2));
        // Cleanup
        await supabase.from('orders').delete().eq('table_number', 888);
    }
}

testWrite();
