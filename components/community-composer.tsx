"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CommunityComposer({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePost = async () => {
    if (!content.trim()) return
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from("community_posts").insert({
        author_id: user.id,
        author_email: userEmail,
        content: content.trim(),
      })
    }
    setContent("")
    setLoading(false)
    router.refresh()
  }

  return (
    <Card className="border-emerald-200">
      <CardContent className="p-5">
        <Textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Share an encouragement, prayer request, or reflection..."
          className="mb-3 min-h-[80px]"
        />
        <Button onClick={handlePost} disabled={loading || !content.trim()} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          {loading ? "Posting..." : "Post"}
        </Button>
      </CardContent>
    </Card>
  )
}
