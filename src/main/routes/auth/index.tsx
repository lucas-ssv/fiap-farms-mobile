import { NavigationContainer } from '@react-navigation/native'
import { AuthStackRoutes } from './(stack)'

export function AuthRoutes() {
  return (
    <NavigationContainer>
      <AuthStackRoutes />
    </NavigationContainer>
  )
}
