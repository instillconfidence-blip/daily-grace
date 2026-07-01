import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AccountActions from "@/components/account-actions"

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const isActive = profile?.subscription_status === "active"

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 px-6 py-10 lg:px-10">
        <h1 className="text-3xl font-bold text-white">My Account</h1>
        <p className="text-amber-200/80">{user.email}</p>
      </div>

      <div className="px-6 lg:px-10 py-8 max-w-xl">
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-stone-800">Membership</h2>
              <Badge className={isActive ? "bg-emerald-500 text-white border-0" : "bg-stone-200 text-stone-600 border-0"}>
                {isActive ? "Active" : "Not subscribed"}
              </Badge>
            </div>
            <p className="text-stone-500 text-sm mb-6">
              {isActive
                ? "You have full access to exclusive downloads and the members-only community."
                : "Subscribe for $4.99/month to unlock exclusive downloadable guides and the members-only community."}
            </p>
            <AccountActions isActive={isActive} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
