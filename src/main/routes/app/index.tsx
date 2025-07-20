import { NavigationContainer } from '@react-navigation/native'
import { DrawerRoutes } from './(drawer)'

export function AppRoutes() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  )
}
