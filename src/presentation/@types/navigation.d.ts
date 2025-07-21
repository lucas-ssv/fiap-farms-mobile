export type StackParamList = {
  Login: undefined
  SignUp: undefined
}

export type DrawerParamList = {
  Dashboard: undefined
  Products: undefined
  Categories: undefined
  Sales: undefined
  Customers: undefined
  Goals: undefined
}

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends StackParamList, DrawerParamList {}
  }
}
