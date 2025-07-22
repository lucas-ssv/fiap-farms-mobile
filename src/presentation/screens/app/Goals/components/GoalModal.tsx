import { GoalModel } from '@/domain/models/goal'
import { ProductModel } from '@/domain/models/product'
import { LoadCategories } from '@/domain/usecases/category'
import { UpdateGoal } from '@/domain/usecases/goal'
import {
  LoadProducts,
  RemoveProduct,
  UpdateProduct,
} from '@/domain/usecases/product'
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

const schema = z
  .object({
    product: z
      .object({
        label: z.string().min(2).max(100),
        value: z.string(),
      })
      .optional(),
    description: z.string().optional(),
    type: z.enum(['sales', 'production']).optional(),
    status: z.enum(['in_progress', 'done', 'active', 'inactive']).optional(),
    targetValue: z.string().optional(),
    currentValue: z.string().optional(),
    startDate: z
      .date()
      .optional()
      .refine((date) => date && date <= new Date(), {
        message: 'A data de início deve ser anterior ou igual à data atual',
      }),
    deadline: z
      .date()
      .optional()
      .refine((date) => date && date > new Date(), {
        message: 'A data final deve ser posterior à data de início',
      }),
  })
  .refine(
    (data) =>
      data.targetValue &&
      data.currentValue &&
      data.targetValue >= data.currentValue,
    {
      path: ['currentValue'],
      message: 'O valor alvo deve ser maior ao valor atual',
    }
  )

type UpdateGoalFormData = z.infer<typeof schema>

type Props = {
  item: GoalModel
  loadProducts: LoadProducts
  updateGoal: UpdateGoal
}

export function GoalModal({ item, loadProducts, updateGoal }: Props) {
  const toast = useToast()
  const form = useForm<UpdateGoalFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      product: {
        label: item.product?.name || '',
        value: item.product?.id || '',
      },
      description: item.description,
      type: item.type,
      status: item.status,
      targetValue: String(item.targetValue),
      currentValue: String(item.currentValue),
      startDate: (item.startDate as any).toDate(),
      deadline: (item.deadline as any).toDate(),
    },
  })
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState<ProductModel[]>([])

  const handleUpdateGoal = async (data: UpdateGoalFormData) => {
    try {
      await updateGoal.execute(item.id, {
        ...data,
        productId: data.product?.value,
        targetValue: Number(data.targetValue),
        currentValue: Number(data.currentValue),
      })
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="solid">
              <ToastTitle>Meta atualizada com sucesso</ToastTitle>
              <ToastDescription>
                A meta foi atualizada com sucesso.
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
              <ToastTitle>Erro ao atualizar meta</ToastTitle>
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
                <FormControlLabelText>Descrição</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Descrição da meta"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.description && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.description?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Valor alvo</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="targetValue"
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
              {form.formState.errors.targetValue && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.targetValue?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Valor alvo</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="currentValue"
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
              {form.formState.errors.currentValue && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.currentValue?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Tipo de meta</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="type"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    selectedValue={
                      value === 'production' ? 'Produção' : 'Vendas'
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
                        <Heading className="text-md my-4">Tipo de meta</Heading>
                        <Divider />
                        <SelectItem label="Produção" value="production" />
                        <SelectItem label="Vendas" value="sales" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              {form.formState.errors.type && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.type?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Status da meta</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="status"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    selectedValue={
                      value === 'active'
                        ? 'Ativa'
                        : value === 'done'
                        ? 'Concluída'
                        : value === 'in_progress'
                        ? 'Em progresso'
                        : 'Inativa'
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
                        <Heading className="text-md my-4">
                          Status da meta
                        </Heading>
                        <Divider />
                        <SelectItem label="Ativa" value="active" />
                        <SelectItem label="Concluída" value="done" />
                        <SelectItem label="Em progresso" value="in_progress" />
                        <SelectItem label="Inativa" value="inactive" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              {form.formState.errors.type && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.type?.message}
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
              onPress={form.handleSubmit(handleUpdateGoal)}
              isDisabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Spinner className="text-white" />
              )}
              <ButtonText>Atualizar meta</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
