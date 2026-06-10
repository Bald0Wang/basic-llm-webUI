import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown,
  ArrowUp,
  Atom,
  Brain,
  CheckCheck,
  ChevronDown,
  Headphones,
  ListFilter,
  Menu,
  PanelLeftClose,
  PenLine,
  Plus,
  SquareMenu,
} from 'lucide-react'
import './styles.css'

const seedThreads = [
  '世界杯观赛日历生成',
  '新势力车企数据整理与看板生成',
  '大语言模型科普PPT生成',
]

const originalPrompt = '帮我做一份「3 分钟看懂大语言模型」的科普 PPT,图文并茂,8 页左右,适合给非技术同事讲'

function VakaMark({ size = 22 }) {
  return (
    <span className="vaka-mark" style={{ width: size, height: size }} aria-hidden="true">
      <Headphones size={size} strokeWidth={2.4} />
      <span />
    </span>
  )
}

function IconButton({ label, children, className = '', onClick, active = false, type = 'button' }) {
  return (
    <button
      type={type}
      className={`icon-button ${className} ${active ? 'is-active' : ''}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Sidebar({ open, activeThread, onSelectThread, onNewChat, onClose }) {
  return (
    <>
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="side-head">
          <button className="wordmark" onClick={onNewChat}>vaka</button>
          <IconButton label="收起侧栏" onClick={onClose}>
            <PanelLeftClose size={19} />
          </IconButton>
        </div>

        <nav className="main-nav" aria-label="主导航">
          <button className="nav-item is-active">
            <VakaMark size={21} />
            <span>我的 vaka</span>
          </button>
          <button className="nav-item">
            <Atom size={21} />
            <span>知识中心</span>
          </button>
          <button className="nav-item">
            <Brain size={21} />
            <span>记忆中心</span>
          </button>
        </nav>

        <div className="recent-head">
          <span>最近任务</span>
          <div>
            <IconButton label="筛选任务"><ListFilter size={17} /></IconButton>
            <IconButton label="新建任务" onClick={onNewChat}><PenLine size={17} /></IconButton>
          </div>
        </div>
        <div className="thread-list">
          {seedThreads.map((thread) => (
            <button
              key={thread}
              className={`thread-item ${activeThread === thread ? 'is-current' : ''}`}
              onClick={() => onSelectThread(thread)}
            >
              {thread}
            </button>
          ))}
        </div>

        <button className="profile">
          <span className="avatar">R</span>
          <span className="profile-copy">
            <strong>RootUser_2103109071</strong>
            <small>个人基础版</small>
          </span>
        </button>
      </aside>
      {open && <button className="sidebar-scrim" aria-label="关闭侧栏" onClick={onClose} />}
    </>
  )
}

function AssistantMessage({ completed = false }) {
  return (
    <article className="assistant-message">
      <div className="assistant-name"><VakaMark size={21} /><strong>vaka</strong></div>
      <div className="answer-card">
        <div className="reply-line"><span />回复：{originalPrompt}</div>
        {!completed ? (
          <p>好的，我来帮你生成这份「3 分钟看懂大语言模型」的科普 PPT，完成后通知你。</p>
        ) : (
          <div className="result">
            <p>哈喽，你需要的「3 分钟看懂大语言模型」科普 PPT 已经完成啦，可以开始验收哦～</p>
            <p className="summary-title">成果小结：</p>
            <ol>
              <li>共 8 页内容，篇幅符合你的要求</li>
              <li>内容通俗易懂，专门适配非技术同事的理解水平</li>
              <li>图文结构清晰，适合 3 分钟快速讲解</li>
            </ol>
            <button className="file-row">
              <span className="file-icon"><CheckCheck size={19} /></span>
              <span><strong>3 分钟看懂大语言模型.pptx</strong><small>8 页 · 已生成</small></span>
              <ArrowDown size={19} />
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

function ChatComposer({ onSend }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  function submit() {
    const message = value.trim()
    if (!message) return
    onSend(message)
    setValue('')
    textareaRef.current?.focus()
  }

  return (
    <div className="composer">
      <label htmlFor="chat-input" className="sr-only">向 vaka 发送任务</label>
      <textarea
        id="chat-input"
        ref={textareaRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            submit()
          }
        }}
        placeholder="向 vaka 连续发送多个任务"
        rows={2}
      />
      <IconButton label="添加附件" className="add-button"><Plus size={22} /></IconButton>
      <IconButton label="发送消息" className="send-button" active={Boolean(value.trim())} onClick={submit}>
        <ArrowUp size={21} strokeWidth={2.4} />
      </IconButton>
    </div>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeThread, setActiveThread] = useState(seedThreads[2])
  const [messages, setMessages] = useState([])
  const [tasksOpen, setTasksOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages])

  function newChat() {
    setMessages([])
    setActiveThread('')
    setSidebarOpen(false)
  }

  function sendMessage(message) {
    setMessages((current) => [...current, message])
  }

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        activeThread={activeThread}
        onSelectThread={(thread) => {
          setActiveThread(thread)
          setMessages([])
          setSidebarOpen(false)
        }}
        onNewChat={newChat}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="workspace">
        <header className="topbar">
          <IconButton label="打开侧栏" className="mobile-menu" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </IconButton>
          <button className="workspace-title">我的 vaka <ChevronDown size={16} /></button>
          <div className="top-actions">
            <div className="popover-wrap">
              <IconButton label="任务消息" active={tasksOpen} onClick={() => { setTasksOpen(!tasksOpen); setMenuOpen(false) }}>
                <SquareMenu size={21} />
              </IconButton>
              {tasksOpen && <div className="mini-popover"><strong>任务消息</strong><span>科普 PPT 已生成完成</span></div>}
            </div>
            <div className="popover-wrap">
              <IconButton label="页面选项" active={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setTasksOpen(false) }}>
                <ListFilter size={22} />
              </IconButton>
              {menuOpen && <div className="mini-popover menu-popover"><button>清空当前会话</button><button>导出聊天记录</button></div>}
            </div>
          </div>
        </header>

        <section className="chat-scroll" ref={scrollRef}>
          <div className="conversation">
            <div className="user-message">{originalPrompt}</div>
            <AssistantMessage />
            <AssistantMessage completed />
            {messages.map((message, index) => (
              <React.Fragment key={`${message}-${index}`}>
                <div className="user-message dynamic-message">{message}</div>
                <article className="assistant-message">
                  <div className="assistant-name"><VakaMark size={21} /><strong>vaka</strong></div>
                  <div className="answer-card"><p>收到，我已经把这个新任务加入处理队列，会继续为你跟进。</p></div>
                </article>
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="bottom-dock">
          <IconButton label="滚动到底部" className="jump-button" onClick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })}>
            <ArrowDown size={19} />
          </IconButton>
          <ChatComposer onSend={sendMessage} />
        </div>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
