
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olshzxnrrlmjzurqvarx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc2h6eG5ycmxtanp1cnF2YXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTU2MTcsImV4cCI6MjA4MDc5MTYxN30.cOdpePUGwWvcypsTqtcXO--4nl72q9nwA1xwWR6U5VY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function probe() {
    console.log("--- PROBING ---");

    // 1. Check Products (known good?)
    const { data: prodData, error: prodError } = await supabase.from('products').select('*').limit(1);
    console.log("Products Check:", prodError ? `ERROR: ${prodError.message}` : `SUCCESS: Found ${prodData.length} items`);

    // 2. Check Orders
    const { data: orderData, error: orderError } = await supabase.from('orders').select('*').limit(1);
    console.log("Orders Check:", orderError ? `ERROR: ${orderError.message}` : `SUCCESS: Found ${orderData.length} items`);

    if (orderError && orderError.code === '42P01') { // undefined_table
        console.log("Table 'orders' does not exist. Trying 'Orders'...");
        const { data: OrderData, error: OrderError } = await supabase.from('Orders').select('*').limit(1);
        console.log("Orders (Case Sensitive) Check:", OrderError ? `ERROR: ${OrderError.message}` : `SUCCESS: Found ${OrderData.length} items`);
    }

}

probe();
