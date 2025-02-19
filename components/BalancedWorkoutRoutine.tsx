"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Dumbbell, Heart } from "lucide-react"

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

const workoutTypes = {
  cardio: ["Jumping Jacks", "Running", "Cycling", "Swimming", "Jump Rope"],
  strength: ["Push-ups", "Squats", "Sit-ups"],
  flexibility: [
    { name: "Hamstring Stretch", duration: 30, intensity: "low" },
    { name: "Shoulder Stretch", duration: 30, intensity: "low" },
    { name: "Hip Flexor Stretch", duration: 30, intensity: "low" },
    { name: "Cat-Cow Stretch", reps: 10, intensity: "low" },
  ],
}

export default function BalancedWorkoutRoutine({ calorieAmount, setCalorieAmount }) {
  const [intensity, setIntensity] = useState("moderate")
  const [workoutPlan, setWorkoutPlan] = useState(null)

  useEffect(() => {
    if (calorieAmount > 0) {
      generateWorkoutPlan()
    }
  }, [calorieAmount])

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

  const generateWorkoutPlan = (currentIntensity = intensity) => {
    if (!calorieAmount) return

    const cardioCalories = calorieAmount * 0.5
    const strengthCalories = calorieAmount * 0.3
    const flexibilityCalories = calorieAmount * 0.2

    const cardioExercises = workoutTypes.cardio.map((name) => exercises.find((ex) => ex.name === name))
    const strengthExercises = workoutTypes.strength.map((name) => exercises.find((ex) => ex.name === name))

    const plan = {
      totalCalories: calorieAmount,
      sections: [
        {
          name: "Cardio",
          exercises: cardioExercises.map((exercise) => {
            const caloriesPerMinute = exercise.caloriesPerMinute[currentIntensity]
            const minutes = cardioCalories / cardioExercises.length / caloriesPerMinute
            return {
              ...exercise,
              amount: Math.ceil(minutes),
              unit: "minutes",
            }
          }),
        },
        {
          name: "Strength",
          exercises: strengthExercises.map((exercise) => {
            const caloriesPerMinute = exercise.caloriesPerMinute[currentIntensity]
            const minutes = strengthCalories / strengthExercises.length / caloriesPerMinute
            return {
              ...exercise,
              amount: Math.ceil(minutes * exercise.repsPerMinute),
              unit: "reps",
            }
          }),
        },
        {
          name: "Flexibility",
          exercises: workoutTypes.flexibility,
        },
      ],
    }

    setWorkoutPlan(plan)
  }

  const setIntensityAndRegenerate = (newIntensity) => {
    setIntensity(newIntensity)
    generateWorkoutPlan(newIntensity)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center text-black dark:text-white">
          <Dumbbell className="w-6 h-6 mr-2" />
          Balanced Workout Routine
        </h2>
        <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2">
          <Heart className="w-5 h-5 mr-2 text-red-500" />
          <span className="text-black dark:text-white">Target: {calorieAmount.toFixed(2)} calories</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Workout Intensity</label>
          <div className="grid grid-cols-3 gap-2">
            {["low", "moderate", "high"].map((level) => (
              <button
                key={level}
                onClick={() => setIntensityAndRegenerate(level)}
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

        {workoutPlan ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                <span className="text-black dark:text-white">{workoutPlan.totalCalories.toFixed(2)} calories</span>
              </div>
            </div>

            <div className="space-y-4">
              {workoutPlan.sections.map((section, idx) => (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
                >
                  <h3 className="text-lg font-medium mb-3 flex items-center text-black dark:text-white">
                    <Dumbbell className="w-5 h-5 mr-2" />
                    {section.name}
                  </h3>
                  <div className="space-y-2">
                    {section.exercises.map((exercise, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3"
                      >
                        <span className="flex items-center text-black dark:text-white">
                          <span className="text-2xl mr-2">{exercise.icon}</span>
                          {exercise.name}
                        </span>
                        <span className="text-sm bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-black dark:text-white">
                          {exercise.amount
                            ? `${exercise.amount} ${exercise.unit}`
                            : exercise.duration
                              ? `${exercise.duration} sec`
                              : `${exercise.reps} reps`}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-8">
            Enter your target calories to generate a balanced workout plan
          </div>
        )}
      </div>
    </div>
  )
}

