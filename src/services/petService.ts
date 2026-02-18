import { supabase } from '../lib/supabaseClient'
import type { PetType } from '../types/PetType'

export class PetServiceError extends Error {
  public code: string
  public originalError?: any

  constructor(
    message: string,
    code: string,
    originalError?: any
  ) {
    super(message)
    this.name = 'PetServiceError'
    this.code = code
    this.originalError = originalError
  }
}

export const getAllPets = async (): Promise<PetType[]> => {
  try {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error fetching pets:', error)
      throw new PetServiceError(
        'Failed to fetch pets from database',
        error.code || 'FETCH_ERROR',
        error
      )
    }

    if (!data) {
      return []
    }

    return data
  } catch (error) {
    if (error instanceof PetServiceError) {
      throw error
    }
    console.error('Unexpected error fetching pets:', error)
    throw new PetServiceError(
      'Unexpected error while fetching pets',
      'UNKNOWN_ERROR',
      error
    )
  }
}

export const getPetById = async (petId: string): Promise<PetType | null> => {
  try {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('id', petId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      console.error('Supabase error fetching pet:', error)
      throw new PetServiceError(
        'Failed to fetch pet from database',
        error.code || 'FETCH_ERROR',
        error
      )
    }

    if (!data) {
      return null
    }

    return data
  } catch (error) {
    if (error instanceof PetServiceError) {
      throw error
    }
    console.error('Unexpected error fetching pet:', error)
    throw new PetServiceError(
      'Unexpected error while fetching pet',
      'UNKNOWN_ERROR',
      error
    )
  }
}

export const getFilteredPets = async (filters: {
  species?: string
  size?: string
  status?: string
  ageRange?: 'young' | 'adult' | 'senior' | 'All'
}): Promise<PetType[]> => {
  try {
    let query = supabase
      .from('animals')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters.species && filters.species !== 'All') {
      query = query.eq('species', filters.species)
    }

    if (filters.size && filters.size !== 'All') {
      query = query.eq('size', filters.size)
    }

    if (filters.status && filters.status !== 'All') {
      query = query.eq('status', filters.status)
    }

    if (filters.ageRange && filters.ageRange !== 'All') {
      switch (filters.ageRange) {
        case 'young':
          query = query.lte('age', 2)
          break
        case 'adult':
          query = query.gt('age', 2).lte('age', 7)
          break
        case 'senior':
          query = query.gt('age', 7)
          break
      }
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error fetching filtered pets:', error)
      throw new PetServiceError(
        'Failed to fetch filtered pets from database',
        error.code || 'FETCH_ERROR',
        error
      )
    }

    if (!data) {
      return []
    }

    return data
  } catch (error) {
    if (error instanceof PetServiceError) {
      throw error
    }
    console.error('Unexpected error fetching filtered pets:', error)
    throw new PetServiceError(
      'Unexpected error while fetching filtered pets',
      'UNKNOWN_ERROR',
      error
    )
  }
}

/**
 * Get available pets for home page display
 * @param limit - Number of pets to fetch (default: 10)
 * @returns Promise<PetType[]>
 */
export const getAvailablePets = async (limit: number = 10): Promise<PetType[]> => {
  try {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Supabase error fetching available pets:', error)
      throw new PetServiceError(
        'Failed to fetch available pets from database',
        error.code || 'FETCH_ERROR',
        error
      )
    }

    if (!data) {
      return []
    }

    return data
  } catch (error) {
    if (error instanceof PetServiceError) {
      throw error
    }
    console.error('Unexpected error fetching available pets:', error)
    throw new PetServiceError(
      'Unexpected error while fetching available pets',
      'UNKNOWN_ERROR',
      error
    )
  }
}

/**
 * Get multiple pets by their IDs
 * @param petIds - Array of pet IDs to fetch
 * @returns Promise<PetType[]>
 */
export const getPetsByIds = async (petIds: string[]): Promise<PetType[]> => {
  try {
    if (!petIds || petIds.length === 0) {
      return []
    }

    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .in('id', petIds)

    if (error) {
      console.error('Supabase error fetching pets by IDs:', error)
      throw new PetServiceError(
        'Failed to fetch pets by IDs from database',
        error.code || 'FETCH_ERROR',
        error
      )
    }

    if (!data) {
      return []
    }

    const petMap = new Map(data.map(pet => [pet.id, pet]))
    return petIds.map(id => petMap.get(id)).filter((pet): pet is PetType => pet !== undefined)
  } catch (error) {
    if (error instanceof PetServiceError) {
      throw error
    }
    console.error('Unexpected error fetching pets by IDs:', error)
    throw new PetServiceError(
      'Unexpected error while fetching pets by IDs',
      'UNKNOWN_ERROR',
      error
    )
  }
}