import React, { useEffect } from 'react'
import { ArrowUpRight, MessageSquareText, Sparkles } from 'lucide-react'
import './series.css'

const works = [
  { href: '/vaka', number: '001', title: 'Vaka Chat', type: 'AI chat workspace', icon: MessageSquareText, tone: 'light' },
  { href: '/codebuddy-work', number: '002', title: 'WorkBuddy', type: 'AI agent product page', icon: Sparkles, tone: 'dark' },
]

export default function SeriesPage() {
  useEffect(() => {
    document.body.classList.add('series-body')
    return () => document.body.classList.remove('series-body')
  }, [])

  return (
    <main className="series-page">
      <header><span>UI STUDIES</span><strong>React Replica Series</strong><small>002 projects</small></header>
      <section>
        <div className="series-intro"><p>界面是产品最诚实的语言。</p><h1>复刻、理解，<br />再把它做得能用。</h1></div>
        <div className="series-list">
          {works.map(({ href, number, title, type, icon: Icon, tone }) => (
            <a href={href} key={href} className={tone}>
              <span>{number}</span><Icon /><div><small>{type}</small><h2>{title}</h2></div><ArrowUpRight />
            </a>
          ))}
        </div>
      </section>
      <footer>Built as an evolving React UI collection.</footer>
    </main>
  )
}
