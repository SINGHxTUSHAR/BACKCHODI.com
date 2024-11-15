'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Moon, Sun, AlertTriangle } from 'lucide-react'

// Simulated LLM function (replace with actual API call in production)
const generateWarning = async (count: number) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return `Warning: Performing this habit ${count} times may be excessive. Consider moderating your behavior for better health outcomes.`
}

export default function Component() {
  const [count, setCount] = useState(0)
  const [warning, setWarning] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkWarning = async () => {
      if (count > 15) {
        const warningMessage = await generateWarning(count)
        setWarning(warningMessage)
      } else {
        setWarning(null)
      }
    }
    checkWarning()
  }, [count])

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1)
  }

  const resetCount = () => {
    setCount(0)
    setWarning(null)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <nav className="flex justify-between items-center p-4 bg-secondary">
        <h1 className="text-2xl font-bold text-primary">Mhutti_Tracker</h1>
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary"
          >
            Streaks
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-primary"
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Habit Tracker</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="text-4xl font-bold">{count}</div>
            <Button 
              onClick={incrementCount}
              className="px-6 py-3 text-lg"
            >
              Performed Habit
            </Button>
            <Button 
              onClick={resetCount}
              variant="outline"
              className="px-6 py-3 text-lg"
            >
              Reset
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Click the button each time you perform your habit
            </p>
          </CardContent>
        </Card>

        {warning && (
          <Alert variant="destructive" className="w-full max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Health Hazard Warning</AlertTitle>
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        )}
      </main>

      <footer className="bg-secondary p-4 text-center text-sm text-muted-foreground">
        <p>© 2024 Mhutti_Tracker. All rights reserved.</p>
        <p>A simple habit tracking app to help you build better habits.</p>
        <p>For support, contact: support@mhutti-tracker.com</p>
      </footer>
    </div>
  )
}
