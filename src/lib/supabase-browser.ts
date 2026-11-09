import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase баптаулары табылмады. Vercel Environment Variables бөлімін тексеріңіз.");
  return createBrowserClient(url, anonKey);
}
