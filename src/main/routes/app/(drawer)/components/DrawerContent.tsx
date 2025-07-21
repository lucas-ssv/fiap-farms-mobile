import { SafeAreaView } from 'react-native-safe-area-context'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import { useAuth } from '@/presentation/contexts'
import { Text, VStack } from '@/presentation/components/ui'

type Props = DrawerContentComponentProps

export function DrawerContent(props: Props) {
  const { user } = useAuth()

  return (
    <DrawerContentScrollView
      bounces={false}
      contentContainerStyle={{
        marginLeft: 0,
        paddingStart: 0,
        paddingEnd: 0,
        paddingTop: 0,
      }}
      {...props}
    >
      <SafeAreaView className="bg-custom-my-dark-green">
        <VStack className="bg-custom-my-dark-green my-4 px-4">
          <Text className="text-custom-black text-lg font-medium mt-2">
            {user?.name}
          </Text>
          <Text className="text-custom-gray text-sm font-body mt-1">
            {user?.email}
          </Text>
        </VStack>
      </SafeAreaView>

      <VStack className="p-4">
        <DrawerItemList {...props} />
      </VStack>
    </DrawerContentScrollView>
  )
}
