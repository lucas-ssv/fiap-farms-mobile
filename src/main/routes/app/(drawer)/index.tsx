import { MakeProducts } from '@/main/factories/screens/app/Products'
import { DrawerParamList } from '@/presentation/@types/navigation'
import { Dashboard } from '@/presentation/screens/app'
import { createDrawerNavigator } from '@react-navigation/drawer'

const { Navigator, Screen, Group } = createDrawerNavigator<DrawerParamList>()

export function DrawerRoutes() {
  return (
    <Navigator>
      <Screen name="Dashboard" component={Dashboard} />
      <Group>
        <Screen name="Products" component={MakeProducts} />
      </Group>
    </Navigator>
  )
}
