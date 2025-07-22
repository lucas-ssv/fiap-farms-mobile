export interface CustomerModel {
  id: string
  name: string
  email: string
  phone?: string
  postalCode: string
  address: string
  addressNumber: number
  addressComplement?: string
  neighborhood: string
  city: string
  state: string
  createdAt: Date
  updatedAt: Date
}
