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
import { ProductModal } from './components'
import {
  LoadProducts,
  RemoveProduct,
  UpdateProduct,
  WatchProducts,
} from '@/domain/usecases/product'
import { LoadCategories } from '@/domain/usecases/category'
import React from 'react'
import { ProductModel } from '@/domain/models/product'

type Props = {
  loadProducts: LoadProducts
  loadCategories: LoadCategories
  updateProduct: UpdateProduct
  removeProduct: RemoveProduct
  watchProducts: WatchProducts
}

export function Products({
  loadCategories,
  loadProducts,
  removeProduct,
  updateProduct,
  watchProducts,
}: Props) {
  const toast = useToast()
  const [products, setProducts] = React.useState<LoadProducts.Result>([])
  const [categories, setCategories] = React.useState<LoadCategories.Result>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleRemoveProduct = async (productId: string) => {
    Alert.alert(
      'Remover Produto',
      'Tem certeza que deseja remover este produto?',
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
              await removeProduct.execute(productId)
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
                      <ToastTitle>Produto removido com sucesso</ToastTitle>
                      <ToastDescription>
                        O produto foi removido com sucesso.
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
                      <ToastTitle>Erro ao remover produto</ToastTitle>
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

  const fetchProducts = React.useCallback(async () => {
    try {
      const products = await loadProducts.execute()
      setProducts(products)
    } catch (error) {
      toast.show({
        render: () => (
          <Text className="text-red-500">
            Erro ao carregar produtos. Tente novamente mais tarde.
          </Text>
        ),
      })
    }
  }, [loadProducts])

  const fetchCategories = React.useCallback(async () => {
    try {
      const categories = await loadCategories.execute()
      setCategories(categories)
    } catch (error) {
      toast.show({
        render: () => (
          <Text className="text-red-500">
            Erro ao carregar categorias. Tente novamente mais tarde.
          </Text>
        ),
      })
    }
  }, [loadCategories])

  React.useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  React.useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  React.useEffect(() => {
    const unsubscribe = watchProducts.execute((newProducts) => {
      setProducts(newProducts)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchProducts])

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
        data={products}
        renderItem={({ item }) => (
          <Card size="md" variant="elevated">
            <Heading size="md">{item.name}</Heading>
            <Text className="text-xs">ID: {item.id}</Text>

            <VStack className="gap-2 mt-4">
              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Categoria: </Text>
                  {item.category.name}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Estoque Atual: </Text>
                  {item.stock}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Estoque Mínimo: </Text>
                  {item.minStock}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Estoque Máximo: </Text>
                  {item.maxStock}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Preço: </Text>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.price)}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Custo: </Text>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.cost)}
                </Text>
              </HStack>

              <VStack className="mt-4 gap-2">
                <ProductModal
                  item={item}
                  categories={categories}
                  updateProduct={updateProduct}
                />
                <Button onPress={() => handleRemoveProduct(item.id)}>
                  <ButtonText>Excluir produto</ButtonText>
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
