import { MakeLogin, MakeSignUp } from '@/main/factories/screens/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={MakeLogin} />
      <Screen name="SignUp" component={MakeSignUp} />
    </Navigator>
  )
}
