import { useEffect, useState } from 'react'

const api = async (path, options) => {
  const response = await fetch(path, options)
  if (!response.ok) throw new Error(await response.text())
  return response.json()
}

export default function App() {
  const [health, setHealth] = useState(null)
  const [query, setQuery] = useState('governed automation')
  const [results, setResults] = useState([])
  const [errorText, setErrorText] = useState('CORS error while calling API')
  const [debug, setDebug] = useState([])
  const [proposal, setProposal] = useState(null)

  useEffect(() => {
    api('/api/demo/project-health').then(setHealth).catch(() => setHealth(null))
  }, [])

  const runQuery = async () => {
    const data = await api('/api/demo/repo-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
    setResults(data.results)
  }

  const runDebug = async () => {
    const data = await api('/api/demo/debug', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: errorText }),
    })
    setDebug(data.suggestions)
  }

  const propose = async () => {
    const data = await api('/api/demo/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'create-task', summary: 'Review community release readiness' }),
    })
    setProposal(data)
  }

  const decide = async (approved) => {
    const data = await api(`/api/demo/actions/${proposal.id}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved }),
    })
    setProposal(data)
  }

  return (
    <main>
      <header className="hero">
        <div>
          <span className="eyebrow">COMMUNITY EDITION · v0.14.0</span>
          <h1>ForgeFlow AI</h1>
          <p>Runnable project intelligence with a deliberately safe public boundary.</p>
        </div>
        <div className="pill">FastAPI + React + Docker</div>
      </header>

      <section className="grid">
        <article className="card score-card">
          <h2>Project Health</h2>
          <div className="score">{health?.score ?? '…'}</div>
          <p>{health?.status ?? 'Loading demo signal…'}</p>
          {health?.signals?.map((signal) => (
            <div className="signal" key={signal.name}>
              <strong>{signal.name}</strong><span>{signal.score}</span>
            </div>
          ))}
        </article>

        <article className="card">
          <h2>Repository Intelligence</h2>
          <p>Lexical retrieval over public ForgeFlow documentation only.</p>
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
          <button onClick={runQuery}>Query public repo</button>
          <div className="results">
            {results.map((item, index) => <p key={index}><b>{item.source}</b> · {item.excerpt}</p>)}
          </div>
        </article>

        <article className="card">
          <h2>AI Debugger Demo</h2>
          <p>Deterministic and local. No external model receives your input.</p>
          <textarea value={errorText} onChange={(e) => setErrorText(e.target.value)} />
          <button onClick={runDebug}>Analyze error</button>
          {debug.map((item, index) => <p key={index} className="tip">{item}</p>)}
        </article>

        <article className="card">
          <h2>Governed Action</h2>
          <p>The public demo preserves the core pattern: propose → approve/reject.</p>
          {!proposal && <button onClick={propose}>Propose demo task</button>}
          {proposal && (
            <div className="proposal">
              <strong>{proposal.summary}</strong>
              <span>Status: {proposal.status}</span>
              {proposal.status === 'pending' && <div className="actions"><button onClick={() => decide(true)}>Approve</button><button className="secondary" onClick={() => decide(false)}>Reject</button></div>}
            </div>
          )}
        </article>
      </section>

      <footer>
        <p>This Community Edition contains demo data and public-only logic. Production credentials, private team data, grading/submission records and internal GitHub write automation remain private.</p>
      </footer>
    </main>
  )
}
