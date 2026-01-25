import type { Animal } from '../types/profile'

export const AVAILABLE_ANIMALS: Animal[] = [
  {
    id: 'cat',
    name: 'Cat',
  },
  {
    id: 'dog',
    name: 'Dog',
  },
  {
    id: 'other',
    name: 'Other',
  },
]

export const getAnimalById = (id: string): Animal | undefined => {
  return AVAILABLE_ANIMALS.find(animal => animal.id === id)
}

export const getAnimalsByIds = (ids: string[]): Animal[] => {
  return ids
    .map(id => getAnimalById(id))
    .filter((animal): animal is Animal => animal !== undefined)
}
