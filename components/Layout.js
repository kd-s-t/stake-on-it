import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Steak On It - AWS Q App</h1>
      
      <nav style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link href="/news" style={{ marginRight: '15px' }}>News</Link>
        <Link href="/market-predictions" style={{ marginRight: '15px' }}>Market Predictions</Link>
        <Link href="/stakes" style={{ marginRight: '15px' }}>Stakes</Link>
        <Link href="/profile" style={{ marginRight: '15px' }}>Profile</Link>
      </nav>

      <main>{children}</main>
    </div>
  )
}