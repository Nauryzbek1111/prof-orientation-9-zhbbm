"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Area = "R"|"I"|"A"|"S"|"E"|"C";
type Question = { text: string; area: Area };
const questions: Question[] = [
 {text:"Құрал-саймандармен жұмыс істеп, бір нәрсені құрастыру маған қызық.",area:"R"},
 {text:"Техника немесе құрылғының қалай жұмыс істейтінін зерттегенді ұнатамын.",area:"R"},
 {text:"Күрделі сұрақтардың жауабын іздеп, тәжірибе жасаған ұнайды.",area:"I"},
 {text:"Ақпаратты талдап, заңдылықтар мен себептерді анықтауға қызығамын.",area:"I"},
 {text:"Сурет салу, музыка, дизайн немесе шығармашылық жобалар ұнайды.",area:"A"},
 {text:"Жаңа идея ойлап тауып, ерекше шешім ұсынғанды ұнатамын.",area:"A"},
 {text:"Адамдарға көмектесу, түсіндіру және қолдау көрсету маған ұнайды.",area:"S"},
 {text:"Топпен жұмыс істеп, біреуге үйрету немесе кеңес беру қызық.",area:"S"},
 {text:"Топты ұйымдастырып, бастама көтергенді ұнатамын.",area:"E"},
 {text:"Жобаны таныстырып, адамдарды ортақ мақсатқа жұмылдыра аламын.",area:"E"},
 {text:"Құжаттарды реттеу, жоспар құру және нақты ережемен жұмыс істеу ұнайды.",area:"C"},
 {text:"Мәліметтерді кестеге енгізіп, жұмысты мұқият тексергенді ұнатамын.",area:"C"}
];
const labels: Record<Area,string> = {R:"Практикалық-техникалық",I:"Зерттеушілік-аналитикалық",A:"Шығармашылық",S:"Әлеуметтік-көмек көрсету",E:"Кәсіпкерлік-ұйымдастырушылық",C:"Жүйелі-әкімшілік"};
const descriptions: Record<Area,string> = {
 R:"Қолмен жасап көру, техника, жабдықтар және нақты практикалық міндеттер.",
 I:"Зерттеу, талдау, ғылым, деректер және мәселенің шешімін іздеу.",
 A:"Шығармашылық, дизайн, өнер, контент және жаңа идеялар.",
 S:"Адамдармен қарым-қатынас, оқыту, қолдау және қоғамға пайда келтіру.",
 E:"Көшбасшылық, бастама, келіссөз, жоба және кәсіпкерлік.",
 C:"Жоспарлау, есеп, құжат, тәртіп және ақпаратты жүйелеу."
};
export default function CareerTest(){
 const [answers,setAnswers]=useState<Record<number,number>>({});
 const [done,setDone]=useState(false);
 const [saved,setSaved]=useState(false);
 const score=useMemo(()=>{const s:Record<Area,number>={R:0,I:0,A:0,S:0,E:0,C:0};questions.forEach((q,i)=>s[q.area]+=answers[i]||0);return s;},[answers]);
 const ranking=(Object.keys(score) as Area[]).sort((a,b)=>score[b]-score[a]);
 useEffect(()=>{if(done){localStorage.setItem("prof-orientation-last-result",JSON.stringify({score,completedAt:new Date().toISOString()}));setSaved(true);}},[done,score]);
 const completed=Object.keys(answers).length;
 return <main className="dashboard-page"><header className="topbar"><div className="brand"><span className="brand-mark">P</span><div><b>Профориентация 9 ЖББМ</b><small>Кәсіби бағдар сауалнамасы</small></div></div><Link className="button button-light" href="/student">Кабинетке қайту</Link></header><section className="dashboard-content"><div className="eyebrow">ӨЗІҢДІ ТАНЫ</div><h1>{done?"Сауалнама нәтижесі":"Қызығушылық картасы"}</h1>{!done?<><p className="muted">Әр тұжырымды оқып, өзіңе қаншалықты сәйкес келетінін белгіле.</p><div className="notice">1 — мүлде ұнамайды · 2 — онша ұнамайды · 3 — бейтарап · 4 — ұнайды · 5 — өте ұнайды</div><div className="notice">Жауап берілді: {completed} / {questions.length}</div>{questions.map((q,i)=><article className="role-card" key={i} style={{marginBottom:14}}><span className="role-tag">СҰРАҚ {i+1} / {questions.length}</span><h2 style={{fontSize:18}}>{q.text}</h2><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:16}}>{[1,2,3,4,5].map(v=><button key={v} className={`button ${answers[i]===v?"button-primary":"button-light"}`} onClick={()=>setAnswers(p=>({...p,[i]:v}))}>{v}</button>)}</div></article>)}<button className="button button-primary" disabled={completed!==questions.length} onClick={()=>setDone(true)}>Нәтижені есептеу →</button></>:<><p className="muted">Сенің жауаптарың бойынша басым қызығушылық бағыттары:</p>{ranking.map((a,index)=><article className="role-card" key={a} style={{marginBottom:12}}><span className="role-tag">{index===0?"БАСЫМ БАҒЫТ":index===1?"ҚОСЫМША БАҒЫТ":"БАҒЫТ"}</span><h2>{labels[a]} — {score[a]} / 10</h2><p>{descriptions[a]}</p><div style={{height:8,background:"#e8edf0",borderRadius:8,overflow:"hidden"}}><div style={{height:"100%",width:`${score[a]*10}%`,background:"#315f55",borderRadius:8}}/></div></article>)}<div className="notice">Нәтиже осы браузерде сақталды: {saved?"иә":"сақталуда"}. Бұл ғылыми диагноз немесе кәсіби жарамдылық қорытындысы емес. Таңдау кезінде пәндерге қызығушылықты, оқу жетістігін, мүмкіндіктерді және психолог кеңесін бірге ескер.</div><button className="button button-light" onClick={()=>{setAnswers({});setDone(false);}}>Қайта тапсыру</button></>}</section></main>;
}
