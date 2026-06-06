import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env file manually since dotenv might not be configured for node scripts
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = envContent.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function test() {
    // Get any order ID to test
    const { data: orderList } = await supabase.from('orders').select('id').limit(1);
    if (!orderList || orderList.length === 0) {
        console.log("No orders found");
        return;
    }
    const orderId = orderList[0].id;
    console.log("Testing order ID:", orderId);

    const { data: order, error } = await supabase
        .from('orders')
        .select(`*,addresses(*), customers(full_name, email), order_items(quantity, price, variants(color_name,storage, products(name, images)))`)
        .eq('id', orderId)
        .single();

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Order Data:", JSON.stringify(order, null, 2));
    }
}

test();
