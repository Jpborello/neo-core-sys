
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olshzxnrrlmjzurqvarx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc2h6eG5ycmxtanp1cnF2YXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTU2MTcsImV4cCI6MjA4MDc5MTYxN30.cOdpePUGwWvcypsTqtcXO--4nl72q9nwA1xwWR6U5VY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
    console.log("Attempting insert...");
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert([{
                table_number: 999,
                customer_name: "Test Node",
                customer_phone: "123",
                items: [],
                total: 0,
                status: "pending",
                payment_status: "pending",
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) {
            console.error("Insert Error:", error);
        } else {
            console.log("Insert Success:", JSON.stringify(data, null, 2));
            // Clean up
            await supabase.from('orders').delete().eq('table_number', 999);
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}

testInsert();
