"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, Music, FileText, Sun, Menu, X, Download, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/", label: "Home", icon: Home, desc: "Today's content" },
  { href: "/devotionals", label: "Devotionals", icon: Heart, desc: "Daily readings" },
  { href: "/music", label: "Music", icon: Music, desc: "Worship songs" },
  { href: "/journal", label: "Journal", icon: FileText, desc: "Reflect & write" },
  { href: "/downloads", label: "Downloads", icon: Download, desc: "Member guides" },
  { href: "/community", label: "Community", icon: Users, desc: "Connect & share" },
  { href: "/account", label: "Account", icon: User, desc: "Membership & billing" },
]

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-amber-700/40">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-300 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sun className="w-6 h-6 text-amber-900" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight tracking-tight">Daily Grace</h1>
            <p className="text-amber-300/80 text-xs font-medium">Walk with Jesus</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5">
        <p className="text-amber-400/60 text-xs font-semibold uppercase tracking-widest px-3 mb-3 mt-1">Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-amber-400 text-amber-950 shadow-md shadow-amber-900/20"
                  : "text-amber-200/90 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                isActive ? "text-amber-800" : ""
              )} />
              <div>
                <p className="leading-none">{item.label}</p>
                <p className={cn("text-xs mt-0.5", isActive ? "text-amber-700" : "text-amber-400/60")}>{item.desc}</p>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Daily verse footer */}
      <div className="p-4 m-3 bg-white/5 rounded-xl border border-white/10">
        <p className="text-amber-300/70 text-xs text-center leading-relaxed italic">
          "His mercies are new every morning;<br />great is his faithfulness."
        </p>
        <p className="text-amber-500/50 text-xs text-center mt-1">— Lam 3:23</p>
      </div>
    </div>
  )
}

export function SidebarNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 flex-col sticky top-0 h-screen shadow-xl shadow-amber-900/20">
        <NavContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-950 to-amber-900 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-amber-500 rounded-xl flex items-center justify-center">
              <Sun className="w-4 h-4 text-amber-900" />
            </div>
            <span className="text-white font-bold text-base">Daily Grace</span>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="text-amber-200 p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 border-amber-800">
              <NavContent onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile top spacer */}
      <div className="lg:hidden h-14 flex-shrink-0" />
    </>
  )
}
