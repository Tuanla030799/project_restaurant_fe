export interface LoginPayload {
	email: string
	password: string
}

export interface RegisterPayload {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
  status?: string
}