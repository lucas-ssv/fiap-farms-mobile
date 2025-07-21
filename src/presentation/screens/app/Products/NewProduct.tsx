import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as ImagePicker from 'expo-image-picker'

import {
  Text,
  VStack,
  Button,
  ButtonText,
  Input,
  InputField,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@/presentation/components/ui'
import type { AddProduct } from '@/domain/usecases/product'
import type { LoadCategories } from '@/domain/usecases/category'
import type { CategoryModel } from '@/domain/models/category'
import { useAuth } from '@/presentation/contexts'
import MaskInput, { Masks } from 'react-native-mask-input'

type NewProductFormData = z.infer<typeof schema>

const schema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório'),
    unit: z.string().min(1, 'A unidade de medida é obrigatória'),
    categoryId: z.string().min(1, 'A categoria é obrigatória'),
    stock: z
      .number({ message: 'Campo obrigatório' })
      .min(0, 'O estoque não pode ser negativo'),
    minStock: z
      .number({ message: 'Campo obrigatório' })
      .min(0, 'O estoque mínimo não pode ser negativo'),
    maxStock: z
      .number({ message: 'Campo obrigatório' })
      .min(0, 'O estoque máximo não pode ser negativo'),
    description: z.string().optional(),
    price: z
      .string({ message: 'Campo obrigatório' })
      .min(0, 'O preço não pode ser negativo'),
    cost: z
      .string({ message: 'Campo obrigatório' })
      .min(0, 'O custo não pode ser negativo'),
  })
  .refine(
    (data) =>
      !data.minStock || !data.maxStock || data.minStock <= data.maxStock,
    {
      message: 'O estoque mínimo não pode ser maior que o estoque máximo',
      path: ['minStock'],
    }
  )

interface Props {
  addProduct: AddProduct
  loadCategories: LoadCategories
}

interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <VStack className="mb-4">
      <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      {children}
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </VStack>
  )
}

export function NewProduct({ addProduct, loadCategories }: Props) {
  const { user } = useAuth()
  const [categories, setCategories] = useState<CategoryModel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      unit: '',
      categoryId: '',
      description: '',
      stock: 0,
      minStock: 0,
      maxStock: 0,
    },
  })

  const onSubmit = async (data: NewProductFormData) => {
    try {
      setIsLoading(true)

      let imageFile: File | undefined
      if (selectedImage) {
        imageFile = undefined
      }

      await addProduct.execute({
        userId: user!.id,
        ...data,
        image: imageFile,
        price: Number(data.price),
        cost: Number(data.cost),
      })

      Alert.alert('Sucesso', 'Produto adicionado com sucesso!')
      reset()
      setSelectedImage(null)
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao adicionar produto. Tente novamente mais tarde.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = await loadCategories.execute()
      setCategories(categoriesData)
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao carregar categorias. Tente novamente mais tarde.'
      )
    }
  }, [loadCategories])

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar suas fotos.'
        )
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao selecionar imagem.')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View className="p-4">
          <VStack className="space-y-4">
            <FormField label="Nome do produto" error={errors.name?.message}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      placeholder="Digite o nome do produto"
                      value={value}
                      onChangeText={onChange}
                    />
                  </Input>
                )}
              />
            </FormField>

            <View className="flex-1">
              <FormField label="Unidade de medida" error={errors.unit?.message}>
                <Controller
                  control={control}
                  name="unit"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} selectedValue={value}>
                      <SelectTrigger
                        variant="outline"
                        size="xl"
                        className="h-12 bg-white border border-custom-light-gray rounded-lg"
                      >
                        <SelectInput
                          placeholder="Selecione"
                          className="flex-1 text-md placeholder:text-custom-my-placeholder"
                        />
                        <SelectIcon className="mr-3" />
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          <SelectItem label="KG" value="kg" />
                          <SelectItem label="Unidade" value="unit" />
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  )}
                />
              </FormField>
            </View>

            <View className="flex-1">
              <FormField label="Categoria" error={errors.categoryId?.message}>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} selectedValue={value}>
                      <SelectTrigger className="h-12 bg-white border border-custom-light-gray rounded-lg">
                        <SelectInput
                          placeholder="Selecione"
                          className="flex-1 text-md placeholder:text-custom-my-placeholder"
                        />
                        <SelectIcon className="mr-3" />
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
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
              </FormField>
            </View>

            <View className="flex-1">
              <FormField
                label="Preço de venda (unidade)"
                error={errors.price?.message}
              >
                <Controller
                  control={control}
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
              </FormField>
            </View>

            <View className="flex-1">
              <FormField
                label="Custo de produção (total)"
                error={errors.cost?.message}
              >
                <Controller
                  control={control}
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
              </FormField>
            </View>

            <FormField label="Estoque atual" error={errors.stock?.message}>
              <Controller
                control={control}
                name="stock"
                render={({ field: { onChange, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      placeholder="500"
                      value={value.toString()}
                      onChangeText={(text) => onChange(parseInt(text) || 0)}
                      keyboardType="numeric"
                    />
                  </Input>
                )}
              />
            </FormField>

            <View className="flex-1">
              <FormField
                label="Estoque mínimo"
                error={errors.minStock?.message}
              >
                <Controller
                  control={control}
                  name="minStock"
                  render={({ field: { onChange, value } }) => (
                    <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                      <InputField
                        placeholder="100"
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseInt(text) || 0)}
                        keyboardType="numeric"
                      />
                    </Input>
                  )}
                />
              </FormField>
            </View>

            <View className="flex-1">
              <FormField
                label="Estoque máximo"
                error={errors.maxStock?.message}
              >
                <Controller
                  control={control}
                  name="maxStock"
                  render={({ field: { onChange, value } }) => (
                    <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                      <InputField
                        placeholder="1000"
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseInt(text) || 0)}
                        keyboardType="numeric"
                      />
                    </Input>
                  )}
                />
              </FormField>
            </View>

            <FormField label="Descrição" error={errors.description?.message}>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      placeholder="Detalhes sobre o produto"
                      value={value || ''}
                      onChangeText={onChange}
                      multiline
                      numberOfLines={3}
                    />
                  </Input>
                )}
              />
            </FormField>
          </VStack>
        </View>
      </ScrollView>
      <View className="p-4 pb-6 bg-white border-t border-gray-200">
        <Button
          className="h-12 rounded-lg"
          action="positive"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || isLoading}
        >
          <ButtonText>
            {isSubmitting || isLoading ? 'Adicionando...' : 'Adicionar Produto'}
          </ButtonText>
        </Button>
      </View>
    </>
  )
}
