import { useAuth } from '@/presentation/contexts'
import { AuthRoutes } from './auth'
import { MakeAppRoutes } from '../factories/routes'

export function Routes() {
  const { user } = useAuth()

  return user?.id ? <MakeAppRoutes /> : <AuthRoutes />
}
