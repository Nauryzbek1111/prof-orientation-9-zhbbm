import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  if (!supabase) {
    return <main className="dashboard-page"><section className="dashboard-content"><h1>Supabase бапталмаған</h1><p className="muted">Администратор панелін ашу үшін Vercel → Settings → Environment Variables бөлімінде Supabase URL және anon key мәндерін енгізіңіз.</p></section></main>;
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile, error } = await supabase.from("profiles").select("role,is_active").eq("id", user.id).maybeSingle();
  if (error || !profile || !profile.is_active) redirect("/login?error=profile");
  if (profile.role !== "admin") redirect("/login?error=role");
  return <>{children}</>;
}
