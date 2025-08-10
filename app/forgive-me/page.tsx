"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Loader2, Frown } from "lucide-react"
import confetti from "canvas-confetti"
import { toast } from "sonner"

export default function ForgiveMe() {
  const [isShaking, setIsShaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [forgiven, setForgiven] = useState(false)
  const [error, setError] = useState("")

  const handleNoClick = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 600)

    // Show sonner toast asking to reconsider
    toast("Please reconsider... 🥺", {
      description: "I'm really sorry and I promise to do better. Can you find it in your heart to forgive me?",
      duration: 5000,
      action: {
        label: "Maybe...",
        onClick: () => {
          toast("Thank you for considering! 💕", {
            description: "Your forgiveness would mean the world to me.",
          })
        },
      },
    })
  }

  const handleYesClick = async () => {
    // Trigger joyful confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#f472b6", "#f9a8d4", "#fce7f3", "#fbbf24", "#34d399"],
    })

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/send-forgiveness-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setForgiven(true)

      // More celebratory confetti
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.4 },
          colors: ["#ec4899", "#f472b6", "#f9a8d4", "#fce7f3", "#fbbf24", "#34d399"],
        })
      }, 500)

      // Even more confetti after a delay
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#ec4899", "#f472b6", "#f9a8d4", "#fce7f3", "#fbbf24", "#34d399"],
        })
      }, 1000)
    } catch (err) {
      setError("Something went wrong, but I'm still grateful for your forgiveness! 💕")
    } finally {
      setIsLoading(false)
    }
  }

  const personName = process.env.NEXT_PUBLIC_PERSON_NAME || "beautiful"

  if (forgiven) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-pink-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold text-pink-800">Thank you, {personName}! 🙏✨</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-pink-700 text-lg">You've made me so happy, {personName}! 💕</p>
            <p className="text-pink-600">
              Your forgiveness means everything to me. I promise to be better and cherish what we have.
            </p>
            <div className="flex justify-center space-x-2 animate-bounce">
              <Heart className="w-4 h-4 text-pink-500" />
              <Heart className="w-5 h-5 text-rose-500" />
              <Heart className="w-4 h-4 text-pink-500" />
            </div>
            <p className="text-sm text-pink-500 italic">
              I've sent myself a reminder to always treat you with the love and respect you deserve 💖
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-pink-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <Frown className="w-8 h-8 text-pink-600 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold text-pink-800 leading-relaxed">
            Can you forgive me, {personName}?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-pink-700 mb-6">
            <p className="text-lg mb-2">I'm truly sorry... 💔</p>
            <p className="text-sm">I know I messed up, and I want to make things right.</p>
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
                  Sending gratitude...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Yes, I forgive you 💕
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
              <Frown className="w-4 h-4 mr-2" />
              No, not yet 😔
            </Button>
          </div>

          <div className="text-center text-sm text-pink-500 mt-4">
            <p>I promise to do better... 🙏</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
