import {
  Button,
  ButtonText,
  Card,
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@/presentation/components/ui'
import { FlatList } from 'react-native'
import { ProductModal } from './components'
import {
  LoadProducts,
  RemoveProduct,
  UpdateProduct,
  WatchProducts,
} from '@/domain/usecases/product'
import { LoadCategories } from '@/domain/usecases/category'
import React from 'react'

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
            <Heading size="md">Quick Start</Heading>
            <Text className="text-xs">dasdasdsdsdsdd</Text>

            <VStack className="gap-2 mt-4">
              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Categoria: </Text>
                  Start building your next project in minutesda sdsdas
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Categoria: </Text>
                  Start building your next project in minutesda sdsdas
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Estoque Atual: </Text>
                  Start building your next project in minutesda sdsdas
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Estoque Mínimo: </Text>
                  Start building your next project in minutesda sdsdas
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Estoque Máximo: </Text>
                  Start building your next project in minutesda sdsdas
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Preço: </Text>
                  Start building your next project in minutesda sdsdas
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Custo: </Text>
                  Start building your next project in minutesda sdsdas
                </Text>
              </HStack>

              <VStack className="mt-4 gap-2">
                <ProductModal
                  item={item}
                  categories={categories}
                  removeProduct={removeProduct}
                  updateProduct={updateProduct}
                />
                <Button>
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
