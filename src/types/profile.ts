export interface Animal {
  id: string
  name: string
}

export interface UserProfile {
  id: string
  username: string
  email: string
  phoneNumber?: string
  favoriteAnimals: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ProfileFormData {
  username: string
  userEmail: string
  phoneNumber: string
}

export interface ProfileHeaderProps {
  username: string
  avatarSrc?: string
}

export interface FavoriteAnimalsSectionProps {
  selectedAnimals: Animal[]
  availableAnimals: Animal[]
  onSelectionChange: (animals: Animal[]) => void
}

export interface ProfileEditFormProps {
  open: boolean
  initialData: ProfileFormData
  onClose: () => void
  onSave: (data: ProfileFormData) => Promise<void>
}
