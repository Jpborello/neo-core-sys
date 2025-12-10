
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olshzxnrrlmjzurqvarx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc2h6eG5ycmxtanp1cnF2YXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTU2MTcsImV4cCI6MjA4MDc5MTYxN30.cOdpePUGwWvcypsTqtcXO--4nl72q9nwA1xwWR6U5VY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectSchema() {
    console.log("--- INSPECTING ORDERS SCHEMA ---");

    // Attempt to insert a dummy record with NO columns to force an error listing available columns
    // or just fetch one row and look at the keys if any data exists.
    // Better yet, just Select * limit 1

    const { data, error } = await supabase.from('orders').select('*').limit(1);

    if (error) {
        console.error("Read Error:", error);
    }

    if (data && data.length > 0) {
        console.log("Existing columns based on first row:", Object.keys(data[0]));
    } else {
        console.log("No data found to infer columns. Trying to insert with just 'status' to see error...");
        const { error: insertError } = await supabase.from('orders').insert({}).select();
        if (insertError) {
            console.log("Insert returned:", insertError.message);
            console.log("Details:", insertError.details);
            console.log("Hint:", insertError.hint);
        }
    }
}

inspectSchema();
