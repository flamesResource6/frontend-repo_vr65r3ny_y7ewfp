import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error('UI error captured:', error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#0f172a',color:'#e2e8f0'}}>
          <div style={{maxWidth:700}}>
            <h1 style={{fontSize:24,marginBottom:12}}>Something went wrong.</h1>
            <p style={{opacity:0.9,marginBottom:16}}>The UI encountered an error. You can visit the test page to verify backend/database status.</p>
            <pre style={{whiteSpace:'pre-wrap',background:'rgba(255,255,255,0.06)',padding:12,borderRadius:8,border:'1px solid rgba(255,255,255,0.1)'}}>
              {String(this.state.error)}
            </pre>
            <div style={{marginTop:16,display:'flex',gap:8}}>
              <a href="/test" style={{padding:'8px 12px',background:'#38bdf8',color:'#0b1220',borderRadius:8,textDecoration:'none'}}>Go to Test</a>
              <button onClick={()=>window.location.reload()} style={{padding:'8px 12px',background:'transparent',border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,color:'#e2e8f0'}}>Reload</button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
