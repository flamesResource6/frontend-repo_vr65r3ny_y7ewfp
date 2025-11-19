import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('Show me Lee’s best React project')
  const [response, setResponse] = useState(null)

  const ask = async (e) => {
    e && e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      })
      const data = await res.json()
      setResponse(data)
    } catch (e) {
      setResponse({ answer: 'The curator is unavailable right now.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-30 rounded-full bg-sky-500 text-white p-4 shadow-xl hover:bg-sky-600">
        <MessageSquare />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="absolute right-6 bottom-20 w-[380px] max-w-[calc(100%-2rem)] bg-slate-900/90 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-white/10 text-slate-200">
                <div className="font-semibold">Portfolio Curator</div>
                <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/5 rounded">
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-80 overflow-auto p-4 space-y-3 text-sm">
                {response ? (
                  <div>
                    {response.answer && (
                      <p className="text-slate-200 mb-2">{response.answer}</p>
                    )}
                    <div className="space-y-2">
                      {response.results?.projects && (
                        <div>
                          <div className="text-slate-400 mb-1">Projects</div>
                          <ul className="list-disc list-inside text-slate-300">
                            {response.results.projects.map(p => (
                              <li key={p.id || p.title}>{p.title} — {p.tech_stack?.slice(0,3)?.join(', ')}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {response.results?.certificates && (
                        <div>
                          <div className="text-slate-400 mb-1">Certificates</div>
                          <ul className="list-disc list-inside text-slate-300">
                            {response.results.certificates.map(c => (
                              <li key={c.id || c.title}>{c.title} — {c.skill_category}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {response.results?.journal && (
                        <div>
                          <div className="text-slate-400 mb-1">Learning Journal</div>
                          <ul className="list-disc list-inside text-slate-300">
                            {response.results.journal.map(j => (
                              <li key={j.id || j.title}>{j.title} — {j.tags?.slice(0,3)?.join(', ')}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400">Ask about Lee’s projects, certificates, or learning focus.</p>
                )}
              </div>
              <form onSubmit={ask} className="p-3 flex items-center gap-2">
                <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask the curator" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none" />
                <button disabled={loading} className="px-3 py-2 bg-sky-500 text-white rounded-lg disabled:opacity-50">
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
