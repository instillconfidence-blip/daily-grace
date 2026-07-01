"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function AccountActions({ isActive }: { isActive: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    const res = await fetch("/api/checkout", { method: "POST" })
    const data = await res.json()
    setLoading(false)
    if (data.url) window.location.href = data.url
  }

  const handleManageBilling = async () => {
    setLoading(true)
    const res = await fetch("/api/portal", { method: "POST" })
    const data = await res.json()
    setLoading(false)
    if (data.url) window.location.href = data.url
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-3">
      {isActive ? (
        <Button onClick={handleManageBilling} disabled={loading} className="bg-amber-700 hover:bg-amber-800 text-white">
          {loading ? "Loading..." : "Manage Billing"}
        </Button>
      ) : (
        <Button onClick={handleSubscribe} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          {loading ? "Loading..." : "Subscribe — $4.99/mo"}
        </Button>
      )}
      <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
    </div>
  )
}
