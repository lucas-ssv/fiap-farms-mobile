import {
  Box,
  Button,
  ButtonText,
  Divider,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Heading,
  Image,
  Input,
  InputField,
  Link,
  LinkText,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from '@/presentation/components/ui'
import SignUpBg from '@/presentation/assets/signup-bg.jpg'
import Logo from '@/presentation/assets/logo.svg'
import z from 'zod/v4'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddAccount } from '@/domain/usecases/account'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'

type SignUpFormData = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

const schema = z
  .object({
    name: z
      .string('Nome é obrigatório')
      .min(1, 'O nome precisa ter pelo menos 1 caractere'),
    username: z
      .string('Nome de usuário é obrigatório')
      .min(1, 'O nome de usuário precisa ter pelo menos 1 caractere'),
    email: z.email('O e-mail é obrigatório'),
    password: z
      .string('A senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string('A confirmação de senha é obrigatória')
      .min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })

type Props = {
  addAccount: AddAccount
}

export function SignUp({ addAccount }: Props) {
  const toast = useToast()
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const navigate = useNavigation()

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { name, username, email, password } = data
      await addAccount.execute({
        name,
        username,
        email,
        password,
      })
    } catch (error) {
      toast.show({
        placement: 'top',
        render({ id }) {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action="error" variant="solid">
              <ToastTitle>Erro ao criar conta</ToastTitle>
              <ToastDescription>
                Erro ao criar conta. Verifique os dados e tente novamente.
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }

  return (
    <VStack className="h-screen justify-center">
      <Image className="absolute h-screen w-screen" source={SignUpBg} alt="" />
      <Box className="w-full flex justify-center items-center my-10">
        <Logo />
      </Box>
      <ScrollView className="mx-4 my-10" showsVerticalScrollIndicator={false}>
        <VStack className="flex bg-white justify-center px-4 py-10 rounded-lg">
          <Heading className="text-center text-custom-black">
            Crie sua conta
          </Heading>
          <Text className="text-center text-custom-gray mt-2">
            Crie sua conta e acompanhe seus resultados com precisão
          </Text>

          <FormControl
            className="mt-6"
            isInvalid={!!form.formState.errors.name}
          >
            <Controller
              control={form.control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                  <InputField
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Nome completo"
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

          <FormControl
            className="mt-6"
            isInvalid={!!form.formState.errors.username}
          >
            <Controller
              control={form.control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                  <InputField
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Nome de usuário"
                  />
                </Input>
              )}
            />
            {form.formState.errors.username && (
              <FormControlError>
                <FormControlErrorText>
                  {form.formState.errors.username?.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl
            className="mt-6"
            isInvalid={!!form.formState.errors.email}
          >
            <Controller
              control={form.control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                  <InputField
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="E-mail"
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

          <FormControl
            className="mt-4"
            isInvalid={!!form.formState.errors.password}
          >
            <Controller
              control={form.control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                  <InputField
                    type="password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Senha"
                  />
                </Input>
              )}
            />
            {form.formState.errors.password && (
              <FormControlError>
                <FormControlErrorText>
                  {form.formState.errors.password?.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl
            className="mt-4"
            isInvalid={!!form.formState.errors.confirmPassword}
          >
            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
                  <InputField
                    type="password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Repita a senha"
                  />
                </Input>
              )}
            />
            {form.formState.errors.confirmPassword && (
              <FormControlError>
                <FormControlErrorText>
                  {form.formState.errors.confirmPassword?.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <Button
            action="positive"
            className="h-12 rounded-lg mt-4"
            onPress={form.handleSubmit(onSubmit)}
          >
            <ButtonText>Criar conta</ButtonText>
          </Button>
          <Divider className="mt-4" />
          <Text className="text-custom-gray text-center mt-4">
            Clicando em Criar conta, você concorda com nossos Termos de Serviço
            e Política de Privacidade.
          </Text>
          <Button
            variant="link"
            className="mt-4"
            onPress={() => navigate.goBack()}
          >
            <ButtonText className="text-custom-gray font-medium no-underline">
              Criar conta
            </ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
