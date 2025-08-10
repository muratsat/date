import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "Date Proposal <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL || "admin@example.com"],
      subject: `🎉 ${name} said YES to the date!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; font-size: 28px; margin-bottom: 10px;">🎉 Amazing News! 🎉</h1>
            <p style="color: #be185d; font-size: 18px; margin: 0;">Someone said YES to your date proposal!</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); padding: 25px; border-radius: 12px; border: 2px solid #f9a8d4; margin-bottom: 20px;">
            <h2 style="color: #be185d; font-size: 22px; margin-bottom: 15px; text-align: center;">💕 Date Details 💕</h2>
            <p style="color: #831843; font-size: 16px; margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="color: #831843; font-size: 16px; margin-bottom: 10px;"><strong>Response:</strong> YES! 🥳</p>
            <p style="color: #831843; font-size: 16px; margin-bottom: 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="text-align: center; margin-top: 25px;">
            <p style="color: #be185d; font-size: 16px; margin-bottom: 15px;">Time to plan that perfect date! 💖</p>
            <p style="color: #9d174d; font-size: 14px; font-style: italic;">Sent with love from your date proposal website 💕</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
