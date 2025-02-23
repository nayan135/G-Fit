"use client"

import { motion } from "framer-motion"
import {
  Target,
  Activity,
  Flame,
  Dumbbell,
  Edit2,
  Save,
  Calendar,
  Clock,
  Zap,
  FlameIcon as Fire,
  Trophy,
  ArrowRight,
  Flag
} from "lucide-react"

export default function StatsAndProgress({ userData, isEditing, handleInputChange, handleSave, setIsEditing }) {
  const renderWorkoutDetails = (workout) => {
    const workoutIcons = {
      type: <Dumbbell className="w-5 h-5 text-purple-400" />,
      date: <Calendar className="w-5 h-5 text-blue-400" />,
      duration: <Clock className="w-5 h-5 text-green-400" />,
      intensity: <Zap className="w-5 h-5 text-yellow-400" />,
      caloriesBurned: <Fire className="w-5 h-5 text-orange-400" />,
      exercises: <Activity className="w-5 h-5 text-red-400" />,
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {Object.entries(workout).map(([key, value]) => {
          // Format date value
          if (key === "date") {
            value = new Date(value).toLocaleString()
          }
          // Render array of exercises if present
          if (key === "exercises" && Array.isArray(value)) {
            return (
              <motion.div
                key={key}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="p-2 rounded-lg gradient-accent">{workoutIcons[key]}</div>
                <div>
                  <p className="text-sm text-white/60 capitalize">Exercises</p>
                  <p className="font-semibold">{value.join(", ")}</p>
                </div>
              </motion.div>
            )
          }
          if (workoutIcons[key]) {
            return (
              <motion.div
                key={key}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="p-2 rounded-lg gradient-accent">{workoutIcons[key]}</div>
                <div>
                  <p className="text-sm text-white/60 capitalize">{key}</p>
                  <p className="font-semibold">
                    {typeof value === "number" && key === "caloriesBurned" ? `${value} calories` : value}
                  </p>
                </div>
              </motion.div>
            )
          }
          return null
        })}
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards - Unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Daily Goal Card */}
        <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="gradient-accent">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold">Daily Goal</h3>
          </div>
          <p className="text-3xl font-bold">{userData.dailyCalories}</p>
          <p className="text-white/60 text-sm">calories</p>
        </div>

        {/* Burned Calories Card */}
        <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="gradient-accent">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-semibold">Burned</h3>
          </div>
          <p className="text-3xl font-bold">{userData.caloriesBurned}</p>
        </div>
        
        {/* New Fitness Goal Card */}
        <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="gradient-accent">
              <Flag className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-semibold">Fitness Goal</h3>
          </div>
          {isEditing ? (
            <textarea
              name="fitnessGoal"
              value={userData.fitnessGoal}
              onChange={handleInputChange}
              className="w-full bg-white/5 rounded-lg p-4 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          ) : (
            <p className="text-white/80">{userData.fitnessGoal}</p>
          )}
        </div>

        {/* Progress Card */}
        <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="gradient-accent">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="font-semibold">Progress</h3>
          </div>
          <p className="text-3xl font-bold">{userData.progress}%</p>
        </div>
      </div>

      {/* Enhanced Recent Workout */}
      <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg gradient-accent">
              <Trophy className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold">Recent Workout</h3>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          {userData.recentWorkout && userData.recentWorkout.trim() !== "" ? (
            (() => {
              try {
                const workout = JSON.parse(userData.recentWorkout)
                return renderWorkoutDetails(workout)
              } catch (error) {
                return (
                  <div className="flex items-center justify-center h-32 text-white/60">
                    <p className="flex items-center gap-2">
                      <Dumbbell className="w-5 h-5" />
                      Invalid workout data
                    </p>
                  </div>
                )
              }
            })()
          ) : (
            <div className="flex items-center justify-center h-32 text-white/60">
              <p className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                No recent workout recorded
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bars - Unchanged */}
      <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-6">Progress Overview</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{userData.progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${userData.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Daily Calories</span>
              <span className="text-sm font-medium">
                {userData.caloriesBurned} / {userData.dailyCalories}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(userData.caloriesBurned / (userData.dailyCalories || 1)) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Save Button - Unchanged */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (isEditing) handleSave()
            setIsEditing(!isEditing)
          }}
          className="gradient-primary px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </button>
      </div>
    </div>
  )
}

