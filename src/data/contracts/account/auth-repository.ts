export interface AuthRepository<T = any> {
  onAuthStateChanged: (callback: T) => () => void
}
