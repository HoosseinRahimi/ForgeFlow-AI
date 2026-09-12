import { useState } from 'react'

import AgentReviewPanel from './components/AgentReviewPanel'
import OverviewPanel from './components/OverviewPanel'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'agent-review', label: 'Multi-agent Review' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)

  return (
    <main>
      <header className="hero">
        <div>
          <span className="eyebrow">COMMUNITY EDITION · v0.15.0</span>
          <h1>ForgeFlow AI</h1>
          <p>Runnable project intelligence with a deliberately safe public boundary.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span className="pill">🏢 Team: QuantumLeap Core</span>
          <span className="pill">🌐 EN · DE · FA</span>
          <span className="pill">FastAPI + React + Docker</span>
        </div>
      </header>

      <nav className="tabs" aria-label="Cockpit views">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'tab active' : 'tab'}
            aria-pressed={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && <OverviewPanel />}
      {activeTab === 'agent-review' && <AgentReviewPanel />}

      <footer>
        <p>This Community Edition contains demo data and public-only logic. Production credentials, private team data, grading/submission records and internal GitHub write automation remain private.</p>
      </footer>
    </main>
  )
}
