"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Trophy, Sun, Moon, Dumbbell, LineChart, Target as TargetIcon, User as UserIcon, Edit3 } from "lucide-react" // Added icons
import ProfileCard from "@/components/ProfileCard"
import StatsAndProgress from "@/components/StatsAndProgress"

const initialUserData = {
  _id: "",
  email: "",
  fullName: "User Name",
  fitnessLevel: "Beginner",
  age: "",
  gender: "",
  phone: "",
  fitnessGoal: "Get Started",
  caloriesBurned: 0,
  dailyCaloriesTarget: 2000,
  progress: 0,
  recentWorkout: "",
  weight: 70,
  profilePic: "/placeholder.svg?height=200&width=200",
  workoutHistory: [],
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
  dailyCaloriesTarget: number; 
  progress: number
  recentWorkout: string | object; 
  weight: number
  profilePic?: string
  workoutHistory?: any[]; 
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [userData, setUserData] = useState<UserData>(initialUserData)


  const calculateProgress = useCallback((burned: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(Math.round((burned / target) * 100), 100);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const { email } = JSON.parse(storedUser)
      if (email) {
        fetch(`/api/dashboard?email=${email}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch user data');
            }
            return res.json();
          })
          .then((data) => {
            if (data.profile) {
              const profile = data.profile;
              const dailyTarget = profile.dailyCaloriesTarget || initialUserData.dailyCaloriesTarget;
              const burned = profile.caloriesBurned || 0;
              const calculatedProgress = calculateProgress(burned, dailyTarget);

              setUserData(prev => ({
                ...initialUserData, 
                ...prev,           
                ...profile,       
                email: email,       
                dailyCaloriesTarget: dailyTarget,
                caloriesBurned: burned,
                progress: calculatedProgress,
     
                recentWorkout: profile.recentWorkout || initialUserData.recentWorkout,
                workoutHistory: profile.workoutHistory || initialUserData.workoutHistory,
              }))
            } else {
             
              setUserData(prev => ({...initialUserData, email}));
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error)
            setUserData(prev => ({...initialUserData, email})); 
          })
          .finally(() => {
            setIsLoadingData(false)
            setMounted(true)
          })
      } else {

        setIsLoadingData(false);
        setMounted(true);
        setUserData(initialUserData); 
        console.log("No email found in localStorage.");
      }
    } else {
      
      setIsLoadingData(false);
      setMounted(true);
      setUserData(initialUserData); 
      console.log("No user found in localStorage.");
    }
  }, [calculateProgress]) 


  useEffect(() => {
    if (!isLoadingData) { 
        setUserData(prev => ({
            ...prev,
            progress: calculateProgress(prev.caloriesBurned, prev.dailyCaloriesTarget)
        }));
    }
  }, [userData.caloriesBurned, userData.dailyCaloriesTarget, isLoadingData, calculateProgress]);

  if (!mounted || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 dark:from-violet-900 dark:via-purple-900 dark:to-pink-900">
        <div className="text-white text-xl font-bold flex items-center gap-2">
          <Dumbbell className="w-6 h-6 animate-bounce" />
          Loading Dashboard...
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let processedValue: string | number = value;
  
    if (name === 'weight' || name === 'dailyCaloriesTarget' || name === 'age') {
      processedValue = Number(value);
    }
    setUserData((prev) => ({ ...prev, [name]: processedValue }))
  }

  const handleSave = async () => {
    if (!userData.email) {
      console.error("Cannot save profile: User email is missing.");
 
      return;
    }
    try {

      const profileToSave = {
        ...userData,
        recentWorkout: typeof userData.recentWorkout === 'object' 
          ? JSON.stringify(userData.recentWorkout) 
          : userData.recentWorkout,
      };

      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "profile",
          email: userData.email,
          profileData: profileToSave, 
        }),
      })
      const data = await res.json()
      if (res.ok && data.message === "Profile updated successfully") {
        setIsEditing(false)
        
      } else {
        console.error("Failed to save profile:", data.message || "Unknown error");
      
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
      <style jsx global>{`
        .gradient-background {
          background: linear-gradient(135deg, #6B21A8 0%, #C026D3 50%, #DB2777 100%);
        }
        .dark .gradient-background {
          background: linear-gradient(135deg, #3730A3 0%, #5B21B6 50%, #A21CAF 100%);
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-300" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-rose-400">
              Your Fitness Dashboard
            </h1>
          </motion.div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center gap-2 text-sm"
            >
              {isEditing ? <Moon className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />} {/* Changed icon for edit state */}
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <ProfileCard
              userData={userData}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
              handleFileUpload={handleFileUpload}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <StatsAndProgress
              userData={userData}
              isEditing={isEditing} 
              handleInputChange={handleInputChange} 
              handleSave={handleSave} 
              setIsEditing={setIsEditing}
            />
          </motion.div>
        </div>
     
      </div>
    </div>
  )
}

// Example of a WorkoutHistoryDisplay component 
// const WorkoutHistoryDisplay = ({ history }) => {
//   if (!history || history.length === 0) {
//     return <p>No workout history available.</p>;
//   }
//   return (
//     <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-xl">
//       <h2 className="text-2xl font-semibold mb-4">Workout History</h2>
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         {history.map((workout, index) => (
//           <div key={index} className="p-4 bg-white/5 rounded-lg">
//             <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
//             <p><strong>Type:</strong> {workout.type}</p>
//             <p><strong>Duration:</strong> {workout.duration}</p>
//             <p><strong>Calories Burned:</strong> {workout.caloriesBurned}</p>
//             {workout.exercises && <p><strong>Exercises:</strong> {workout.exercises.join(', ')}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

