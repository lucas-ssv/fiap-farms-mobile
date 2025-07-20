import { DrawerParamList } from '@/presentation/@types/navigation'
import { Dashboard } from '@/presentation/screens/app'
import { createDrawerNavigator } from '@react-navigation/drawer'

const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>()

export function DrawerRoutes() {
  return (
    <Navigator>
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  )
}
