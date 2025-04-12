"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Trophy, Sun, Moon, Dumbbell } from "lucide-react"
import ProfileCard from "@/components/ProfileCard"
import StatsAndProgress from "@/components/StatsAndProgress"

// Sample data fallback if DB connection is not available
const sampleUserData = {
  _id: "67b8b68bcb0a84011f23f287",
  email: "nayan@ypstem.org",
  fullName: "Nayan Acharya",
  fitnessLevel: "advanced",
  age: "18",
  gender: "male",
  phone: "9847036628",
  fitnessGoal: "Stay fit and healthy",
  caloriesBurned: 500,
  dailyCalories: 0,
  progress: 75,
  recentWorkout: "",
  weight: 45,
  profilePic: "/placeholder.svg?height=200&width=200",
}

interface UserData {
  _id?: string
  email: string
  fullName: string
  fitnessLevel: string
  age: string
  gender: string
  phone: string
  fitnessGoal: string
  caloriesBurned: number
  dailyCalories: number
  progress: number
  recentWorkout: string
  weight: number
  profilePic?: string
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [userData, setUserData] = useState<UserData>({
    email: "",
    fullName: "",
    fitnessLevel: "",
    age: "",
    gender: "",
    phone: "",
    fitnessGoal: "",
    caloriesBurned: 0,
    dailyCalories: 0,
    progress: 0,
    recentWorkout: "",
    weight: 0,
    profilePic: "/placeholder.svg?height=200&width=200",
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const { email } = JSON.parse(storedUser)
      fetch(`/api/dashboard?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.profile) {
            setUserData((prev) => ({ ...prev, ...data.profile }))
          } else {
            // Fallback to sample user data
            setUserData(sampleUserData)
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
          // Use sample data if an error occurs
          setUserData(sampleUserData)
        })
        .finally(() => {
          setIsLoadingData(false)
          setMounted(true)
        })
    }
  }, [])

  useEffect(() => {
    if (!userData.email) return

    const interval = setInterval(() => {
      fetch(`/api/dashboard?email=${userData.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.profile) {
            setUserData((prev) => ({
              ...prev,
              caloriesBurned: data.profile.caloriesBurned,
              dailyCalories: data.profile.dailyCalories,
              progress: data.profile.progress,
              recentWorkout: data.profile.recentWorkout,
            }))
          }
        })
        .catch((error) => console.error("Error polling data:", error))
    }, 10000)

    return () => clearInterval(interval)
  }, [userData.email])

  if (!mounted || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 dark:from-violet-900 dark:via-purple-900 dark:to-pink-900">
        <div className="text-white text-xl font-bold flex items-center gap-2">
          <Dumbbell className="w-6 h-6 animate-bounce" />
          Loading...
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "profile",
          email: userData.email,
          profileData: userData,
        }),
      })
      const data = await res.json()
      if (data.message === "Profile updated successfully") {
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error saving profile:", error)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, profilePic: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen gradient-background text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-300" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
              Fitness Dashboard
            </h1>
          </motion.div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard
            userData={userData}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleFileUpload={handleFileUpload}
          />
          <StatsAndProgress
            userData={userData}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
    </div>
  )
}

