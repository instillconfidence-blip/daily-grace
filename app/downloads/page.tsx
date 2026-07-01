import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Lock } from "lucide-react"

export default async function DownloadsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase.from("profiles").select("subscription_status").eq("id", user.id).single()
    : { data: null }

  const isActive = profile?.subscription_status === "active"

  const { data: downloads } = isActive
    ? await supabase.from("downloads").select("*").order("created_at", { ascending: false })
    : { data: [] }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 px-6 py-10 lg:px-10">
        <div className="flex items-center gap-3 mb-2">
          <Download className="w-6 h-6 text-amber-300" />
          <h1 className="text-3xl font-bold text-white">Downloads</h1>
        </div>
        <p className="text-amber-200/80">Exclusive devotional guides and printable journal pages</p>
      </div>

      <div className="px-6 lg:px-10 py-8 max-w-2xl">
        {!isActive ? (
          <Card className="border-amber-200">
            <CardContent className="p-8 text-center">
              <Lock className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-stone-800 mb-2">Members-only content</h2>
              <p className="text-stone-500 text-sm mb-6">
                Subscribe to Daily Grace Membership ($4.99/mo) to unlock downloadable guides and printable resources.
              </p>
              <Link href="/account">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">View Membership</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {downloads?.map((d: any) => (
              <Card key={d.id} className="border-stone-200">
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-stone-800">{d.title}</h3>
                    <p className="text-stone-500 text-sm mt-1">{d.description}</p>
                  </div>
                  <a href={d.file_url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-amber-700 hover:bg-amber-800 text-white flex-shrink-0">
                      <Download className="w-4 h-4 mr-1.5" /> Download
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
            {downloads?.length === 0 && (
              <p className="text-stone-400 text-sm text-center py-8">No downloads available yet — check back soon!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
