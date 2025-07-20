import { StatusBar } from 'expo-status-bar'
import '@/presentation/styles/global.css'
import { GluestackUIProvider } from '@/presentation/components/ui/gluestack-ui-provider'
import { StyleSheet, View } from 'react-native'
import { useFonts } from 'expo-font'
import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
} from '@expo-google-fonts/geist'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Text } from '@/presentation/components/ui'
import { Login } from '@/presentation/screens/auth'
import { MakeLogin } from './factories/screens/auth'
import { MakeAuthProvider } from './factories/providers'

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
        <MakeLogin />
      </MakeAuthProvider>
      <StatusBar style="auto" />
    </GluestackUIProvider>
  )
}
