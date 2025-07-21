import { UserModel } from '@/domain/models/account'
import { CustomerModel } from '@/domain/models/customer'
import { ProductModel } from '@/domain/models/product'
import { SaleModel } from '@/domain/models/sale'
import { LoadAccounts } from '@/domain/usecases/account'
import { LoadCategories } from '@/domain/usecases/category'
import { LoadCustomers } from '@/domain/usecases/customer'
import {
  LoadProducts,
  RemoveProduct,
  UpdateProduct,
} from '@/domain/usecases/product'
import { UpdateSale } from '@/domain/usecases/sale'
import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDownIcon,
  Divider,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Spinner,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/presentation/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import MaskInput, { Masks } from 'react-native-mask-input'
import z from 'zod/v4'

const schema = z.object({
  product: z
    .object({
      label: z.string().min(2).max(100),
      value: z.string().uuid(),
    })
    .optional(),
  customer: z
    .object({
      label: z.string().min(2).max(100),
      value: z.string().uuid(),
    })
    .optional(),
  user: z
    .object({
      label: z.string().min(2).max(100),
      value: z.string().uuid(),
    })
    .optional(),
  quantity: z.number().optional(),
  saleDate: z.date().optional(),
  totalPrice: z.string().optional(),
  unitPrice: z.string().optional(),
  discount: z.number().optional(),
  status: z.enum(['pending', 'completed', 'cancelled']).optional(),
  paymentMethod: z.string().optional(),
})

type UpdateSaleFormData = z.infer<typeof schema>

type Props = {
  item: SaleModel
  loadProducts: LoadProducts
  loadCustomers: LoadCustomers
  loadAccounts: LoadAccounts
  updateSale: UpdateSale
}

