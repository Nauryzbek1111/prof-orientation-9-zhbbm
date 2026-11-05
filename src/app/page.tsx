import Link from "next/link";

const features = [
  ["01", "Кәсіби диагностика", "Қызығушылық пен қабілетті анықтауға арналған тесттер."],
  ["02", "Жеке ұсыныстар", "Оқушы нәтижесіне сәйкес мамандық бағыттарын ұсыну."],
  ["03", "Нәтижелер аналитикасы", "Мектеп мамандары мен сынып жетекшілеріне арналған есептер."]
];

export default function Home() {
  return <main>
    <header className="topbar"><div className="brand"><span className="brand-mark">P</span><div><b>Профориентация 9 ЖББМ</b><small>№9 жалпы білім беретін мектеп</small></div></div><Link className="button button-light" href="/login">Жүйеге кіру</Link></header>
    <section className="hero">
      <div className="eyebrow">БОЛАШАҚ МАМАНДЫҚҚА БІР ҚАДАМ</div>
      <h1>Өз қабілетіңді таны.<br/><em>Болашағыңды таңда.</em></h1>
      <p>Оқушылардың қызығушылығы мен қабілетін анықтауға, мамандық таңдауға бағыт беретін мектеп платформасы.</p>
      <Link className="button button-primary" href="/login">Платформаға өту <span>→</span></Link>
      <div className="hero-note">№9 жалпы білім беретін мектеп · Кәсіби бағдар беру жүйесі</div>
    </section>
    <section className="features"><div className="section-heading"><div className="eyebrow">ПЛАТФОРМА МҮМКІНДІКТЕРІ</div><h2>Саналы таңдау —<br/>сенімді болашақ.</h2></div><div className="feature-grid">{features.map(([n,t,d])=><article className="feature-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
    <footer>© 2026 Профориентация 9 ЖББМ · №9 ЖББМ</footer>
  </main>;
}
