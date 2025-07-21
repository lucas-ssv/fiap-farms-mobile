import { UserModel } from '@/domain/models/account'
import { CustomerModel } from '@/domain/models/customer'
import { ProductModel } from '@/domain/models/product'
import { SaleModel } from '@/domain/models/sale'
import { LoadAccounts } from '@/domain/usecases/account'
import { LoadCategories } from '@/domain/usecases/category'
import {
  LoadCustomers,
  RemoveCustomer,
  UpdateCustomer,
} from '@/domain/usecases/customer'
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
  name: z.string(),
  email: z.email(),
  phone: z.string().optional(),
  postalCode: z.string(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  address: z.string(),
  addressNumber: z.number(),
  addressComplement: z.string().optional(),
})

type UpdateCustomerFormData = z.infer<typeof schema>

type Props = {
  item: CustomerModel
  updateCustomer: UpdateCustomer
  removeCustomer: RemoveCustomer
}

export function CustomerModal({ item, updateCustomer, removeCustomer }: Props) {
  const toast = useToast()
  const form = useForm<UpdateCustomerFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item.name,
      email: item.email,
      phone: item.phone,
      postalCode: item.postalCode,
      city: item.city,
      state: item.state,
      neighborhood: item.neighborhood,
      address: item.address,
      addressNumber: item.addressNumber,
      addressComplement: item.addressComplement,
    },
  })
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState<ProductModel[]>([])
  const [customers, setCustomers] = useState<CustomerModel[]>([])
  const [accounts, setAccounts] = useState<
    Omit<UserModel, 'userUID' | 'password'>[]
  >([])

  const handleUpdateCustomer = async (data: UpdateCustomerFormData) => {
    try {
      await updateCustomer.execute(item.id, data)
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="solid">
              <ToastTitle>Cliente atualizado com sucesso</ToastTitle>
              <ToastDescription>
                O cliente foi atualizado com sucesso.
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
              <ToastTitle>Erro ao atualizar cliente</ToastTitle>
              <ToastDescription>
                Verifique suas credenciais e tente novamente.
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }

  return (
    <>
      <Button action="positive" onPress={() => setShowModal(true)}>
        <ButtonText>Atualizar cliente</ButtonText>
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
              {item.name}
            </Heading>
          </ModalHeader>
          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Nome do cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Nome do cliente"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.name && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.name?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Email do cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Email do cliente"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.email && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.email?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Telefone do cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <MaskInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      mask={Masks.BRL_PHONE}
                      placeholder="Telefone do cliente"
                    />
                  </Input>
                )}
              />
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>CEP do cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="postalCode"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <MaskInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="CEP do cliente"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.postalCode && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.postalCode?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Cidade do cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="city"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Cidade do cliente"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.city && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.city?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Estado do cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="state"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Estado do cliente"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.state && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.state?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Bairro do cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="neighborhood"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Bairro do cliente"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.neighborhood && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.neighborhood?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Rua do cliente</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="address"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Rua do cliente"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.address && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.address?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Número do endereço</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="addressNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value?.toString()}
                      placeholder="Número do endereço"
                      keyboardType="numeric"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.addressNumber && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.addressNumber?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>
                  Complemento do endereço
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="addressComplement"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Complemento do endereço"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.addressComplement && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.addressComplement?.message}
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
              onPress={form.handleSubmit(handleUpdateCustomer)}
              isDisabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Spinner className="text-white" />
              )}
              <ButtonText>Atualizar cliente</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
