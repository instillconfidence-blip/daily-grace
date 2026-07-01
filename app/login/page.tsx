"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    const redirectTo = searchParams.get("redirectTo") || "/account"
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30 flex items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm border-amber-200 shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-1">Welcome back</h1>
          <p className="text-stone-500 text-sm mb-6">Sign in to your Daily Grace account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full bg-amber-700 hover:bg-amber-800 text-white">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-stone-500 text-sm mt-5 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-amber-700 font-semibold hover:underline">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
