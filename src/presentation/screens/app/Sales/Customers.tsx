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
import { CustomerModal, SaleModal } from './components'
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
import {
  LoadCustomers,
  RemoveCustomer,
  UpdateCustomer,
  WatchCustomers,
} from '@/domain/usecases/customer'
import { LoadAccounts } from '@/domain/usecases/account'
import { SaleModel } from '@/domain/models/sale'
import { CustomerModel } from '@/domain/models/customer'

type Props = {
  watchCustomers: WatchCustomers
  updateCustomer: UpdateCustomer
  removeCustomer: RemoveCustomer
}

export function Customers({
  watchCustomers,
  updateCustomer,
  removeCustomer,
}: Props) {
  const toast = useToast()
  const [customers, setCustomers] = React.useState<CustomerModel[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleRemoveCustomer = async (customerId: string) => {
    Alert.alert(
      'Remover Cliente',
      'Tem certeza que deseja remover este cliente?',
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
              await removeCustomer.execute(customerId)
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
                      <ToastTitle>Cliente removido com sucesso</ToastTitle>
                      <ToastDescription>
                        O cliente foi removido com sucesso.
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
                      <ToastTitle>Erro ao remover cliente</ToastTitle>
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
    const unsubscribe = watchCustomers.execute((customers) => {
      setCustomers(customers)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [watchCustomers])

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
        data={customers}
        renderItem={({ item }) => (
          <Card size="md" variant="elevated">
            <Heading size="md">{item.name}</Heading>
            <Text className="text-xs">ID: {item.id}</Text>

            <VStack className="gap-2 mt-4">
              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">E-mail: </Text>
                  {item.email}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Telefone: </Text>
                  {item.phone || 'Não informado'}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">CEP: </Text>
                  {item.postalCode || 'Não informado'}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Cidade: </Text>
                  {item.city}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Estado: </Text>
                  {item.state}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Bairro: </Text>
                  {item.neighborhood}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Rua: </Text>
                  {item.address}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Número: </Text>
                  {item.addressNumber}
                </Text>
              </HStack>

              <HStack>
                <Text className="flex-1">
                  <Text className="font-medium">Complemento: </Text>
                  {item.addressComplement}
                </Text>
              </HStack>

              <VStack className="mt-4 gap-2">
                <CustomerModal
                  item={item}
                  updateCustomer={updateCustomer}
                  removeCustomer={removeCustomer}
                />
                <Button onPress={() => handleRemoveCustomer(item.id)}>
                  <ButtonText>Excluir cliente</ButtonText>
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
