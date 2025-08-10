"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Loader2 } from "lucide-react"
import confetti from "canvas-confetti"

export default function DateProposal() {
  const [isShaking, setIsShaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState("")

  const handleNoClick = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 600)
  }

  const handleYesClick = async () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#f472b6", "#f9a8d4", "#fce7f3"],
    })

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setEmailSent(true)

      // More confetti for success
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.4 },
          colors: ["#ec4899", "#f472b6", "#f9a8d4", "#fce7f3"],
        })
      }, 500)
    } catch (err) {
      setError("Oops! Something went wrong, but I'm still excited! 💕")
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-pink-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold text-pink-800">Yay! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-pink-700 text-lg">
              I'm so excited, {process.env.NEXT_PUBLIC_PERSON_NAME || "beautiful"}! 💕
            </p>
            <p className="text-pink-600">
              I've sent myself a happy email and I'll be in touch soon to plan our amazing date!
            </p>
            <div className="animate-bounce">
              <Heart className="w-6 h-6 text-pink-500 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-pink-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center animate-pulse">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-pink-800 leading-relaxed">
            Will you go on a date with me, {process.env.NEXT_PUBLIC_PERSON_NAME || "beautiful"}?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-pink-600 mb-6">
            <p className="text-lg">💕 Pretty please? 💕</p>
          </div>

          {error && (
            <div className="text-center text-pink-700 bg-pink-100 p-3 rounded-lg border border-pink-200">{error}</div>
          )}

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleYesClick}
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending happy email...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Yes! 💕
                </>
              )}
            </Button>

            <Button
              onClick={handleNoClick}
              variant="outline"
              className={`w-full border-pink-300 text-pink-700 hover:bg-pink-50 font-semibold py-3 text-lg transition-all duration-200 ${
                isShaking ? "animate-shake" : ""
              }`}
              disabled={isLoading}
            >
              No 😢
            </Button>
          </div>

          <div className="text-center text-sm text-pink-500 mt-4">
            <p>Hint: There's only one right answer! 😉</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
