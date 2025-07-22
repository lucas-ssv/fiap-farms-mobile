import { StatusBar } from 'expo-status-bar'
import '@/presentation/styles/global.css'
import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { useFonts } from 'expo-font'
import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
} from '@expo-google-fonts/geist'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { MakeAuthProvider } from './factories/providers'
import { Routes } from './routes'

export default function App() {
  const [loaded, error] = useFonts({
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <GluestackUIProvider mode="light">
      <MakeAuthProvider>
        <Routes />
      </MakeAuthProvider>
      <StatusBar style="auto" />
    </GluestackUIProvider>
  )
}
