import {
  MakeCategories,
  MakeProducts,
} from '@/main/factories/screens/app/Products'
import { MakeDashboard } from '@/main/factories/screens/app/dashboard-factory'
import { DrawerParamList } from '@/presentation/@types/navigation'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from './components'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import Feather from '@expo/vector-icons/Feather'
import { Logout } from '@/domain/usecases/account'
import { useAuth } from '@/presentation/contexts'
import { MakeCustomers, MakeSales } from '@/main/factories/screens/app/Sales'
import { MakeGoals } from '@/main/factories/screens/app/Goals'
import { MakeProductions } from '@/main/factories/screens/app/Productions'
import { View } from 'react-native'

const { Navigator, Screen, Group } = createDrawerNavigator<DrawerParamList>()

type Props = {
  logout: Logout
}

const screenTitles = {
  Dashboard: 'Painel Geral',
  Products: 'Produtos',
  Categories: 'Categorias',
  Sales: 'Vendas',
  Customers: 'Clientes',
  Goals: 'Metas',
  Productions: 'Produção',
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
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f8fafc',
          elevation: 2,
          shadowOpacity: 0.1,
          borderBottomWidth: 1,
          borderBottomColor: '#e2e8f0',
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: '#1e293b',
        },
        headerLeft({ tintColor }) {
          return (
            <View style={{ marginLeft: 16 }}>
              <Feather
                name="menu"
                color="#059669"
                size={24}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            </View>
          )
        },
        headerLeftContainerStyle: {
          paddingHorizontal: 8,
        },
        headerRightContainerStyle: {
          paddingHorizontal: 16,
        },
        headerRight() {
          return (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
            >
              <Feather
                name="log-out"
                color="#dc2626"
                size={20}
                onPress={handleLogout}
              />
            </View>
          )
        },
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: 'white',
          width: 280,
        },
        drawerItemStyle: {
          display: 'none',
        },
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: '#059669',
        drawerInactiveTintColor: '#6b7280',
        title:
          screenTitles[route.name as keyof typeof screenTitles] || route.name,
      })}
    >
      <Screen
        name="Dashboard"
        component={MakeDashboard}
        options={{
          headerLeft({ tintColor }) {
            return (
              <View
                style={{
                  marginLeft: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Feather
                  name="menu"
                  color="#059669"
                  size={24}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            )
          },
        }}
      />
      <Group
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f0fdf4',
          },
        }}
      >
        <Screen name="Products" component={MakeProducts} />
        <Screen name="Categories" component={MakeCategories} />
      </Group>
      <Group
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ecfdf5',
          },
        }}
      >
        <Screen name="Sales" component={MakeSales} />
        <Screen name="Customers" component={MakeCustomers} />
        <Screen name="Goals" component={MakeGoals} />
      </Group>
      <Group
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f0f9ff',
          },
        }}
      >
        <Screen name="Productions" component={MakeProductions} />
      </Group>
    </Navigator>
  )
}
