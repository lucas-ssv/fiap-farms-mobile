import React, { useState } from 'react'
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
} from '@/presentation/components/ui'
import type { AddCategory } from '@/domain/usecases/category'

type NewCategoryFormData = z.infer<typeof schema>

const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().optional(),
})

interface Props {
  addCategory: AddCategory
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

export function NewCategory({ addCategory }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewCategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (data: NewCategoryFormData) => {
    try {
      setIsLoading(true)

      // Converter a imagem selecionada para File-like object se necessário
      let imageFile: File | undefined
      if (selectedImage) {
        // Aqui você pode implementar a conversão da imagem para o formato necessário
        // Por enquanto, vamos deixar como undefined para focar na funcionalidade principal
        imageFile = undefined
      }

      await addCategory.execute({
        ...data,
        image: imageFile,
      })

      Alert.alert('Sucesso', 'Categoria adicionada com sucesso!')
      reset()
      setSelectedImage(null)
    } catch (error) {
      Alert.alert(
        'Erro',
        'Erro ao adicionar categoria. Tente novamente mais tarde.'
      )
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View className="p-4">
          <VStack className="space-y-4">
            <FormField label="Nome da categoria" error={errors.name?.message}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      placeholder="Digite o nome da categoria"
                      value={value}
                      onChangeText={onChange}
                    />
                  </Input>
                )}
              />
            </FormField>

            <FormField label="Descrição" error={errors.description?.message}>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                    <InputField
                      placeholder="Detalhes sobre a categoria"
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
            {isSubmitting || isLoading
              ? 'Adicionando...'
              : 'Adicionar Categoria'}
          </ButtonText>
        </Button>
      </View>
    </>
  )
}
