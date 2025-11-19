import React, { useState, useEffect, Suspense } from 'react'
import Hero from './components/Hero'
import NavModes from './components/NavModes'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

// Code-split heavier sections and assistant to improve TTI
const Sections = React.lazy(() => import('./components/Sections'))
const AIAssistant = React.lazy(() => import('./components/AIAssistant'))

export default function App() {
  const [mode, setMode] = useState('professional')
  const [profile, setProfile] = useState(null)
  const [showAssistant, setShowAssistant] = useState(false)

  // Fetch profile with abort to avoid work on unmount
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${BACKEND}/profile`, { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Profile load failed')))
      .then(setProfile)
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  // Defer assistant mount to idle to keep main thread free
  useEffect(() => {
    const mount = () => setShowAssistant(true)
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      window.requestIdleCallback(mount, { timeout: 1200 })
    } else {
      setTimeout(mount, 300)
    }
  }, [])

  const onDownload = () => {
    const url = profile?.resume_url || '/resume.pdf'
    const a = document.createElement('a')
    a.href = url
    a.download = 'Lee-Willemse-Resume.pdf'
    a.click()
  }

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const dataUrl = reader.result
      try {
        let current = profile
        if (!current || !current.id) {
          const res = await fetch(`${BACKEND}/profile`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ name: 'Lee Willemse', tagline: 'Curious builder', traits: ['Software Developer','Problem Solver'], about: '', avatar_url: dataUrl }) })
          current = await res.json()
        } else {
          const res = await fetch(`${BACKEND}/profile/${current.id}`, { method: 'PATCH', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ avatar_url: dataUrl }) })
          current = await res.json()
        }
        setProfile(current)
      } catch (e) {
        console.error(e)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero profile={profile} onUpload={onUpload} />
      <NavModes mode={mode} setMode={setMode} onDownload={onDownload} />

      <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-12 text-slate-400">Loading...</div>}>
        <Sections.ProfessionalView profile={profile} onDownload={onDownload} />
        {mode !== 'professional' && <Sections.StoryView />}
      </Suspense>

      {showAssistant && (
        <Suspense fallback={null}>
          <AIAssistant />
        </Suspense>
      )}

      <footer className="max-w-7xl mx-auto px-6 py-16 text-slate-500">© {new Date().getFullYear()} Lee Willemse. Built as a living document.</footer>
    </div>
  )
}
