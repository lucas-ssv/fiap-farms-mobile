import {
  MakeCategories,
  MakeProducts,
} from '@/main/factories/screens/app/Products'
import { DrawerParamList } from '@/presentation/@types/navigation'
import { Dashboard } from '@/presentation/screens/app'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from './components'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import Feather from '@expo/vector-icons/Feather'
import { Logout } from '@/domain/usecases/account'
import { useAuth } from '@/presentation/contexts'
import { MakeSales } from '@/main/factories/screens/app/Sales'

const { Navigator, Screen, Group } = createDrawerNavigator<DrawerParamList>()

type Props = {
  logout: Logout
}

export function DrawerRoutes({ logout }: Props) {
  const navigation = useNavigation()
  const { logoutUser } = useAuth()

  const handleLogout = async () => {
    await logout.execute()
    logoutUser()
  }

  return (
    <Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft({ tintColor }) {
          return (
            <Feather
              name="menu"
              color={tintColor}
              size={22}
              style={{ marginStart: 16 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          )
        },
        headerLeftContainerStyle: {
          paddingHorizontal: 8,
        },
        headerRightContainerStyle: {
          paddingHorizontal: 24,
        },
        headerTintColor: '#11813c',
        headerRight() {
          return (
            <Feather
              name="log-out"
              color="#11813c"
              size={22}
              style={{ marginStart: 16 }}
              onPress={handleLogout}
            />
          )
        },
        drawerItemStyle: {
          borderRadius: 8,
        },
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: '#11813c',
      }}
    >
      <Screen name="Dashboard" component={Dashboard} />
      <Group>
        <Screen name="Products" component={MakeProducts} />
        <Screen name="Categories" component={MakeCategories} />
      </Group>
      <Group>
        <Screen name="Sales" component={MakeSales} />
      </Group>
    </Navigator>
  )
}
