
import {HeroUIProvider} from '@heroui/react'
import { ThemeProvider } from '@/config/shadcn-provider'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          forcedTheme='light'
        >
            {children}
        </ThemeProvider>
    </HeroUIProvider>
  )
}