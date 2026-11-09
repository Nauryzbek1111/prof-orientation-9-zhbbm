"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Жүйеден шығу кезінде қате пайда болды.");
    }
  }
  return <button className="button button-light" onClick={logout}>Жүйеден шығу</button>;
}
