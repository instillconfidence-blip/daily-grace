"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { FileText, Plus, Trash, Edit, Check, X, ChevronDown, ChevronUp, RefreshCw, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { journalPrompts, getDailyIndex } from "@/lib/content-data"

interface JournalEntry {
  id: string
  date: string
  prompt: string
  promptTheme: string
  content: string
}

const themeColors: Record<string, string> = {
  Gratitude: "border-amber-200 text-amber-700 bg-amber-50",
  Surrender: "border-blue-200 text-blue-700 bg-blue-50",
  Faithfulness: "border-emerald-200 text-emerald-700 bg-emerald-50",
  Identity: "border-purple-200 text-purple-700 bg-purple-50",
  Grace: "border-rose-200 text-rose-700 bg-rose-50",
  Abiding: "border-teal-200 text-teal-700 bg-teal-50",
  Prayer: "border-sky-200 text-sky-700 bg-sky-50",
  Courage: "border-orange-200 text-orange-700 bg-orange-50",
  Presence: "border-violet-200 text-violet-700 bg-violet-50",
  Growth: "border-green-200 text-green-700 bg-green-50",
  Inspiration: "border-yellow-200 text-yellow-700 bg-yellow-50",
  Priority: "border-indigo-200 text-indigo-700 bg-indigo-50",
  Honesty: "border-stone-300 text-stone-700 bg-stone-50",
  Scripture: "border-amber-200 text-amber-700 bg-amber-50",
  Trust: "border-blue-200 text-blue-700 bg-blue-50",
  Hope: "border-emerald-200 text-emerald-700 bg-emerald-50",
  Love: "border-rose-200 text-rose-700 bg-rose-50",
  Guidance: "border-cyan-200 text-cyan-700 bg-cyan-50",
  Community: "border-purple-200 text-purple-700 bg-purple-50",
  Intentionality: "border-orange-200 text-orange-700 bg-orange-50",
  Worship: "border-amber-200 text-amber-700 bg-amber-50",
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newContent, setNewContent] = useState("")
  const [saved, setSaved] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [promptIndex, setPromptIndex] = useState(() => getDailyIndex(journalPrompts.length))
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("daily-grace-journal-v2")
      if (saved) setEntries(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  const persist = useCallback((updated: JournalEntry[]) => {
    setEntries(updated)
    localStorage.setItem("daily-grace-journal-v2", JSON.stringify(updated))
  }, [])

  const handleSave = useCallback(() => {
    if (!newContent.trim()) return
    const entry: JournalEntry = {
      id: Math.random().toString(36).slice(2),
      date: new Date().toISOString(),
      prompt: journalPrompts[promptIndex].prompt,
      promptTheme: journalPrompts[promptIndex].theme,
      content: newContent.trim(),
    }
    persist([entry, ...entries])
    setNewContent("")
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }, [newContent, entries, promptIndex, persist])

  const handleDelete = useCallback((id: string) => {
    persist(entries.filter(e => e.id !== id))
    setDeleteConfirmId(null)
    setExpandedId(null)
  }, [entries, persist])

  const handleSaveEdit = useCallback((id: string) => {
    if (!editContent.trim()) return
    persist(entries.map(e => e.id === id ? { ...e, content: editContent.trim() } : e))
    setEditingId(null)
    setEditContent("")
  }, [entries, editContent, persist])

  const currentPrompt = journalPrompts[promptIndex]
  const badgeClass = themeColors[currentPrompt.theme] || "border-stone-200 text-stone-600 bg-stone-50"

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-700/10 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="relative px-6 py-10 lg:px-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-emerald-400/20 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-300" />
            </div>
            <h1 className="text-3xl font-bold text-white">Journal</h1>
          </div>
          <p className="text-amber-200/80">Reflect deeply. Pray honestly. Grow faithfully.</p>
          {entries.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-white/90 text-xs font-medium">{entries.length} {entries.length === 1 ? "entry" : "entries"} written</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 max-w-3xl">

        {/* New Entry Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-8 border-emerald-200 shadow-lg shadow-emerald-100/50 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">New Entry</span>
                </div>
                <span className="text-stone-400 text-xs">{format(new Date(), "MMM d, yyyy")}</span>
              </div>

              {/* Prompt */}
              <div className="mb-5 p-4 rounded-xl bg-stone-50 border border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider">Reflection Prompt</p>
                  <button
                    onClick={() => setPromptIndex((promptIndex + 1) % journalPrompts.length)}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-600 transition-colors group"
                  >
                    <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                    New prompt
                  </button>
                </div>
                <p className="text-stone-700 text-sm font-medium leading-relaxed mb-3">{currentPrompt.prompt}</p>
                <Badge variant="outline" className={`text-xs ${badgeClass}`}>
                  {currentPrompt.theme}
                </Badge>
              </div>

              <Textarea
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                placeholder="Write freely here... This is between you and God. Be honest, be real."
                className="min-h-[160px] border-stone-200 bg-white text-stone-700 placeholder:text-stone-300 resize-none focus-visible:ring-emerald-300 text-sm leading-relaxed"
              />

              <div className="flex items-center justify-between mt-4">
                <p className="text-stone-300 text-xs">{newContent.length > 0 ? `${newContent.length} characters` : "Start writing..."}</p>
                <Button
                  onClick={handleSave}
                  disabled={!newContent.trim()}
                  className={`transition-all ${saved ? "bg-emerald-500 hover:bg-emerald-500" : "bg-emerald-600 hover:bg-emerald-700"} text-white shadow-sm`}
                >
                  {saved ? (
                    <><Check className="w-4 h-4 mr-2" /> Saved!</>
                  ) : (
                    <><Plus className="w-4 h-4 mr-2" /> Save Entry</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Past Entries */}
        {entries.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest">
                Past Entries
              </h2>
              <span className="text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
                {entries.length} total
              </span>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {entries.map((entry, index) => {
                  const entryBadge = themeColors[entry.promptTheme] || "border-stone-200 text-stone-600 bg-stone-50"
                  return (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ delay: index < 5 ? index * 0.04 : 0 }}
                    >
                      <Card className="border-stone-200 hover:border-stone-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
                        <CardHeader className="pb-0 pt-4 px-4">
                          <button
                            className="w-full text-left"
                            onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                  <span className="text-stone-400 text-xs flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {format(new Date(entry.date), "MMM d, yyyy")}
                                  </span>
                                  <Badge variant="outline" className={`text-xs ${entryBadge}`}>
                                    {entry.promptTheme}
                                  </Badge>
                                </div>
                                <p className="text-stone-500 text-xs italic line-clamp-2 leading-relaxed">
                                  "{entry.prompt}"
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {expandedId === entry.id
                                  ? <ChevronUp className="w-4 h-4 text-stone-400" />
                                  : <ChevronDown className="w-4 h-4 text-stone-400" />
                                }
                              </div>
                            </div>
                          </button>
                        </CardHeader>

                        <AnimatePresence>
                          {expandedId === entry.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <CardContent className="pt-3 pb-4 px-4">
                                <div className="h-px bg-stone-100 mb-3" />

                                {editingId === entry.id ? (
                                  <div>
                                    <Textarea
                                      value={editContent}
                                      onChange={e => setEditContent(e.target.value)}
                                      className="min-h-[120px] text-sm mb-3 border-emerald-200 focus-visible:ring-emerald-300"
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                                        onClick={() => handleSaveEdit(entry.id)}
                                        disabled={!editContent.trim()}
                                      >
                                        <Check className="w-3 h-3 mr-1.5" /> Save
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                        onClick={() => { setEditingId(null); setEditContent("") }}
                                      >
                                        <X className="w-3 h-3 mr-1.5" /> Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-wrap mb-3">
                                      {entry.content}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => { setEditingId(entry.id); setEditContent(entry.content) }}
                                        className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-amber-50"
                                      >
                                        <Edit className="w-3 h-3" /> Edit
                                      </button>

                                      {deleteConfirmId === entry.id ? (
                                        <div className="flex items-center gap-1.5 ml-auto">
                                          <span className="text-xs text-stone-400">Delete this entry?</span>
                                          <button
                                            onClick={() => handleDelete(entry.id)}
                                            className="text-xs text-red-500 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 font-medium"
                                          >
                                            Yes
                                          </button>
                                          <button
                                            onClick={() => setDeleteConfirmId(null)}
                                            className="text-xs text-stone-400 hover:text-stone-600 px-2 py-1 rounded hover:bg-stone-50"
                                          >
                                            No
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => setDeleteConfirmId(entry.id)}
                                          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-500 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-50 ml-auto"
                                        >
                                          <Trash className="w-3 h-3" /> Delete
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Empty state */}
        {entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-emerald-300" />
            </div>
            <p className="text-stone-500 font-medium mb-1">No journal entries yet</p>
            <p className="text-stone-400 text-sm">Write your first entry above and begin your journey of reflection.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
