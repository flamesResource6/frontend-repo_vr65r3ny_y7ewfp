import React from 'react'
import { motion } from 'framer-motion'

const Section = ({ title, children }) => (
  <section className="max-w-7xl mx-auto px-6 py-16">
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold text-white mb-6">
      {title}
    </motion.h2>
    <div className="grid gap-6">
      {children}
    </div>
  </section>
)

export function ProfessionalView({ profile, onDownload }) {
  return (
    <div>
      <Section title="About Lee">
        <p className="text-slate-300 leading-relaxed max-w-3xl">
          Ambitious, curious, hands-on builder and relentless learner. I build intelligent, scalable apps and love collaborating with innovative teams.
        </p>
      </Section>

      <Section title="Projects">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-4">
              <div className="aspect-video rounded-xl bg-white/5 mb-3" />
              <div className="text-white font-semibold">Project {i}</div>
              <div className="text-slate-400 text-sm">React • Node • MongoDB</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Certificates">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4 text-slate-300">
              <div className="text-white font-medium">Certificate {i}</div>
              <div className="text-xs text-slate-400">Organization · 2024</div>
              <div className="text-sm mt-2">Reflection: What I learned and how I used it.</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Contact">
        <div className="text-slate-300 space-y-2">
          <div>Email: lee@example.com</div>
          <button onClick={onDownload} className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/20 text-sky-200 border border-sky-500/30 hover:bg-sky-500/30">Download Resume</button>
        </div>
      </Section>
    </div>
  )
}

export function StoryView() {
  return (
    <div>
      <Section title="Where I started">
        <p className="text-slate-300 max-w-3xl">A spark of curiosity and a desire to build. This is where the journey began.</p>
      </Section>
      <Section title="What I learned">
        <p className="text-slate-300 max-w-3xl">From HTML/CSS to modern full-stack frameworks, I turned learning into momentum.</p>
      </Section>
      <Section title="Challenges I faced">
        <p className="text-slate-300 max-w-3xl">Balancing depth and speed, turning blockers into breakthroughs.</p>
      </Section>
      <Section title="What I built">
        <p className="text-slate-300 max-w-3xl">A growing portfolio of real projects solving real problems.</p>
      </Section>
      <Section title="Where I'm going next">
        <p className="text-slate-300 max-w-3xl">A high-performing full‑stack engineer contributing to ambitious teams.</p>
      </Section>
    </div>
  )
}
