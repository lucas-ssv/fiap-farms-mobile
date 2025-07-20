export type StackParamList = {
  Login: undefined
  SignUp: undefined
}

// export type DrawerParamList = {
//   StackRoutes: {
//     screen: keyof StackParamList
//   }
// }

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends StackParamList {}
  }
}
