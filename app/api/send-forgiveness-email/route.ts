import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const name = process.env.PERSON_NAME || "Someone special"

    const { data, error } = await resend.emails.send({
      from: "Forgiveness Request <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL || "admin@example.com"],
      subject: `🙏 ${name} has forgiven you!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ec4899; font-size: 28px; margin-bottom: 10px;">🙏 Forgiveness Granted! 🙏</h1>
            <p style="color: #be185d; font-size: 18px; margin: 0;">Your apology has been accepted!</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); padding: 25px; border-radius: 12px; border: 2px solid #f9a8d4; margin-bottom: 20px;">
            <h2 style="color: #be185d; font-size: 22px; margin-bottom: 15px; text-align: center;">💕 Forgiveness Details 💕</h2>
            <p style="color: #831843; font-size: 16px; margin-bottom: 10px;"><strong>From:</strong> ${name}</p>
            <p style="color: #831843; font-size: 16px; margin-bottom: 10px;"><strong>Response:</strong> Yes, I forgive you! 🥰</p>
            <p style="color: #831843; font-size: 16px; margin-bottom: 10px;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p style="color: #831843; font-size: 16px; margin-bottom: 0;"><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div style="background: #fff7ed; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
            <h3 style="color: #92400e; font-size: 18px; margin-bottom: 10px;">📝 Remember to:</h3>
            <ul style="color: #92400e; font-size: 14px; margin: 0; padding-left: 20px;">
              <li>Show appreciation for their forgiveness</li>
              <li>Learn from your mistakes</li>
              <li>Be more mindful in the future</li>
              <li>Cherish this second chance</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 25px;">
            <p style="color: #be185d; font-size: 16px; margin-bottom: 15px;">Time to make things right! 💖</p>
            <p style="color: #9d174d; font-size: 14px; font-style: italic;">Sent with hope and gratitude from your forgiveness website 🙏</p>
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
