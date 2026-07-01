"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Sun, Heart, Music, FileText, ChevronRight, Bookmark, Star, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { bibleVerses, devotionals, journalPrompts, getDailyIndex } from "@/lib/content-data"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 5) return "Still up? God is with you"
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  if (hour < 20) return "Good evening"
  return "Good night"
}

function getEmoji(): string {
  const hour = new Date().getHours()
  if (hour < 5) return "🌙"
  if (hour < 12) return "🌅"
  if (hour < 17) return "☀️"
  if (hour < 20) return "🌇"
  return "🌙"
}

export default function HomePage() {
  const [greeting, setGreeting] = useState("Good morning")
  const [emoji, setEmoji] = useState("🌅")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setGreeting(getGreeting())
    setEmoji(getEmoji())
  }, [])

  const todayVerse = bibleVerses[getDailyIndex(bibleVerses.length)]
  const todayDevotional = devotionals[getDailyIndex(devotionals.length)]
  const todayPrompt = journalPrompts[getDailyIndex(journalPrompts.length)]
  const today = new Date()

  const copyVerse = () => {
    navigator.clipboard.writeText(`"${todayVerse.text}" — ${todayVerse.reference}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const themeColors: Record<string, string> = {
    green: "bg-emerald-50 border-emerald-200 text-emerald-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    sky: "bg-sky-50 border-sky-200 text-sky-700",
    rose: "bg-rose-50 border-rose-200 text-rose-700",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800">
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600/10 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative px-6 py-10 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-amber-300/80 text-sm font-medium mb-1 flex items-center gap-2">
              <Sun className="w-3.5 h-3.5" />
              {format(today, "EEEE, MMMM d, yyyy")}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {greeting} {emoji}
            </h1>
            <p className="text-amber-200/80 text-base max-w-lg">
              A new day, a fresh measure of grace. Let's spend some time with Jesus together.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 max-w-5xl space-y-6">

        {/* Verse of the Day */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-amber-950 to-amber-800 border-0 shadow-xl shadow-amber-900/20 overflow-hidden">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-300" />
                  <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">Verse of the Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-700/60 text-amber-200 border-amber-600/30 text-xs">
                    {todayVerse.theme}
                  </Badge>
                  <button
                    onClick={copyVerse}
                    className="text-amber-400/60 hover:text-amber-300 transition-colors text-xs flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <blockquote className="text-white/95 text-xl lg:text-2xl font-serif leading-relaxed mb-5 italic">
                "{todayVerse.text}"
              </blockquote>
              <p className="text-amber-400 font-semibold text-sm tracking-wide">— {todayVerse.reference}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Today's Devotional */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`h-full border ${themeColors[todayDevotional.color] || "border-stone-200"} hover:shadow-lg transition-all duration-300`}>
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">Today's Devotional</span>
                  </div>
                  <Badge variant="outline" className="border-amber-200 text-amber-700 text-xs">
                    {todayDevotional.theme}
                  </Badge>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-stone-800 mb-2">{todayDevotional.title}</h3>
                <p className="text-stone-400 text-xs italic mb-4">"{todayDevotional.scripture}" — {todayDevotional.scriptureRef}</p>
                <p className="text-stone-600 text-sm leading-relaxed flex-1 line-clamp-3">{todayDevotional.body[0]}</p>

                <Link href="/devotionals" className="mt-5">
                  <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 px-0 group">
                    Read full devotional
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/music" className="block group">
              <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 hover:shadow-md transition-all duration-200 group-hover:border-sky-300">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-11 h-11 bg-sky-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Music className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sky-900 text-sm">Worship Music</p>
                    <p className="text-sky-500 text-xs mt-0.5">20 curated songs</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-sky-300 group-hover:translate-x-0.5 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/devotionals" className="block group">
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-md transition-all duration-200 group-hover:border-purple-300">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-purple-900 text-sm">Devotionals</p>
                    <p className="text-purple-500 text-xs mt-0.5">7 deep readings</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-300 group-hover:translate-x-0.5 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/journal" className="block group">
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-md transition-all duration-200 group-hover:border-emerald-300">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-emerald-900 text-sm">Journal</p>
                    <p className="text-emerald-500 text-xs mt-0.5">Reflect & write</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>

        {/* Journal Prompt */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">Today's Journal Prompt</span>
                </div>
                <Badge variant="outline" className="border-emerald-200 text-emerald-600 text-xs">
                  {todayPrompt.theme}
                </Badge>
              </div>
              <p className="text-stone-700 text-base lg:text-lg font-medium leading-relaxed mb-5">
                {todayPrompt.prompt}
              </p>
              <Link href="/journal">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all">
                  Open Journal <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scripture Cards Row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-3">More Verses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((offset) => {
              const verse = bibleVerses[(getDailyIndex(bibleVerses.length) + offset) % bibleVerses.length]
              return (
                <Card key={offset} className="border-amber-100 bg-amber-50/50 hover:bg-amber-50 transition-colors">
                  <CardContent className="p-4">
                    <Badge variant="outline" className="border-amber-200 text-amber-600 text-xs mb-2">{verse.theme}</Badge>
                    <p className="text-stone-700 text-xs italic leading-relaxed line-clamp-3 font-serif">
                      "{verse.text}"
                    </p>
                    <p className="text-amber-600 text-xs font-semibold mt-2">— {verse.reference}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
