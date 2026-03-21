import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

async function test() {
  const { data, error } = await supabase.storage.from('product-images').upload('test.txt', 'hello', { upsert: true });
  if (error) {
    console.error("STORAGE ERROR:", error);
  } else {
    console.log("STORAGE SUCCESS:", data);
  }
}

test();
