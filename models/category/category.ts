export interface Category {
  id: number,
  name: string,
  slug: string,
  thumbnail: string,
  deletedAt?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
}