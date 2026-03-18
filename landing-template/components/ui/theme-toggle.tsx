"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { useTheme as useNextTheme } from "next-themes"
import { useTheme, themes, type ThemeName } from "@/components/providers/theme-provider"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme: setNextTheme } = useNextTheme()
  const { currentTheme, setTheme } = useTheme()

  const handleThemeChange = (themeName: ThemeName) => {
    setTheme(themeName)
    const theme = themes[themeName]
    // Also update next-themes for system compatibility
    setNextTheme(theme.category === 'dark' ? 'dark' : 'light')
  }

  const lightThemes = Object.entries(themes).filter(([_, theme]) => theme.category === 'light')
  const darkThemes = Object.entries(themes).filter(([_, theme]) => theme.category === 'dark')

  const currentThemeData = themes[currentTheme]
  const isDark = currentThemeData.category === 'dark'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          {isDark ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center">
          <Palette className="mr-2 h-4 w-4" />
          Choose Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Light Themes
        </DropdownMenuLabel>
        {lightThemes.map(([key, theme]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleThemeChange(key as ThemeName)}
            className={currentTheme === key ? "bg-accent" : ""}
          >
            <Sun className="mr-2 h-4 w-4" />
            {theme.name}
            {currentTheme === key && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Dark Themes
        </DropdownMenuLabel>
        {darkThemes.map(([key, theme]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleThemeChange(key as ThemeName)}
            className={currentTheme === key ? "bg-accent" : ""}
          >
            <Moon className="mr-2 h-4 w-4" />
            {theme.name}
            {currentTheme === key && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleThemeChange('light')}>
          <Monitor className="mr-2 h-4 w-4" />
          System Default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SimpleThemeToggle() {
  const { currentTheme, setTheme } = useTheme()
  const { setTheme: setNextTheme } = useNextTheme()

  const currentThemeData = themes[currentTheme]
  const isDark = currentThemeData.category === 'dark'

  const toggleTheme = () => {
    if (isDark) {
      setTheme('light')
      setNextTheme('light')
    } else {
      setTheme('dark')
      setNextTheme('dark')
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 px-0">
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}