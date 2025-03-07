'use client'
import {HeroUIProvider} from '@heroui/react';
import { ThemeProvider } from '@/config/shadcn-provider';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          forcedTheme='light'
        >
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </Provider>
  )
};