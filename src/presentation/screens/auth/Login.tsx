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
  VStack,
} from '@/presentation/components/ui'
import LoginBg from '@/presentation/assets/login-bg.jpg'
import Logo from '@/presentation/assets/logo.svg'

export function Login() {
  return (
    <VStack className="h-screen justify-center">
      <Image className="absolute h-screen w-screen" source={LoginBg} alt="" />
      <Box className="w-full flex justify-center items-center absolute top-24">
        <Logo />
      </Box>
      <VStack className="flex bg-white justify-center px-4 py-10 rounded-lg mx-4">
        <Heading className="text-center text-custom-black">
          Faça seu login
        </Heading>
        <Text className="text-center text-custom-gray mt-2">
          Acesse sua conta e acompanhe os resultados do seu negócio
        </Text>

        <FormControl className="mt-6">
          <Input className="h-12 bg-white rounded-lg border border-custom-light-gray">
            <InputField placeholder="E-mail" />
          </Input>
          <FormControlError>
            <FormControlErrorIcon />
            <FormControlErrorText />
          </FormControlError>

          <Input className="h-12 bg-white rounded-lg border border-custom-light-gray mt-4">
            <InputField type="password" placeholder="Senha" />
          </Input>
          <FormControlError>
            <FormControlErrorIcon />
            <FormControlErrorText />
          </FormControlError>

          <Link className="mt-2">
            <LinkText className="text-custom-gray no-underline">
              Esqueceu a senha?
            </LinkText>
          </Link>
        </FormControl>

        <Button action="positive" className="h-12 rounded-lg mt-4">
          <ButtonText>Acessar</ButtonText>
        </Button>
        <Link className="text-center flex justify-center mt-6 items-center">
          <LinkText className="text-custom-gray font-medium no-underline">
            Criar conta
          </LinkText>
        </Link>
      </VStack>
    </VStack>
  )
}
