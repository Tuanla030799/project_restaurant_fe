export interface Profile {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  status: string,
  socketId: number | null,
  verified: boolean,
  verifiedAt: string | null,
  deletedAt: string | null,
  createdAt: string,
  updatedAt: string,
  roles: {
    data : Role[]
  }
}

export interface Role {
  id: number,
  name: string,
  slug: string
}