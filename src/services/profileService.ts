import { supabase } from '../lib/supabaseClient'
import type { ProfileFormData, UserProfile } from '../types/profile'

export interface ProfileServiceError {
  message: string
  code?: string
  details?: any
}

export class ProfileServiceError extends Error {
  code?: string
  details?: any

  constructor(message: string, code?: string, details?: any) {
    super(message)
    this.name = 'ProfileServiceError'
    this.code = code
    this.details = details
  }
}

/**
 * Get user profile data from Supabase
 * @param userId - The user's ID from auth
 * @returns Promise<UserProfile | null>
 */
export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw new ProfileServiceError(
        'Failed to fetch user profile',
        error.code,
        error
      )
    }

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      phoneNumber: data.phone_number,
      favoriteAnimals: data.favorite_animals || [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    }
  } catch (error) {
    if (error instanceof ProfileServiceError) {
      throw error
    }
    throw new ProfileServiceError(
      'Unexpected error while fetching profile',
      'UNKNOWN_ERROR',
      error
    )
  }
}

export const saveUserProfile = async (profileData: ProfileFormData) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new ProfileServiceError(
      'User not authenticated',
      'AUTH_ERROR',
      authError
    )
  }

  const { error } = await supabase.auth.updateUser({
    email: profileData.userEmail,
    data: {
      name: profileData.username,
      phoneNumber: profileData.phoneNumber ?? null,
    },
  })

  if (error) {
    throw new ProfileServiceError(
      'Failed to update auth user',
      error.code,
      error
    )
  }

  return {
    id: user.id,
    username: profileData.username,
    email: profileData.userEmail,
    phoneNumber: profileData.phoneNumber ?? null,
  }
}

/**
 * Update user's favorite animals
 * @param userId - The user's ID from auth
 * @param favoriteAnimalIds - Array of animal IDs
 * @returns Promise<string[]>
 */
export const saveFavoriteAnimals = async (
  userId: string,
  favoriteAnimalId: string
): Promise<string[]> => {
  try {
    const now = new Date().toISOString()

    const { data, error } = await supabase.from('favorite_animals').upsert(
      {
        id: favoriteAnimalId,
        user_id: userId,
        updated_at: now,
      },
      {
        onConflict: 'id',
        ignoreDuplicates: false,
      }
    )

    if (error) {
      throw new ProfileServiceError(
        'Failed to save favorite animals',
        error.code,
        error
      )
    }

    return data || []
  } catch (error) {
    if (error instanceof ProfileServiceError) {
      throw error
    }
    throw new ProfileServiceError(
      'Unexpected error while saving favorite animals',
      'UNKNOWN_ERROR',
      error
    )
  }
}

/**
 * Get user's favorite animals
 * @param userId - The user's ID from auth
 * @returns Promise<string[]>
 */
export const getFavoriteAnimals = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('favorite_animals')
      .select<string>('id')

    if (error) {
      if (error.code === 'PGRST116') {
        return []
      }
      throw new ProfileServiceError(
        'Failed to fetch favorite animals',
        error.code,
        error
      )
    }
    return data || []
  } catch (error) {
    if (error instanceof ProfileServiceError) {
      throw error
    }
    throw new ProfileServiceError(
      'Unexpected error while fetching favorite animals',
      'UNKNOWN_ERROR',
      error
    )
  }
}

/**
 * Initialize user profile on first login
 * @param userId - The user's ID from auth
 * @param email - The user's email
 * @param username - Initial username (from auth metadata or email)
 * @returns Promise<UserProfile>
 */
export const initializeUserProfile = async (
  userId: string,
  email: string,
  username: string
): Promise<UserProfile> => {
  try {
    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        username,
        email,
        phone_number: null,
        favorite_animals: [],
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error) {
      // If profile already exists, fetch it instead
      if (error.code === '23505') {
        // unique_violation
        return (await getUserProfile(userId)) as UserProfile
      }
      throw new ProfileServiceError(
        'Failed to initialize user profile',
        error.code,
        error
      )
    }

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      phoneNumber: data.phone_number,
      favoriteAnimals: data.favorite_animals || [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    }
  } catch (error) {
    if (error instanceof ProfileServiceError) {
      throw error
    }
    throw new ProfileServiceError(
      'Unexpected error while initializing profile',
      'UNKNOWN_ERROR',
      error
    )
  }
}
