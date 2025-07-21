import { CategoryModel } from '@/domain/models/category'
import { LoadCategories, UpdateCategory } from '@/domain/usecases/category'
import {
  Button,
  ButtonIcon,
  ButtonText,
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
  Spinner,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@/presentation/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod/v4'

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.file().optional().or(z.url('A imagem deve ser uma URL válida')),
})

type UpdateCategoryFormData = z.infer<typeof schema>

type Props = {
  item: CategoryModel
  categories: LoadCategories.Result
  updateCategory: UpdateCategory
}

export function CategoryModal({ item, categories, updateCategory }: Props) {
  const toast = useToast()
  const form = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item.name,
      description: item.description,
      image: item?.image,
    },
  })
  const [showModal, setShowModal] = useState(false)

  const handleUpdateCategory = async (data: UpdateCategoryFormData) => {
    try {
      await updateCategory.execute(item.id, data)
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="success" variant="solid">
              <ToastTitle>Categoria atualizada com sucesso</ToastTitle>
              <ToastDescription>
                A categoria foi atualizada com sucesso.
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
              <ToastTitle>Erro ao atualizar categoria</ToastTitle>
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
        <ButtonText>Atualizar categoria</ButtonText>
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
                <FormControlLabelText>Nome da categoria</FormControlLabelText>
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
                      placeholder="Nome da categoria"
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
                      placeholder="Descrição da categoria"
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
              onPress={form.handleSubmit(handleUpdateCategory)}
              isDisabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Spinner className="text-white" />
              )}
              <ButtonText>Atualizar categoria</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
