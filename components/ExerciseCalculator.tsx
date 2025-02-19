"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Flame, Check } from "lucide-react"

const exercises = [
  {
    name: "Push-ups",
    caloriesPerMinute: { low: 4, moderate: 7, high: 10 },
    icon: "💪",
    type: "reps",
    repsPerMinute: 20,
  },
  { name: "Squats", caloriesPerMinute: { low: 5, moderate: 8, high: 12 }, icon: "🦵", type: "reps", repsPerMinute: 15 },
  { name: "Sit-ups", caloriesPerMinute: { low: 3, moderate: 6, high: 9 }, icon: "🔄", type: "reps", repsPerMinute: 20 },
  { name: "Jumping Jacks", caloriesPerMinute: { low: 8, moderate: 12, high: 16 }, icon: "⭐", type: "duration" },
  { name: "Running", caloriesPerMinute: { low: 10, moderate: 15, high: 20 }, icon: "🏃", type: "duration" },
  { name: "Cycling", caloriesPerMinute: { low: 7, moderate: 11, high: 15 }, icon: "🚴", type: "duration" },
  { name: "Swimming", caloriesPerMinute: { low: 9, moderate: 13, high: 17 }, icon: "🏊", type: "duration" },
  { name: "Jump Rope", caloriesPerMinute: { low: 11, moderate: 15, high: 20 }, icon: "⚡", type: "duration" },
]

export default function ExerciseCalculator({ calorieAmount, setCalorieAmount }) {
  const [weight, setWeight] = useState("")
  const [selectedExercises, setSelectedExercises] = useState([])
  const [exerciseResults, setExerciseResults] = useState([])
  const [intensity, setIntensity] = useState("moderate")

  const setIntensityAndRecalculate = (newIntensity) => {
    setIntensity(newIntensity)
    calculateExercises(newIntensity)
  }

  useEffect(() => {
    if (calorieAmount > 0 && selectedExercises.length > 0) {
      calculateExercises()
    }
  }, [calorieAmount, selectedExercises])

  const toggleExercise = (exercise) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise) ? prev.filter((ex) => ex !== exercise) : [...prev, exercise],
    )
  }

  const calculateExerciseAmount = (exercise, calories) => {
    const caloriesPerMinute = exercise.caloriesPerMinute[intensity]
    const minutes = calories / caloriesPerMinute

    if (exercise.type === "reps") {
      const reps = Math.ceil(minutes * exercise.repsPerMinute)
      return { amount: reps, unit: "reps" }
    } else {
      return { amount: Math.ceil(minutes), unit: "minutes" }
    }
  }

  const calculateExercises = (currentIntensity = intensity) => {
    if (!calorieAmount || selectedExercises.length === 0) return

    const caloriesPerExercise = calorieAmount / selectedExercises.length
    const results = selectedExercises.map((exercise) => {
      const caloriesPerMinute = exercise.caloriesPerMinute[currentIntensity]
      const minutes = caloriesPerExercise / caloriesPerMinute
      const amount = exercise.type === "reps" ? Math.ceil(minutes * exercise.repsPerMinute) : Math.ceil(minutes)
      return {
        ...exercise,
        amount,
        unit: exercise.type === "reps" ? "reps" : "minutes",
        caloriesBurned: caloriesPerExercise,
      }
    })

    setExerciseResults(results)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center text-black dark:text-white">
          <Activity className="w-6 h-6 mr-2" />
          Exercise Calculator
        </h2>
        <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2">
          <Flame className="w-5 h-5 mr-2 text-orange-500" />
          <span className="text-black dark:text-white">Target: {calorieAmount.toFixed(2)} calories</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-white">Workout Intensity</label>
            <div className="grid grid-cols-3 gap-2">
              {["low", "moderate", "high"].map((level) => (
                <button
                  key={level}
                  onClick={() => setIntensityAndRecalculate(level)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    intensity === level
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-white">Select Exercises</label>
            <div className="grid grid-cols-2 gap-2">
              {exercises.map((exercise) => (
                <button
                  key={exercise.name}
                  onClick={() => toggleExercise(exercise)}
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    selectedExercises.includes(exercise)
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="flex items-center">
                    <span className="text-2xl mr-2 text-black dark:text-white">{exercise.icon}</span>
                    <span className="text-black dark:text-white">{exercise.name}</span>
                  </span>
                  {selectedExercises.includes(exercise) && <Check className="w-5 h-5 text-black dark:text-white" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center text-black dark:text-white">
            <Activity className="w-5 h-5 mr-2" />
            Exercise Recommendations
          </h3>

          <div className="space-y-3">
            {exerciseResults.map((exercise) => (
              <motion.div
                key={exercise.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3 text-black dark:text-white">{exercise.icon}</span>
                  <div>
                    <div className="font-medium text-black dark:text-white">{exercise.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.amount} {exercise.unit}
                    </div>
                  </div>
                </div>
                <div className="text-sm bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-black dark:text-white">
                  {Math.round(exercise.caloriesBurned)} cal
                </div>
              </motion.div>
            ))}

            {exerciseResults.length === 0 && (
              <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                Select exercises and intensity to see recommendations
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

