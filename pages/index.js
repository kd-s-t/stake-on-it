import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleQuery = async () => {
    if (!query.trim()) return
    setLoading(true)
    
    try {
      const res = await fetch('/api/aws-q', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY
        },
        body: JSON.stringify({ prompt: query })
      })
      
      const data = await res.json()
      setResponse(data.result || data.error)
    } catch (error) {
      setResponse('Error connecting to AWS Q')
    }
    
    setLoading(false)
  }

  return (
    <div>
      <h2>Welcome to Steak On It</h2>
      <div style={{ padding: '15px', border: '1px solid #ccc' }}>
        <h3>AWS Q Integration</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AWS Q a question..."
            style={{ width: '300px', padding: '5px' }}
          />
          <button 
            onClick={handleQuery} 
            disabled={loading}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            {loading ? 'Querying...' : 'Ask Q'}
          </button>
        </div>
        {response && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
            <strong>Response:</strong>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  )
}

