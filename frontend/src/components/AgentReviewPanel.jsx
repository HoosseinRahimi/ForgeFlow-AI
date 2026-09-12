import { useEffect, useState } from 'react'

import { api } from '../api'

export default function AgentReviewPanel() {
  const [review, setReview] = useState(null)

  useEffect(() => {
    api('/api/demo/agent-review').then(setReview).catch(() => setReview(null))
  }, [])

  return (
    <section className="grid">
      <article className="card score-card">
        <h2>Multi-agent Review</h2>
        <div className="score">{review?.agents?.length ?? '…'}</div>
        <p>Specialist lenses over the same demo project state.</p>
        <p>{review?.note ?? 'Loading demo perspectives…'}</p>
      </article>

      {review?.agents?.map((agent) => (
        <article className="card" key={agent.name}>
          <h2>{agent.name}</h2>
          <p className="agent-status">{agent.status}</p>
          <p>{agent.insight}</p>
        </article>
      ))}
    </section>
  )
}
