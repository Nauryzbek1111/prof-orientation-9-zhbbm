"use client";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useMemo, useState } from "react";

type Row={name:string;className:string;code:string};
const demo:Row[]=[
{name:"Оқушы 001",className:"1 «А»",code:"••••••"},
{name:"Оқушы 002",className:"1 «А»",code:"••••••"},
{name:"Оқушы 003",className:"1 «Ә»",code:"••••••"},
{name:"Оқушы 004",className:"2 «А»",code:"••••••"}
];
export default function StudentsPage(){
 const [rows,setRows]=useState<Row[]>(demo); const [query,setQuery]=useState(""); const [fileName,setFileName]=useState("");
 const filtered=useMemo(()=>rows.filter(r=>(r.name+" "+r.className).toLowerCase().includes(query.toLowerCase())),[rows,query]);
 function handleFile(file?:File){if(!file)return;setFileName(file.name);alert("Файл таңдалды. Нақты Excel импортын серверлік API және дерекқор қосылғаннан кейін іске қосамыз. Қазір файл серверге жіберілмейді.");}
 return <main className="dashboard-page"><header className="topbar"><div className="brand"><span className="brand-mark">P</span><div><b>Профориентация 9 ЖББМ</b><small>Оқушылар базасы</small></div></div><div style={{display:"flex",gap:8,alignItems:"center"}}><Link className="button button-light" href="/admin">← Әкімші панелі</Link><LogoutButton /></div></header><section className="dashboard-content"><div className="eyebrow">ӘКІМШІ · ДЕРЕКТЕР</div><h1>Оқушылар базасы</h1><p className="muted">Оқушыларды сынып бойынша іздеу және тізімді импорттауға арналған бөлім.</p><div className="toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Оқушыны немесе сыныпты іздеу..."/><label className="button button-primary upload">Excel/CSV таңдау<input type="file" accept=".xlsx,.xls,.csv" onChange={e=>handleFile(e.target.files?.[0])}/></label></div>{fileName&&<p className="muted">Таңдалған файл: {fileName}</p>}<div className="table-wrap"><table><thead><tr><th>№</th><th>Оқушы</th><th>Сынып</th><th>Кіру коды</th><th>Мәртебе</th></tr></thead><tbody>{filtered.map((r,i)=><tr key={r.name}><td>{i+1}</td><td>{r.name}</td><td>{r.className}</td><td>{r.code}</td><td><span className="status">Демо</span></td></tr>)}</tbody></table></div><div className="notice"><b>Дербес деректер:</b> бұл бетте нақты оқушы аты-жөні немесе кіру коды көрсетілмейді. Excel импортын іске қосқанда файл сервер жағында тексеріліп, кодтар ашық мәтін түрінде сақталмауы тиіс.</div></section></main>
}
