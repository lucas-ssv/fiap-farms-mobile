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
import { SaleModal } from './components'
import {
  LoadProducts,
  RemoveProduct,
  UpdateProduct,
  WatchProducts,
} from '@/domain/usecases/product'
import { LoadCategories } from '@/domain/usecases/category'
import React from 'react'
import { ProductModel } from '@/domain/models/product'
import { RemoveSale, UpdateSale, WatchSales } from '@/domain/usecases/sale'
import { LoadCustomers } from '@/domain/usecases/customer'
import { LoadAccounts } from '@/domain/usecases/account'
import { SaleModel } from '@/domain/models/sale'

type Props = {
  watchSales: WatchSales
  loadProducts: LoadProducts
  loadCustomers: LoadCustomers
  loadAccounts: LoadAccounts
  updateSale: UpdateSale
  removeSale: RemoveSale
}

export function Sales({
  loadProducts,
  loadCustomers,
  loadAccounts,
  updateSale,
  removeSale,
  watchSales,
}: Props) {
  const toast = useToast()
  const [sales, setSales] = React.useState<SaleModel[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleRemoveSale = async (saleId: string) => {
    Alert.alert(
      'Remover Venda',
      'Tem certeza que deseja remover esta venda?',
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
              await removeSale.execute(saleId)
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
                      <ToastTitle>Venda removida com sucesso</ToastTitle>
                      <ToastDescription>
                        A venda foi removida com sucesso.
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
                      <ToastTitle>Erro ao remover venda</ToastTitle>
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
    const unsubscribe = watchSales.execute((sales) => {
      setSales(sales)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [watchSales])

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
        data={sales}
        renderItem={({ item }) => (
          <Card size="md" variant="elevated">
            <Heading size="md">{item.product.name}</Heading>
            <Text className="text-xs">ID: {item.id}</Text>

            <VStack className="gap-2 mt-4">
              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Cliente: </Text>
                  {item.customer?.name}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Vendedor: </Text>
                  {item.user?.name}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Quantidade: </Text>
                  {item.quantity}
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
                  <Text className="font-medium">Status: </Text>
                  {item.status === 'pending' ? (
                    <Text className="text-yellow-500">Pendente</Text>
                  ) : item.status === 'completed' ? (
                    <Text className="text-green-500">Concluído</Text>
                  ) : (
                    <Text className="text-red-500">Cancelado</Text>
                  )}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Data da venda: </Text>
                  {(item.saleDate as any).toDate().toLocaleDateString('pt-BR')}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Preço unitário: </Text>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.unitPrice)}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Preço total: </Text>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.totalPrice)}
                </Text>
              </HStack>

              <VStack className="mt-4 gap-2">
                <SaleModal
                  item={item}
                  loadProducts={loadProducts}
                  loadCustomers={loadCustomers}
                  loadAccounts={loadAccounts}
                  updateSale={updateSale}
                />
                <Button onPress={() => handleRemoveSale(item.id)}>
                  <ButtonText>Excluir venda</ButtonText>
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
