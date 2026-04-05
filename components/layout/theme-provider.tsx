"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { useThemeStore } from "@/lib/store/themeStore"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}



function ThemeHotkey() {
  const { isDark, toggleTheme } = useThemeStore()
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {

    if (isDark) setTheme("dark")
    else setTheme("light")

  }, [resolvedTheme, setTheme, isDark])

  return null
}

export { ThemeProvider }
