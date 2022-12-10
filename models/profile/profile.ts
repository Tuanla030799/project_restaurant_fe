export interface Profile {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  status: string,
  phone: string,
  username: string,
  socketId: number | null,
  verified: boolean,
  verifiedAt: string | null,
  deletedAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  roles: {
    data : Role[]
  },
  avatar?: string
}

export interface Role {
  id: number,
  name: string,
  slug: string
}