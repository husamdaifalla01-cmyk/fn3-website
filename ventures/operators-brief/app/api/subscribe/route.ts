import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, tier } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase env vars not set.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Upsert subscriber — if email exists, update tier
  const { error } = await supabase.from("subscribers").upsert(
    {
      email: email.toLowerCase().trim(),
      tier: tier || "free",
      subscribed_at: new Date().toISOString(),
      source: "landing_page",
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