export function SaleModal({
  item,
  loadProducts,
  loadCustomers,
  loadAccounts,
  updateSale,
}: Props) {
  const toast = useToast()
  const form = useForm<UpdateSaleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      product: {
        label: item.product?.name || '',
        value: item.product?.id || '',
      },
      customer: {
        label: item.customer?.name || '',
        value: item.customer?.id || '',
      },
      user: {
        label: item.user?.name || '',
        value: item.user?.id || '',
      },
      quantity: item.quantity,
      saleDate: (item.saleDate as any).toDate(),
      totalPrice: String(item.totalPrice),
      unitPrice: String(item.unitPrice),
      discount: item.discount ?? 0,
      status: item.status,
      paymentMethod: item.paymentMethod,
    },
  })
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState<ProductModel[]>([])
  const [customers, setCustomers] = useState<CustomerModel[]>([])
  const [accounts, setAccounts] = useState<
    Omit<UserModel, 'userUID' | 'password'>[]
  >([])

  const handleUpdateSale = async (data: UpdateSaleFormData) => {
    try {
      await updateSale.execute(item.id, {
        ...data,
        productId: data.product?.value,
        customerId: data.customer?.value,
        userId: data.user?.value,
        totalPrice: Number(data.totalPrice),
        unitPrice: Number(data.unitPrice),
      })
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="solid">
              <ToastTitle>Produto atualizado com sucesso</ToastTitle>
              <ToastDescription>
                O produto foi atualizado com sucesso.
              </ToastDescription>
            </Toast>
          )
        },
      })
      setShowModal(false)
    } catch (error) {
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="solid">
              <ToastTitle>Erro ao atualizar produto</ToastTitle>
              <ToastDescription>
                Verifique suas credenciais e tente novamente.
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }

  const fetchProducts = useCallback(async () => {
    try {
      const products = await loadProducts.execute()
      setProducts(products)
    } catch (error) {
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="solid">
              <ToastTitle>Erro ao carregar produtos</ToastTitle>
              <ToastDescription>
                Verifique suas credenciais e tente novamente.
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }, [loadProducts])

  const fetchCustomers = useCallback(async () => {
    try {
      const customers = await loadCustomers.execute()
      setCustomers(customers)
    } catch (error) {
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="solid">
              <ToastTitle>Erro ao carregar clientes</ToastTitle>
              <ToastDescription>
                Verifique suas credenciais e tente novamente.
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }, [loadCustomers])

  const fetchAccounts = useCallback(async () => {
    try {
      const accounts = await loadAccounts.execute()
      setAccounts(accounts)
    } catch (error) {
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="solid">
              <ToastTitle>Erro ao carregar vendedores</ToastTitle>
              <ToastDescription>
                Verifique suas credenciais e tente novamente.
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }, [loadAccounts])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  return (
    <>
      <Button action="positive" onPress={() => setShowModal(true)}>
        <ButtonText>Atualizar produto</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              {item.product.name}
            </Heading>
          </ModalHeader>
          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Nome do produto</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="product"
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} selectedValue={value?.label}>
                    <SelectTrigger
                      variant="outline"
                      size="xl"
                      className="h-12 bg-white border border-custom-light-gray rounded-lg"
                    >
                      <SelectInput
                        className="flex-1 text-md placeholder:text-custom-my-placeholder"
                        placeholder="Selecione o tipo de transação"
                      />
                      <SelectIcon
                        className="mr-3"
                        size="sm"
                        as={ChevronDownIcon}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <Heading className="text-md my-4">Produtos</Heading>
                        <Divider />
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            label={product.name}
                            value={product.id}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              {form.formState.errors.product && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.product?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="customer"
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} selectedValue={value?.label}>
                    <SelectTrigger
                      variant="outline"
                      size="xl"
                      className="h-12 bg-white border border-custom-light-gray rounded-lg"
                    >
                      <SelectInput
                        className="flex-1 text-md placeholder:text-custom-my-placeholder"
                        placeholder="Selecione uma categoria"
                      />
                      <SelectIcon
                        className="mr-3"
                        size="sm"
                        as={ChevronDownIcon}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <Heading className="text-md my-4">Clientes</Heading>
                        <Divider />
                        {customers.map((customer) => (
                          <SelectItem
                            key={customer.id}
                            label={customer.name}
                            value={customer.id}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              {form.formState.errors.customer && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.customer?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Vendedor</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="user"
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} selectedValue={value?.label}>
                    <SelectTrigger
                      variant="outline"
                      size="xl"
                      className="h-12 bg-white border border-custom-light-gray rounded-lg"
                    >
                      <SelectInput
                        className="flex-1 text-md placeholder:text-custom-my-placeholder"
                        placeholder="Selecione uma categoria"
                      />
                      <SelectIcon
                        className="mr-3"
                        size="sm"
                        as={ChevronDownIcon}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <Heading className="text-md my-4">Vendedores</Heading>
                        <Divider />
                        {accounts.map((user) => (
                          <SelectItem
                            key={user.id}
                            label={user.name}
                            value={user.id}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              {form.formState.errors.customer && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.customer?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Quantidade</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="quantity"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value?.toString()}
                      placeholder="Quantidade"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.quantity && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.quantity?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Status</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="status"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    selectedValue={
                      value === 'pending'
                        ? 'Pendente'
                        : value === 'completed'
                        ? 'Concluído'
                        : 'Cancelado'
                    }
                  >
                    <SelectTrigger
                      variant="outline"
                      size="xl"
                      className="h-12 bg-white border border-custom-light-gray rounded-lg"
                    >
                      <SelectInput
                        className="flex-1 text-md placeholder:text-custom-my-placeholder"
                        placeholder="Selecione uma categoria"
                      />
                      <SelectIcon
                        className="mr-3"
                        size="sm"
                        as={ChevronDownIcon}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <Heading className="text-md my-4">Status</Heading>
                        <Divider />
                        <SelectItem label="Pendente" value="pending" />
                        <SelectItem label="Concluído" value="completed" />
                        <SelectItem label="Cancelado" value="cancelled" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              {form.formState.errors.status && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.status?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Valor total</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="totalPrice"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <MaskInput
                      value={value!}
                      placeholder="R$ 0,00"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{
                        flex: 1,
                        height: '100%',
                        textAlign: 'center',
                        fontSize: 16,
                      }}
                      mask={Masks.BRL_CURRENCY}
                    />
                  </Input>
                )}
              />
              {form.formState.errors.totalPrice && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.totalPrice?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Valor unitário</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="unitPrice"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <MaskInput
                      value={value!}
                      placeholder="R$ 0,00"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{
                        flex: 1,
                        height: '100%',
                        textAlign: 'center',
                        fontSize: 16,
                      }}
                      mask={Masks.BRL_CURRENCY}
                    />
                  </Input>
                )}
              />
              {form.formState.errors.unitPrice && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.unitPrice?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              action="positive"
              onPress={form.handleSubmit(handleUpdateSale)}
              isDisabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Spinner className="text-white" />
              )}
              <ButtonText>Atualizar produto</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
