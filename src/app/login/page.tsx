"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { UserRole } from "@/lib/roles";

const roleRoutes: Record<UserRole, string> = {
  admin: "/admin",
  student: "/student",
  class_teacher: "/teacher",
  psychologist: "/psychologist"
};

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError || !data.user) throw new Error("Email немесе құпиясөз дұрыс емес.");
      const { data: profile, error: profileError } = await supabase.from("profiles").select("role,is_active").eq("id", data.user.id).maybeSingle();
      if (profileError || !profile || !profile.is_active) {
        await supabase.auth.signOut();
        throw new Error("Бұл аккаунтқа жүйеге кіруге рұқсат берілмеген. Әкімшіге хабарласыңыз.");
      }
      if (profile.role !== role) {
        await supabase.auth.signOut();
        throw new Error("Таңдалған рөл аккаунт рөлімен сәйкес келмейді.");
      }
      router.replace(roleRoutes[profile.role as UserRole]);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Кіру кезінде қате пайда болды.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="login-wrap">
    <Link href="/" className="back-link">← Басты бет</Link>
    <form className="login-card" onSubmit={handleLogin}>
      <div className="brand"><span className="brand-mark">P</span><div><b>Профориентация 9 ЖББМ</b><small>№9 жалпы білім беретін мектеп</small></div></div>
      <div className="eyebrow login-eyebrow">ЖЕКЕ КАБИНЕТ</div><h1>Жүйеге кіру</h1><p className="muted">Өзіңізге берілген аккаунт деректерін пайдаланыңыз.</p>
      <label htmlFor="role">Пайдаланушы рөлі</label>
      <select id="role" value={role} onChange={e=>setRole(e.target.value as UserRole)}>
        <option value="student">Оқушы</option><option value="class_teacher">Сынып жетекшісі</option><option value="psychologist">Педагог-психолог</option><option value="admin">Әкімші</option>
      </select>
      <label htmlFor="email">Email</label><input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@school.kz" autoComplete="username" />
      <label htmlFor="password">Құпиясөз</label><input id="password" type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Құпиясөзді енгізіңіз" autoComplete="current-password" />
      {error && <p role="alert" className="notice">{error}</p>}
      <button className="button button-primary full" type="submit" disabled={busy}>{busy ? "Тексерілуде..." : "Кіру →"}</button>
      <div className="security-note">Қауіпсіздік үшін жеке кіру деректеріңізді басқа адамдарға бермеңіз.</div>
    </form>
  </main>;
}
