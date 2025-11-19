import React from 'react'
import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import NavModes from './components/NavModes'
import { ProfessionalView, StoryView } from './components/Sections'
import AIAssistant from './components/AIAssistant'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [mode, setMode] = useState('professional')
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch(`${BACKEND}/profile`).then(r=>r.json()).then(setProfile).catch(()=>{})
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
    // For demo purposes we convert to dataURL and store in profile
    const reader = new FileReader()
    reader.onload = async () => {
      const dataUrl = reader.result
      try {
        // create profile if missing
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
      {mode === 'professional' ? <ProfessionalView profile={profile} onDownload={onDownload} /> : <StoryView />}
      <AIAssistant />
      <footer className="max-w-7xl mx-auto px-6 py-16 text-slate-500">© {new Date().getFullYear()} Lee Willemse. Built as a living document.</footer>
    </div>
  )
}
