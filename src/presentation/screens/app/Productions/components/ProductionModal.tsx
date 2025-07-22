import { GoalModel } from '@/domain/models/goal'
import { ProductModel } from '@/domain/models/product'
import { ProductionModel } from '@/domain/models/production'
import { LoadCategories } from '@/domain/usecases/category'
import { UpdateGoal } from '@/domain/usecases/goal'
import {
  LoadProducts,
  RemoveProduct,
  UpdateProduct,
} from '@/domain/usecases/product'
import {
  RemoveProduction,
  UpdateProduction,
} from '@/domain/usecases/production'
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
      label: z.string().min(1, 'Selecione um produto'),
      value: z.string().min(1, 'Selecione um produto'),
    })
    .optional(),
  status: z.enum(['in_production', 'harvested', 'waiting']).optional(),
  quantity: z.number().optional(),
  quantityProduced: z.number().optional(),
  unit: z.string().optional(),
  startDate: z.date().optional(),
  harvestDate: z.date().optional(),
})

type UpdateProductionFormData = z.infer<typeof schema>

type Props = {
  item: ProductionModel
  loadProducts: LoadProducts
  updateProduction: UpdateProduction
}

export function ProductionModal({
  item,
  loadProducts,
  updateProduction,
}: Props) {
  const toast = useToast()
  const form = useForm<UpdateProductionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      product: {
        label: item.product.name,
        value: item.product.id,
      },
      status: item.status,
      quantity: item.quantity,
      quantityProduced: item.quantityProduced,
      unit: item.unit,
      startDate: (item.startDate as any).toDate(),
      harvestDate: (item.harvestDate as any).toDate(),
    },
  })
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState<ProductModel[]>([])

  const handleUpdateProduction = async (data: UpdateProductionFormData) => {
    try {
      await updateProduction.execute(item.id, {
        ...data,
        productId: data.product?.value,
      })
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="solid">
              <ToastTitle>Produção atualizada com sucesso</ToastTitle>
              <ToastDescription>
                A produção foi atualizada com sucesso.
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
              <ToastTitle>Erro ao atualizar produção</ToastTitle>
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
                Não foi possível carregar os produtos. Tente novamente mais
                tarde.
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }, [loadProducts])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <>
      <Button action="positive" onPress={() => setShowModal(true)}>
        <ButtonText>Atualizar produção</ButtonText>
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
                <FormControlLabelText>Produto</FormControlLabelText>
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
                        <Heading className="text-md my-4">Produto</Heading>
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
                <FormControlLabelText>Status</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="status"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    selectedValue={
                      value === 'harvested'
                        ? 'Colhida'
                        : value === 'in_production'
                        ? 'Em Produção'
                        : 'Aguardando'
                    }
                  >
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
                        <Heading className="text-md my-4">Produto</Heading>
                        <Divider />
                        <SelectItem label="Colhida" value="harvested" />
                        <SelectItem label="Em Produção" value="in_production" />
                        <SelectItem label="Aguardando" value="waiting" />
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
                <FormControlLabelText>
                  Quantidade produzida
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="quantityProduced"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value?.toString()}
                      placeholder="Quantidade produzida"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.quantityProduced && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.quantityProduced?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>
                  Quantidade a produzir
                </FormControlLabelText>
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
                      placeholder="Quantidade a produzir"
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
                <FormControlLabelText>Unidade</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="unit"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    selectedValue={value === 'unit' ? 'Unidade' : 'kg'}
                  >
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
                        <Heading className="text-md my-4">Unidade</Heading>
                        <Divider />
                        <SelectItem label="Unidade" value="unit" />
                        <SelectItem label="kg" value="kg" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              {form.formState.errors.unit && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.unit?.message}
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
              onPress={form.handleSubmit(handleUpdateProduction)}
              isDisabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Spinner className="text-white" />
              )}
              <ButtonText>Atualizar produção</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
