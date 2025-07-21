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
import { GoalModal } from './components'
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

type Props = {
  watchGoals: WatchGoals
  loadProducts: LoadProducts
  updateGoal: UpdateGoal
  removeGoal: RemoveGoal
}

export function Goals({
  watchGoals,
  loadProducts,
  updateGoal,
  removeGoal,
}: Props) {
  const toast = useToast()
  const [goals, setGoals] = React.useState<GoalModel[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleRemoveGoal = async (goalId: string) => {
    Alert.alert(
      'Remover Meta',
      'Tem certeza que deseja remover esta meta?',
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
              await removeGoal.execute(goalId)
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
                      <ToastTitle>Meta removida com sucesso</ToastTitle>
                      <ToastDescription>
                        A meta foi removida com sucesso.
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
                      <ToastTitle>Erro ao remover meta</ToastTitle>
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
    const unsubscribe = watchGoals.execute((goals) => {
      setGoals(goals)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchGoals])

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
        data={goals}
        renderItem={({ item }) => (
          <Card size="md" variant="elevated">
            <Heading size="md">{item.product.name}</Heading>
            <Text className="text-xs">ID: {item.id}</Text>

            <VStack className="gap-2 mt-4">
              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Descrição: </Text>
                  {item.description}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Tipo da meta: </Text>
                  {item.type === 'production' ? 'Produção' : 'Vendas'}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Valor alvo: </Text>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.targetValue)}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Valor atual: </Text>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.currentValue)}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Início: </Text>
                  {(item.startDate as any).toDate().toLocaleDateString('pt-BR')}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Prazo: </Text>
                  {(item.deadline as any).toDate().toLocaleDateString('pt-BR')}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Status: </Text>
                  {item.status === 'active'
                    ? 'Ativa'
                    : item.status === 'done'
                    ? 'Concluída'
                    : item.status === 'in_progress'
                    ? 'Em progresso'
                    : 'Cancelada'}
                </Text>
              </HStack>

              <VStack className="mt-4 gap-2">
                <GoalModal
                  item={item}
                  loadProducts={loadProducts}
                  updateGoal={updateGoal}
                />
                <Button onPress={() => handleRemoveGoal(item.id)}>
                  <ButtonText>Excluir meta</ButtonText>
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
