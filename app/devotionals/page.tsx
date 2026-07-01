"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ChevronDown, ChevronUp, Filter, Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { devotionals, getDailyIndex } from "@/lib/content-data"

const colorConfig: Record<string, {
  card: string
  badge: string
  accent: string
  prayer: string
  dot: string
}> = {
  green:   { card: "border-emerald-200 hover:border-emerald-300",   badge: "border-emerald-200 text-emerald-700 bg-emerald-50",   accent: "text-emerald-600",  prayer: "bg-emerald-50/80 border-emerald-100",  dot: "bg-emerald-400" },
  amber:   { card: "border-amber-200 hover:border-amber-300",       badge: "border-amber-200 text-amber-700 bg-amber-50",         accent: "text-amber-600",    prayer: "bg-amber-50/80 border-amber-100",      dot: "bg-amber-400" },
  blue:    { card: "border-blue-200 hover:border-blue-300",         badge: "border-blue-200 text-blue-700 bg-blue-50",           accent: "text-blue-600",     prayer: "bg-blue-50/80 border-blue-100",        dot: "bg-blue-400" },
  purple:  { card: "border-purple-200 hover:border-purple-300",     badge: "border-purple-200 text-purple-700 bg-purple-50",     accent: "text-purple-600",   prayer: "bg-purple-50/80 border-purple-100",    dot: "bg-purple-400" },
  emerald: { card: "border-emerald-200 hover:border-emerald-300",   badge: "border-emerald-200 text-emerald-700 bg-emerald-50",   accent: "text-emerald-600",  prayer: "bg-emerald-50/80 border-emerald-100",  dot: "bg-emerald-400" },
  sky:     { card: "border-sky-200 hover:border-sky-300",           badge: "border-sky-200 text-sky-700 bg-sky-50",             accent: "text-sky-600",      prayer: "bg-sky-50/80 border-sky-100",          dot: "bg-sky-400" },
  rose:    { card: "border-rose-200 hover:border-rose-300",         badge: "border-rose-200 text-rose-700 bg-rose-50",           accent: "text-rose-600",     prayer: "bg-rose-50/80 border-rose-100",        dot: "bg-rose-400" },
}

export default function DevotionalsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string>("All")

  const todayIndex = getDailyIndex(devotionals.length)
  const todayDevotional = devotionals[todayIndex]
  const themes = ["All", ...Array.from(new Set(devotionals.map(d => d.theme)))]

  const filteredDevotionals = selectedTheme === "All"
    ? devotionals
    : devotionals.filter(d => d.theme === selectedTheme)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800">
        <div className="absolute top-0 right-0 w-56 h-56 bg-amber-700/20 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative px-6 py-10 lg:px-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-amber-400/20 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-amber-300" />
            </div>
            <h1 className="text-3xl font-bold text-white">Devotionals</h1>
          </div>
          <p className="text-amber-200/80">Daily readings to deepen your walk with God</p>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 max-w-3xl">
        {/* Today's highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Star className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-amber-800 text-xs font-bold uppercase tracking-wider mb-0.5">Today's Featured</p>
            <p className="text-amber-700 text-sm font-medium">{todayDevotional.title}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedId(expandedId === todayDevotional.id ? null : todayDevotional.id)}
            className="ml-auto text-amber-600 hover:text-amber-700 text-xs hover:bg-amber-100"
          >
            {expandedId === todayDevotional.id ? "Close" : "Read →"}
          </Button>
        </motion.div>

        {/* Theme filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" />
          {themes.map(theme => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedTheme === theme
                  ? "bg-amber-800 text-white shadow-sm"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Devotional list */}
        <div className="space-y-4">
          {filteredDevotionals.map((dev, index) => {
            const isToday = dev.id === todayDevotional.id
            const isExpanded = expandedId === dev.id
            const colors = colorConfig[dev.color] || colorConfig.amber

            return (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Card className={`border ${colors.card} overflow-hidden transition-all duration-200 ${
                  isToday ? "ring-2 ring-amber-400 ring-offset-1 shadow-lg shadow-amber-100" : "shadow-sm"
                }`}>
                  <CardHeader
                    className="pb-3 pt-5 px-5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : dev.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          {isToday && (
                            <Badge className="bg-amber-500 text-white border-0 text-xs px-2">
                              Today
                            </Badge>
                          )}
                          <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                            {dev.theme}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-stone-800 leading-snug">{dev.title}</h3>
                        <p className="text-stone-400 text-sm italic mt-1 leading-snug">
                          "{dev.scripture}"
                        </p>
                        <p className={`text-xs font-semibold mt-0.5 ${colors.accent}`}>— {dev.scriptureRef}</p>
                      </div>
                      <button className="text-stone-400 p-1 flex-shrink-0 mt-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </CardHeader>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <CardContent className="pt-0 pb-6 px-5">
                          <div className="h-px bg-stone-100 mb-5 ml-6" />
                          <div className="ml-6 space-y-4 mb-6">
                            {dev.body.map((paragraph, i) => (
                              <p key={i} className="text-stone-600 leading-relaxed text-sm">{paragraph}</p>
                            ))}
                          </div>
                          <div className={`ml-6 rounded-xl p-4 border ${colors.prayer}`}>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${colors.accent}`}>
                              A Prayer
                            </p>
                            <p className="text-stone-600 italic text-sm leading-relaxed font-serif">
                              {dev.prayer}
                            </p>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
