import { SafeAreaView } from 'react-native-safe-area-context'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import LogoIcon from '@/presentation/assets/logo-icon.png'

import { useAuth } from '@/presentation/contexts'
import { Image, Text, VStack } from '@/presentation/components/ui'

type Props = DrawerContentComponentProps

interface DrawerItem {
  key: string
  title: string
  icon: string
  iconFamily: 'Feather' | 'MaterialIcons' | 'Ionicons'
  route: string
}

const drawerItems: DrawerItem[] = [
  {
    key: 'dashboard',
    title: 'Painel Geral',
    icon: 'dashboard',
    iconFamily: 'MaterialIcons',
    route: 'Dashboard',
  },
  {
    key: 'products',
    title: 'Produtos',
    icon: 'shopping-bag',
    iconFamily: 'Feather',
    route: 'Products',
  },
  {
    key: 'categories',
    title: 'Categorias',
    icon: 'category',
    iconFamily: 'MaterialIcons',
    route: 'Categories',
  },
  {
    key: 'sales',
    title: 'Vendas',
    icon: 'trending-up',
    iconFamily: 'Feather',
    route: 'Sales',
  },
  {
    key: 'customers',
    title: 'Clientes',
    icon: 'users',
    iconFamily: 'Feather',
    route: 'Customers',
  },
  {
    key: 'goals',
    title: 'Metas',
    icon: 'target',
    iconFamily: 'Feather',
    route: 'Goals',
  },
  {
    key: 'productions',
    title: 'Produção',
    icon: 'agriculture',
    iconFamily: 'MaterialIcons',
    route: 'Productions',
  },
]

const IconComponent = ({
  iconFamily,
  name,
  size,
  color,
}: {
  iconFamily: 'Feather' | 'MaterialIcons' | 'Ionicons'
  name: string
  size: number
  color: string
}) => {
  switch (iconFamily) {
    case 'MaterialIcons':
      return <MaterialIcons name={name as any} size={size} color={color} />
    case 'Ionicons':
      return <Ionicons name={name as any} size={size} color={color} />
    default:
      return <Feather name={name as any} size={size} color={color} />
  }
}

export function DrawerContent(props: Props) {
  const { user } = useAuth()
  const { state, navigation } = props

  const handleNavigate = (routeName: string) => {
    navigation.navigate(routeName)
  }

  return (
    <DrawerContentScrollView
      bounces={false}
      contentContainerStyle={{
        marginLeft: 0,
        paddingStart: 0,
        paddingEnd: 0,
        paddingTop: 0,
        flex: 1,
      }}
      {...props}
    >
      <SafeAreaView className="bg-green-600">
        <View className="bg-gradient-to-br from-green-500 to-green-700 px-6 py-8">
          <View className="items-center mb-6">
            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-3">
              <Feather name="user" size={32} color="white" />
            </View>
            <Text className="text-white text-xl font-bold text-center">
              {user?.name || 'Usuário'}
            </Text>
            <Text className="text-green-100 text-sm text-center mt-1">
              {user?.email || 'email@exemplo.com'}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <VStack className="flex-1 px-4 py-6">
        <Text className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4 px-4">
          Navegação
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {drawerItems.map((item, index) => {
            const isActive =
              state.index ===
              state.routes.findIndex((route) => route.name === item.route)

            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => handleNavigate(item.route)}
                className={`flex-row items-center py-4 px-4 rounded-xl mb-2 ${
                  isActive
                    ? 'bg-green-50 border-l-4 border-green-500'
                    : 'bg-transparent'
                }`}
              >
                <View
                  className={`w-10 h-10 rounded-lg items-center justify-center ${
                    isActive ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  <IconComponent
                    iconFamily={item.iconFamily}
                    name={item.icon}
                    size={20}
                    color={isActive ? '#059669' : '#6B7280'}
                  />
                </View>
                <Text
                  className={`ml-4 font-medium ${
                    isActive ? 'text-green-600' : 'text-gray-700'
                  }`}
                >
                  {item.title}
                </Text>
                {isActive && (
                  <View className="ml-auto">
                    <Feather name="chevron-right" size={16} color="#059669" />
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </VStack>

      <View className="border-t border-gray-200 p-4">
        <View className="flex-row items-center justify-center py-2">
          <Image source={LogoIcon} className="w-6 h-6" alt="Logo FIAP Farms" />
          <Text className="text-gray-500 text-xs ml-2">FIAP Farms</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  )
}
