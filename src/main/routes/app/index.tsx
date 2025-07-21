import { NavigationContainer } from '@react-navigation/native'
import { DrawerRoutes } from './(drawer)'
import { Logout } from '@/domain/usecases/account'

type Props = {
  logout: Logout
}

export function AppRoutes({ logout }: Props) {
  return (
    <NavigationContainer>
      <DrawerRoutes logout={logout} />
    </NavigationContainer>
  )
}
