import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env file manually
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = envContent.split('\n').reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val) acc[key.trim()] = val.join('=').trim();
    return acc;
}, {});

const supabaseUrl = env.VITE_SUPABASE_URL.replace(/['"]/g, '');
const supabaseKey = env.VITE_SUPABASE_ANON_KEY.replace(/['"]/g, '');

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const { data: products, error } = await supabase.from('products').select('name, images');
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Products Images:");
        products.forEach(p => console.log(`${p.name}:`, p.images));
    }
}

test();
