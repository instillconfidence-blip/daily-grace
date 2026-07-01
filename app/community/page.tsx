import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Lock } from "lucide-react"
import CommunityComposer from "@/components/community-composer"
import { format } from "date-fns"

export default async function CommunityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase.from("profiles").select("subscription_status").eq("id", user.id).single()
    : { data: null }

  const isActive = profile?.subscription_status === "active"

  const { data: posts } = isActive
    ? await supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(50)
    : { data: [] }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 px-6 py-10 lg:px-10">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-amber-300" />
          <h1 className="text-3xl font-bold text-white">Community</h1>
        </div>
        <p className="text-amber-200/80">A members-only space to share and encourage one another</p>
      </div>

      <div className="px-6 lg:px-10 py-8 max-w-2xl">
        {!isActive ? (
          <Card className="border-amber-200">
            <CardContent className="p-8 text-center">
              <Lock className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-stone-800 mb-2">Members-only content</h2>
              <p className="text-stone-500 text-sm mb-6">
                Subscribe to Daily Grace Membership ($4.99/mo) to join the community.
              </p>
              <Link href="/account">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">View Membership</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <CommunityComposer userEmail={user!.email!} />
            {posts?.map((p: any) => (
              <Card key={p.id} className="border-stone-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-amber-700">{p.author_email}</span>
                    <span className="text-xs text-stone-400">{format(new Date(p.created_at), "MMM d, yyyy")}</span>
                  </div>
                  <p className="text-stone-700 text-sm whitespace-pre-wrap">{p.content}</p>
                </CardContent>
              </Card>
            ))}
            {posts?.length === 0 && (
              <p className="text-stone-400 text-sm text-center py-8">No posts yet — be the first to share!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
