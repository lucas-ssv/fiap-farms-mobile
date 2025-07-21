import {
  Button,
  ButtonText,
  Card,
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from '@/presentation/components/ui'
import { Alert, FlatList } from 'react-native'
import {
  LoadCategories,
  RemoveCategory,
  UpdateCategory,
  WatchCategories,
} from '@/domain/usecases/category'
import React from 'react'
import { CategoryModal } from './components/CategoryModal'

type Props = {
  watchCategories: WatchCategories
  updateCategory: UpdateCategory
  removeCategory: RemoveCategory
}

export function Categories({
  watchCategories,
  updateCategory,
  removeCategory,
}: Props) {
  const toast = useToast()
  const [categories, setCategories] = React.useState<LoadCategories.Result>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleRemoveCategory = async (categoryId: string) => {
    Alert.alert(
      'Remover Categoria',
      'Tem certeza que deseja remover esta categoria?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeCategory.execute(categoryId)
              toast.show({
                placement: 'top',
                render({ id }) {
                  const uniqueToastId = 'toast-' + id
                  return (
                    <Toast
                      nativeID={uniqueToastId}
                      action="success"
                      variant="solid"
                    >
                      <ToastTitle>Categoria removida com sucesso</ToastTitle>
                      <ToastDescription>
                        A categoria foi removida com sucesso.
                      </ToastDescription>
                    </Toast>
                  )
                },
              })
            } catch (error) {
              toast.show({
                placement: 'top',
                render({ id }) {
                  const uniqueToastId = 'toast-' + id
                  return (
                    <Toast
                      nativeID={uniqueToastId}
                      action="error"
                      variant="solid"
                    >
                      <ToastTitle>Erro ao remover categoria</ToastTitle>
                      <ToastDescription>
                        Verifique suas credenciais e tente novamente.
                      </ToastDescription>
                    </Toast>
                  )
                },
              })
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  React.useEffect(() => {
    const unsubscribe = watchCategories.execute((categories) => {
      setCategories(categories)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [watchCategories])

  if (isLoading) {
    return (
      <Center className="h-screen">
        <Spinner />
      </Center>
    )
  }

  return (
    <VStack>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Card size="md" variant="elevated">
            <Heading size="md">{item.name}</Heading>
            <Text className="text-xs">ID: {item.id}</Text>

            <VStack className="gap-2 mt-4">
              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Descrição: </Text>
                  {item.description}
                </Text>
              </HStack>

              <VStack className="mt-4 gap-2">
                <CategoryModal
                  item={item}
                  categories={categories}
                  updateCategory={updateCategory}
                />
                <Button onPress={() => handleRemoveCategory(item.id)}>
                  <ButtonText>Excluir categoria</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </Card>
        )}
        contentContainerClassName="p-4 pb-10 gap-4"
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}
