import { ProductModel } from '@/domain/models/product'
import { LoadCategories } from '@/domain/usecases/category'
import { RemoveProduct, UpdateProduct } from '@/domain/usecases/product'
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
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import MaskInput, { Masks } from 'react-native-mask-input'
import z from 'zod/v4'

const schema = z.object({
  name: z.string().optional(),
  categoryId: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  stock: z
    .number()
    .int()
    .min(0, 'O estoque deve ser um número positivo')
    .optional(),
  minStock: z
    .number()
    .int()
    .min(0, 'O estoque mínimo deve ser um número positivo')
    .optional(),
  maxStock: z
    .number()
    .int()
    .min(0, 'O estoque máximo deve ser um número positivo')
    .optional(),
  price: z.string().optional(),
  cost: z.string().optional(),
  description: z.string().optional(),
  unit: z.string().optional(),
  image: z.file().optional().or(z.url('A imagem deve ser uma URL válida')),
})

type UpdateProductFormData = z.infer<typeof schema>

type Props = {
  item: ProductModel
  categories: LoadCategories.Result
  updateProduct: UpdateProduct
}

export function ProductModal({ item, categories, updateProduct }: Props) {
  const toast = useToast()
  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item.name,
      categoryId: {
        label: item.category.name,
        value: item.category.id,
      },
      stock: item.stock,
      minStock: item.minStock,
      maxStock: item.maxStock,
      price: String(item.price),
      cost: String(item.cost),
      description: item.description,
      unit: item.unit,
      image: item?.image,
    },
  })
  const [showModal, setShowModal] = useState(false)

  const handleUpdateProduct = async (data: UpdateProductFormData) => {
    try {
      await updateProduct.execute(item.id, {
        ...data,
        categoryId: data.categoryId?.value,
        cost: Number(data.cost),
        price: Number(data.price),
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
              {item.name}
            </Heading>
          </ModalHeader>
          <ModalBody
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
          >
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Nome do produto</FormControlLabelText>
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
                      placeholder="Nome do produto"
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
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Unidade de medida</FormControlLabelText>
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
                        <Heading className="text-md my-4">
                          Unidade de medida
                        </Heading>
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
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Categoria</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="categoryId"
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
                        <Heading className="text-md my-4">Categoria</Heading>
                        <Divider />
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            label={category.name}
                            value={category.id}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              {form.formState.errors.categoryId && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.categoryId?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>
                  Preço de venda (unidade)
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="price"
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
              {form.formState.errors.price && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.price?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>
                  Custo de produção (total)
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="cost"
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
              {form.formState.errors.cost && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.cost?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Estoque atual</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="stock"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value?.toString()}
                      placeholder="Estoque atual"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.stock && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.stock?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Estoque mínimo</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="minStock"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value?.toString()}
                      placeholder="Estoque mínimo"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.minStock && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.minStock?.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl className="mt-2">
              <FormControlLabel>
                <FormControlLabelText>Estoque máximo</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="maxStock"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value?.toString()}
                      placeholder="Estoque máximo"
                    />
                  </Input>
                )}
              />
              {form.formState.errors.maxStock && (
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.maxStock?.message}
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
                      placeholder="Descrição do produto"
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
              onPress={form.handleSubmit(handleUpdateProduct)}
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
