"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setDone(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30 flex items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm border-amber-200 shadow-lg">
        <CardContent className="p-8">
          {done ? (
            <div className="text-center">
              <h1 className="text-xl font-bold text-stone-800 mb-2">Check your inbox 📬</h1>
              <p className="text-stone-500 text-sm">
                We sent a confirmation link to <strong>{email}</strong>. Confirm your email, then log in to subscribe.
              </p>
              <Link href="/login" className="text-amber-700 font-semibold hover:underline text-sm mt-4 inline-block">
                Go to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-stone-800 mb-1">Create your account</h1>
              <p className="text-stone-500 text-sm mb-6">Join Daily Grace to unlock membership features</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Password (min 6 characters)" minLength={6} value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
              <p className="text-stone-500 text-sm mt-5 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-amber-700 font-semibold hover:underline">Log in</Link>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
