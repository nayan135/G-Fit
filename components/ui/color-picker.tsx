"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2">
          <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: color }} />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Choose {label}</h4>
            <p className="text-sm text-muted-foreground">Pick a color or enter a hex value</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-5 gap-2">
              {[
                "#FF0000",
                "#00FF00",
                "#0000FF",
                "#FFFF00",
                "#FF00FF",
                "#00FFFF",
                "#FFA500",
                "#800080",
                "#008000",
                "#000080",
              ].map((presetColor) => (
                <button
                  key={presetColor}
                  className="h-6 w-6 rounded-md border"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => onChange(presetColor)}
                />
              ))}
            </div>
            <input type="color" value={color} onChange={(e) => onChange(e.target.value)} className="w-full" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

