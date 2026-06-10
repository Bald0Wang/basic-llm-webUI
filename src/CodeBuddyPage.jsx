import React, { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Download,
  Menu,
  MonitorDown,
  X,
} from 'lucide-react'
import './codebuddy.css'

const A = '/codebuddy/'

const channels = [
  ['微信', 'channel-wechat-BCcm0qV0.svg'],
  ['企业微信', 'channel-wecom-DFuqqOk5.svg'],
  ['QQ', 'channel-dingtalk-BXCv5vsW.svg'],
  ['飞书', 'channel-feishu-DNMbayIH.svg'],
  ['钉钉', 'channel-wechat-mini-rHUsf-VK.svg'],
]

const scenarios = [
  {
    title: 'OPC 一人公司',
    image: 'opc-DPdb3oNr.png',
    user: '个体创业者、自由职业者、小微团队负责人',
    desc: '召唤你的 AI 专家团，覆盖运营、设计、财务、法务、开发等核心岗位。',
  },
  {
    title: '外部信息调研与内容生成',
    image: 'research.png',
    user: '市场研究、竞品分析与内容创作者',
    desc: '自动从网络搜集和分析信息，直接生成结构清晰的调研报告或演示文稿。',
  },
  {
    title: '业务数据洞察与自动化响应',
    image: 'data-insight.png',
    user: '运营、客户成功与业务管理者',
    desc: '自动分析业务数据，提炼问题、总结规律，并生成可执行的指导方案。',
  },
]

function Brand() {
  return <img className="cb-brand" src={`${A}codebuddy-logo-VWvjt0zf.svg`} alt="CodeBuddy" />
}

function DownloadMenu({ open, setOpen }) {
  return (
    <div className="cb-download-wrap">
      <button className="cb-primary" onClick={() => setOpen(!open)}>
        <Download size={20} /> 下载 WorkBuddy <span><ArrowRight size={22} /></span>
      </button>
      {open && (
        <div className="cb-download-menu">
          <button>Mac ARM64 <small>Apple 芯片</small></button>
          <button>Mac x64 <small>Intel 芯片</small></button>
          <button>Windows x64 <small>兼容 ARM64</small></button>
        </div>
      )}
    </div>
  )
}

export default function CodeBuddyPage() {
  const [banner, setBanner] = useState(true)
  const [menu, setMenu] = useState(false)
  const [downloads, setDownloads] = useState(false)

  useEffect(() => {
    document.body.classList.add('cb-body')
    return () => document.body.classList.remove('cb-body')
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }

  return (
    <div className="cb-page">
      <header className="cb-header">
        <Brand />
        <nav className={`cb-nav ${menu ? 'is-open' : ''}`}>
          <button>CodeBuddy <ChevronDown size={15} /></button>
          <button onClick={() => scrollTo('experts')}>WorkBuddy <i>公测</i></button>
          <button>定价 <i className="violet">限时送</i></button>
          <button onClick={() => scrollTo('scenarios')}>文档</button>
          <button>博客</button>
          <button>API文档</button>
          <button>活动</button>
        </nav>
        <div className="cb-header-actions">
          <button className="cb-region">中国站 <ChevronDown size={16} /></button>
          <button className="cb-login">登录</button>
          <button className="cb-header-download" onClick={() => scrollTo('download')}>下载</button>
          <button className="cb-menu-button" aria-label="打开菜单" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {banner && (
        <aside className="cb-banner">
          <strong>与好友分享 WorkBuddy，积分好礼一起拿</strong>
          <button onClick={() => scrollTo('scenarios')}>查看详情 <ArrowRight size={20} /></button>
          <button className="cb-banner-close" aria-label="关闭活动横幅" onClick={() => setBanner(false)}><X size={18} /></button>
        </aside>
      )}

      <main>
        <section className="cb-hero">
          <div className="cb-hero-copy">
            <p className="cb-kicker">Work Smarter, with Experts</p>
            <h1>AI 专家团 全场景办公</h1>
            <div className="cb-description">
              <p>WorkBuddy 是全能 AI 工作台，一人指挥，全行业专家执行，从策略到交付一站搞定</p>
              <p><b>免部署</b> · 安装即用　|　<b>多专家</b> · 多模型协同　|　<b>全平台</b> · 桌面 / 主流 IM / 小程序</p>
            </div>
            <div className="cb-hero-buttons">
              <DownloadMenu open={downloads} setOpen={setDownloads} />
              <button className="cb-outline" onClick={() => scrollTo('experts')}>助理快捷接入指南</button>
            </div>
            <div className="cb-channels">
              {channels.map(([name, icon]) => (
                <button key={name} title={name}><img src={`${A}${icon}`} alt={name} /></button>
              ))}
            </div>
          </div>
          <div className="cb-hero-art">
            <img src={`${A}expert-team-B-YZVeWI.png`} alt="WorkBuddy AI 专家团队" />
            <div className="cb-monitor">
              <img src={`${A}expert-team-intro-poster.png`} alt="WorkBuddy 工作界面" />
            </div>
          </div>
        </section>

        <section className="cb-experts" id="experts">
          <div className="cb-experts-head">
            <Brand />
            <div>
              <span>100+ 领域专家组成你的虚拟团队，全角色场景覆盖</span>
              <h2>一句话指令自主规划并交付完整结果</h2>
              <p>多专家并行协作，一个人顶一支团队</p>
              <p>MCP 生态 + 自定义 Skills，能力无限扩展</p>
            </div>
          </div>
          <div className="cb-experts-media">
            <img src={`${A}expert-team-intro-poster.png`} alt="专家团队协作演示" />
            <div className="cb-cat"><span>Work<br />Buddy</span><img src={`${A}buddy-worker-woRTGfZH.png`} alt="WorkBuddy" /></div>
          </div>
        </section>

        <section className="cb-scenarios" id="scenarios">
          <div className="cb-section-title">
            <span>ONE TEAM, EVERY SCENARIO</span>
            <h2>全场景智能体工作搭子</h2>
            <p>开启 AI Agent 办公新范式</p>
          </div>
          <div className="cb-card-grid">
            {scenarios.map((item) => (
              <article className="cb-card" key={item.title}>
                <img src={`${A}${item.image}`} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p><b>推荐用户：</b>{item.user}</p>
                  <p><b>能力描述：</b>{item.desc}</p>
                  <button>查看典型任务 <ArrowRight size={17} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cb-download-section" id="download">
          <div>
            <span>WORK WITHOUT LIMITS</span>
            <h2>下载 WorkBuddy</h2>
            <p>桌面端深度工作，随时召唤你的 AI 专家团队。</p>
          </div>
          <div className="cb-platforms">
            <article><MonitorDown /><small>macOS 12.0+</small><h3>MAC</h3><button>下载 Apple 芯片版</button></article>
            <article><MonitorDown /><small>Windows 10+</small><h3>Windows</h3><button>下载 Windows x64</button></article>
          </div>
        </section>
      </main>

      <footer className="cb-footer">
        <Brand />
        <p>UI recreation study · Built with React</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>返回顶部 <ArrowDown className="cb-up" size={18} /></button>
      </footer>
    </div>
  )
}
