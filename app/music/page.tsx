"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Music, Play, ExternalLink, Filter, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { songs } from "@/lib/content-data"

const genreConfig: Record<string, {
  gradient: string
  iconBg: string
  icon: string
  badge: string
  btn: string
}> = {
  Worship:        { gradient: "from-amber-100 to-orange-100",     iconBg: "bg-amber-50",     icon: "text-amber-600",   badge: "bg-amber-50 border-amber-200 text-amber-700",    btn: "bg-amber-700 hover:bg-amber-800" },
  Contemporary:   { gradient: "from-sky-100 to-blue-100",         iconBg: "bg-sky-50",       icon: "text-sky-600",     badge: "bg-sky-50 border-sky-200 text-sky-700",          btn: "bg-sky-600 hover:bg-sky-700" },
  Gospel:         { gradient: "from-purple-100 to-violet-100",    iconBg: "bg-purple-50",    icon: "text-purple-600",  badge: "bg-purple-50 border-purple-200 text-purple-700", btn: "bg-purple-600 hover:bg-purple-700" },
  Hymns:          { gradient: "from-emerald-100 to-teal-100",     iconBg: "bg-emerald-50",   icon: "text-emerald-600", badge: "bg-emerald-50 border-emerald-200 text-emerald-700", btn: "bg-emerald-600 hover:bg-emerald-700" },
  Instrumental:   { gradient: "from-rose-100 to-pink-100",        iconBg: "bg-rose-50",      icon: "text-rose-600",    badge: "bg-rose-50 border-rose-200 text-rose-700",       btn: "bg-rose-500 hover:bg-rose-600" },
}

const genreEmoji: Record<string, string> = {
  Worship: "🙌",
  Contemporary: "🎵",
  Gospel: "✝️",
  Hymns: "📖",
  Instrumental: "🎹",
}

export default function MusicPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("All")
  const [search, setSearch] = useState("")

  const genres = ["All", "Worship", "Contemporary", "Gospel", "Hymns", "Instrumental"]

  const filteredSongs = songs.filter(s => {
    const matchesGenre = selectedGenre === "All" || s.genre === selectedGenre
    const matchesSearch = !search || 
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase())
    return matchesGenre && matchesSearch
  })

  const countByGenre: Record<string, number> = {}
  songs.forEach(s => {
    countByGenre[s.genre] = (countByGenre[s.genre] || 0) + 1
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                top: `${-20 + i * 5}px`,
                right: `${-20 + i * 25}px`,
              }}
            />
          ))}
        </div>
        <div className="relative px-6 py-10 lg:px-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-amber-400/20 rounded-xl flex items-center justify-center">
              <Music className="w-5 h-5 text-amber-300" />
            </div>
            <h1 className="text-3xl font-bold text-white">Worship Music</h1>
          </div>
          <p className="text-amber-200/80 mb-6">Curated Christian songs to lift your spirit and draw you closer to God</p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search songs or artists..."
              className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-amber-300/50 focus:bg-white/15 focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8">
        {/* Genre Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {["Worship", "Contemporary", "Gospel", "Hymns", "Instrumental"].map(genre => {
            const cfg = genreConfig[genre]
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(selectedGenre === genre ? "All" : genre)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedGenre === genre 
                    ? "border-amber-400 bg-amber-50 shadow-sm" 
                    : "border-stone-200 bg-white hover:border-amber-200"
                }`}
              >
                <p className="text-lg mb-0.5">{genreEmoji[genre]}</p>
                <p className="text-xs font-bold text-stone-700">{genre}</p>
                <p className="text-xs text-stone-400">{countByGenre[genre] || 0} songs</p>
              </button>
            )
          })}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" />
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedGenre === genre
                  ? "bg-amber-800 text-white shadow-sm"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              {genre} {genre !== "All" && <span className="opacity-60">({countByGenre[genre] || 0})</span>}
            </button>
          ))}
        </div>

        {filteredSongs.length === 0 ? (
          <div className="text-center py-16">
            <Music className="w-12 h-12 text-stone-200 mx-auto mb-3" />
            <p className="text-stone-400 font-medium">No songs found</p>
            <p className="text-stone-300 text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSongs.map((song, index) => {
              const cfg = genreConfig[song.genre] || genreConfig.Worship
              return (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Card className="overflow-hidden border-stone-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group bg-white">
                    {/* Visual header */}
                    <div className={`h-28 bg-gradient-to-br ${cfg.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full border-2 border-current"
                            style={{
                              width: `${40 + i * 25}px`,
                              height: `${40 + i * 25}px`,
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        ))}
                      </div>
                      <div className={`w-14 h-14 ${cfg.iconBg} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Music className={`w-7 h-7 ${cfg.icon}`} />
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-stone-800 text-sm leading-tight">{song.title}</h3>
                        <Badge variant="outline" className={`text-xs flex-shrink-0 ${cfg.badge}`}>
                          {song.genre}
                        </Badge>
                      </div>
                      <p className="text-stone-400 text-xs mb-2 font-medium">{song.artist}</p>
                      <p className="text-stone-500 text-xs leading-relaxed mb-3 line-clamp-2">{song.description}</p>

                      <a
                        href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className={`w-full text-white text-xs shadow-sm hover:shadow-md transition-shadow ${cfg.btn}`}>
                          <Play className="w-3 h-3 mr-1.5 fill-current" />
                          Listen
                          <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
