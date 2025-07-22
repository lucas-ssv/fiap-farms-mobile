import type { LoadAccounts } from "@/domain/usecases/account";

export const mockAccountsResult = (): LoadAccounts.Result => [{
  id: 'any_id',
  name: 'any_name',
  email: 'any_user_email@mail.com',
  username: 'any_username',
}]