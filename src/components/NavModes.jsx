import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Film, Download } from 'lucide-react'

export default function NavModes({ mode, setMode, onDownload }) {
  const Item = ({ value, icon: Icon, label }) => (
    <button
      onClick={() => setMode(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${mode===value ? 'bg-white/10 text-white border-white/20' : 'text-slate-300 border-white/10 hover:bg-white/5'}`}
    >
      <Icon size={18} /> {label}
    </button>
  )

  return (
    <div className="sticky top-4 z-20 max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 bg-slate-900/70 border border-white/10 rounded-2xl p-3 flex flex-wrap items-center gap-2">
        <div className="text-slate-300 pr-3">Mode:</div>
        <Item value="professional" icon={Briefcase} label="Professional" />
        <Item value="story" icon={Film} label="Cinematic Story" />
        <div className="ml-auto flex items-center gap-2">
          <button onClick={onDownload} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-500/20 text-sky-200 border border-sky-500/30 hover:bg-sky-500/30">
            <Download size={16} /> Download Resume
          </button>
        </div>
      </motion.div>
    </div>
  )
}
