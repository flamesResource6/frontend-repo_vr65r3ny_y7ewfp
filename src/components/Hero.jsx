import React, { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'

const traits = [
  'Software Developer',
  'Problem Solver',
  'Full-Stack Explorer',
  'Lifelong Learner',
  'Creator',
]

// Lazy load Spline to prevent hard crashes if WebGL/module fails
const LazySpline = React.lazy(() => import('@splinetool/react-spline').then(mod => ({ default: mod.default })))

export default function Hero({ profile, onUpload }) {
  const [index, setIndex] = useState(0)
  const [splineEnabled, setSplineEnabled] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % traits.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        {splineEnabled ? (
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-950 to-black" />}> 
            <LazySpline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} onError={() => setSplineEnabled(false)} />
          </Suspense>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-sky-900/20 via-slate-950 to-black" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-950/60 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
          >
            Hi, I’m Lee — a curious builder crafting my future one line of code at a time.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl"
          >
            I build my future one skill, one certificate, one project at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
            className="mt-6 text-sky-300/90 text-lg font-medium"
          >
            {traits[index]}
          </motion.div>
        </div>

        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-500 via-fuchsia-500 to-purple-600 opacity-60 blur-lg group-hover:opacity-90 transition" />
            <div className="relative rounded-3xl bg-slate-900/60 ring-1 ring-white/10 p-2 overflow-hidden">
              <div className="aspect-square w-64 sm:w-72 md:w-80 rounded-2xl bg-slate-800/50 grid place-items-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Lee Willemse" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-400 text-center p-6">
                    <p className="text-sm">Upload your profile picture</p>
                    <label className="mt-3 inline-block cursor-pointer text-sky-300 underline">
                      <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
                      Choose file
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
