import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
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
import LoginBg from '@/presentation/assets/login-bg.jpg'
import Logo from '@/presentation/assets/logo.svg'
import z from 'zod/v4'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Authentication } from '@/domain/usecases/account'
import { useNavigation } from '@react-navigation/native'

type LoginFormData = {
  email: string
  password: string
}

const schema = z.object({
  email: z.email('O e-mail é obrigatório'),
  password: z
    .string('A senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type Props = {
  authentication: Authentication
}

export function Login({ authentication }: Props) {
  const toast = useToast()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigation()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { email, password } = data
      await authentication.execute({
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
              <ToastTitle>Erro ao fazer login</ToastTitle>
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
    <VStack className="h-screen justify-center">
      <Image className="absolute h-screen w-screen" source={LoginBg} alt="" />
      <Box className="w-full flex justify-center items-center mb-10">
        <Logo />
      </Box>
      <VStack className="flex bg-white justify-center px-4 py-10 rounded-lg mx-4">
        <Heading className="text-center text-custom-black">
          Faça seu login
        </Heading>
        <Text className="text-center text-custom-gray mt-2">
          Acesse sua conta e acompanhe os resultados do seu negócio
        </Text>

        <FormControl className="mt-6" isInvalid={!!form.formState.errors.email}>
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

        <Link className="mt-2">
          <LinkText className="text-custom-gray no-underline">
            Esqueceu a senha?
          </LinkText>
        </Link>

        <Button
          action="positive"
          className="h-12 rounded-lg mt-4"
          onPress={form.handleSubmit(onSubmit)}
        >
          <ButtonText>Acessar</ButtonText>
        </Button>
        <Button
          variant="link"
          className="mt-4"
          onPress={() => navigate.navigate('SignUp')}
        >
          <ButtonText className="text-custom-gray font-medium no-underline">
            Criar conta
          </ButtonText>
        </Button>
      </VStack>
    </VStack>
  )
}
