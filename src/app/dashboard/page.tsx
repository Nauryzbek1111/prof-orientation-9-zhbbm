import Link from "next/link";
const roles = [
  {title:"Басқару панелі",desc:"Оқушылар, сыныптар, тесттер және жүйе параметрлері.",tag:"ӘКІМШІ"},
  {title:"Оқушы кабинеті",desc:"Тест тапсыру, жеке нәтиже және мамандық ұсыныстары.",tag:"ОҚУШЫ"},
  {title:"Сынып жетекшісі",desc:"Өз сыныбының кәсіби бағдар нәтижелерін бақылау.",tag:"ПЕДАГОГ"},
  {title:"Психолог кабинеті",desc:"Диагностика нәтижелерін талдау және кеңес беру.",tag:"ПСИХОЛОГ"}
];
export default function Dashboard() {
  return <main className="dashboard-page"><header className="topbar"><div className="brand"><span className="brand-mark">P</span><div><b>Профориентация 9 ЖББМ</b><small>Басқару орталығы · №9 ЖББМ</small></div></div><Link className="button button-light" href="/">Басты бет</Link></header><section className="dashboard-content"><div className="eyebrow">ЖҮЙЕ ҚҰРЫЛЫМЫ</div><h1>Жеке кабинеттер</h1><p className="muted">Әр қызметкер мен оқушыға жеке аккаунт беріледі. Төмендегі бөлімдер — жобаның рөлдік құрылымының көрінісі.</p><div className="role-grid">{roles.map(r=><article className="role-card" key={r.tag}><span className="role-tag">{r.tag}</span><h2>{r.title}</h2><p>{r.desc}</p><span className="coming">Келесі кезеңде іске қосылады</span></article>)}</div><div className="notice"><b>Маңызды:</b> бұл нұсқа — интерфейс пен рөлдер құрылымының прототипі. Нақты аккаунттар, дерекқорға қосылу және рұқсаттарды тексеру әлі бапталуы керек.</div></section></main>;
}
