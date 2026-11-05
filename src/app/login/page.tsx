"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("student");
  return <main className="login-wrap">
    <Link href="/" className="back-link">← Басты бет</Link>
    <section className="login-card">
      <div className="brand"><span className="brand-mark">P</span><div><b>Профориентация 9 ЖББМ</b><small>№9 жалпы білім беретін мектеп</small></div></div>
      <div className="eyebrow login-eyebrow">ЖЕКЕ КАБИНЕТ</div><h1>Жүйеге кіру</h1><p className="muted">Өзіңізге берілген деректерді пайдаланыңыз.</p>
      <label>Пайдаланушы рөлі</label>
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="student">Оқушы</option><option value="class_teacher">Сынып жетекшісі</option><option value="psychologist">Педагог-психолог</option><option value="admin">Әкімші</option>
      </select>
      <label>Логин немесе оқушы коды</label><input placeholder="Логинді енгізіңіз" autoComplete="username"/>
      <label>Құпиясөз</label><input type="password" placeholder="Құпиясөзді енгізіңіз" autoComplete="current-password"/>
      <button className="button button-primary full" onClick={()=>alert("Бұл интерфейс әзірге демонстрациялық. Нақты авторизация Supabase қосылғаннан кейін іске қосылады.")}>Кіру <span>→</span></button>
      <div className="security-note">Қауіпсіздік үшін жеке кіру деректеріңізді басқа адамдарға бермеңіз.</div>
    </section>
  </main>;
}
