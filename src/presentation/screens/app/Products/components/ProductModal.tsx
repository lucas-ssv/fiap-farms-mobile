import { ProductModel } from '@/domain/models/product'
import { LoadCategories } from '@/domain/usecases/category'
import { RemoveProduct, UpdateProduct } from '@/domain/usecases/product'
import {
  Button,
  ButtonText,
  FormControl,
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
  Text,
} from '@/presentation/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod/v4'

const schema = z.object({
  name: z.string().optional(),
  categoryId: z.string().optional(),
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
  price: z.number().positive('O preço deve ser um valor positivo').optional(),
  cost: z.number().positive('O custo deve ser um valor positivo').optional(),
  description: z.string().optional(),
  unit: z.string().optional(),
  image: z.file().optional().or(z.url('A imagem deve ser uma URL válida')),
})

type UpdateProductFormData = z.infer<typeof schema>

type Props = {
  item: ProductModel
  categories: LoadCategories.Result
  updateProduct: UpdateProduct
  removeProduct: RemoveProduct
}

export function ProductModal({
  item,
  categories,
  removeProduct,
  updateProduct,
}: Props) {
  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item.name,
      categoryId: item.category.id,
      stock: item.stock,
      minStock: item.minStock,
      maxStock: item.maxStock,
      price: item.price,
      cost: item.cost,
      description: item.description,
      unit: item.unit,
      image: item?.image,
    },
  })
  const [showModal, setShowModal] = useState(false)

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
              Invite your team
            </Heading>
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Nome do produto</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField />
              </Input>
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
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>Atualizar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
