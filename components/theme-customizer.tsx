"use client"

import * as React from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ColorPicker } from "@/components/ui/color-picker"

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
}

export function ThemeCustomizer() {
  const [colors, setColors] = React.useState<ThemeColors>({
    primary: "#7C3AED", // violet-600
    secondary: "#EC4899", // pink-500
    accent: "#3B82F6", // blue-500
    background: "#581C87", // violet-900
  })

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }))

    // Update CSS variables
    document.documentElement.style.setProperty(`--color-${key}-start`, value)

    // Update gradient end colors
    if (key === "primary") {
      document.documentElement.style.setProperty("--color-primary-end", adjustColor(value, -20))
    } else if (key === "secondary") {
      document.documentElement.style.setProperty("--color-secondary-end", adjustColor(value, -20))
    } else if (key === "accent") {
      document.documentElement.style.setProperty("--color-accent-end", adjustColor(value, -20))
    } else if (key === "background") {
      document.documentElement.style.setProperty("--color-background-end", adjustColor(value, -20))
    }
  }

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    const hex = color.replace("#", "")
    const r = Math.max(Math.min(Number.parseInt(hex.substring(0, 2), 16) + amount, 255), 0)
    const g = Math.max(Math.min(Number.parseInt(hex.substring(2, 4), 16) + amount, 255), 0)
    const b = Math.max(Math.min(Number.parseInt(hex.substring(4, 6), 16) + amount, 255), 0)
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg">
          <Settings className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize Theme</SheetTitle>
          <SheetDescription>Personalize your dashboard colors</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <ColorPicker
            label="Primary Color"
            color={colors.primary}
            onChange={(color) => updateColor("primary", color)}
          />
          <ColorPicker
            label="Secondary Color"
            color={colors.secondary}
            onChange={(color) => updateColor("secondary", color)}
          />
          <ColorPicker label="Accent Color" color={colors.accent} onChange={(color) => updateColor("accent", color)} />
          <ColorPicker
            label="Background Color"
            color={colors.background}
            onChange={(color) => updateColor("background", color)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

