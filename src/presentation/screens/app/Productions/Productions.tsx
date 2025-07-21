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
import { ProductionModal } from './components'
import {
  LoadProducts,
  RemoveProduct,
  UpdateProduct,
  WatchProducts,
} from '@/domain/usecases/product'
import { LoadCategories } from '@/domain/usecases/category'
import React from 'react'
import { RemoveGoal, UpdateGoal, WatchGoals } from '@/domain/usecases/goal'
import { GoalModel } from '@/domain/models/goal'
import {
  RemoveProduction,
  UpdateProduction,
  WatchProductions,
} from '@/domain/usecases/production'
import { ProductionModel } from '@/domain/models/production'
import { GoalModal } from '../Goals/components'

type Props = {
  watchProductions: WatchProductions
  loadProducts: LoadProducts
  updateProduction: UpdateProduction
  removeProduction: RemoveProduction
}

export function Productions({
  watchProductions,
  loadProducts,
  updateProduction,
  removeProduction,
}: Props) {
  const toast = useToast()
  const [productions, setProductions] = React.useState<ProductionModel[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleRemoveProduction = async (productionId: string) => {
    Alert.alert(
      'Remover Produção',
      'Tem certeza que deseja remover esta produção?',
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
              await removeProduction.execute(productionId)
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
                      <ToastTitle>Produção removida com sucesso</ToastTitle>
                      <ToastDescription>
                        A produção foi removida com sucesso.
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
                      <ToastTitle>Erro ao remover produção</ToastTitle>
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
    const unsubscribe = watchProductions.execute((productions) => {
      setProductions(productions)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchProductions])

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
        data={productions}
        renderItem={({ item }) => (
          <Card size="md" variant="elevated">
            <Heading size="md">{item.product.name}</Heading>
            <Text className="text-xs">ID: {item.id}</Text>

            <VStack className="gap-2 mt-4">
              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Categoria: </Text>
                  {item.product.category.name}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Status: </Text>
                  {item.status === 'harvested'
                    ? 'Colhida'
                    : item.status === 'in_production'
                    ? 'Em Produção'
                    : 'Aguardando'}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Quantidade faltando: </Text>
                  {item.quantity}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Quantidade produzida: </Text>
                  {item.quantityProduced}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Unidade: </Text>
                  {item.unit === 'unit' ? 'Unidade' : 'kg'}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Data de início: </Text>
                  {(item.startDate as any).toDate().toLocaleDateString('pt-BR')}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Data de colheita: </Text>
                  {(item.harvestDate as any)
                    .toDate()
                    .toLocaleDateString('pt-BR')}
                </Text>
              </HStack>

              <VStack className="mt-4 gap-2">
                <ProductionModal
                  item={item}
                  loadProducts={loadProducts}
                  updateProduction={updateProduction}
                />
                <Button onPress={() => handleRemoveProduction(item.id)}>
                  <ButtonText>Excluir produção</ButtonText>
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
