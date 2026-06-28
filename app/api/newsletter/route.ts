import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    // Subscribe via Resend audience (or ConvertKit)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      // Add to audience — replace with your audience ID from Resend dashboard
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID ?? "",
        unsubscribed: false,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    console.error("Newsletter subscription error:", err);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
