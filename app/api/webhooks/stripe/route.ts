import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createAdminClient } from "@/lib/supabase/server"
import type Stripe from "stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case "checkout.session.completed":
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const status = subscription.status
      const periodEnd = new Date(subscription.current_period_end * 1000).toISOString()

      await supabase
        .from("profiles")
        .update({
          stripe_subscription_id: subscription.id,
          subscription_status: status,
          subscription_current_period_end: periodEnd,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId)
      break
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      await supabase
        .from("profiles")
        .update({
          subscription_status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId)
      break
    }
  }

  return NextResponse.json({ received: true })
}

export const runtime = "nodejs"
