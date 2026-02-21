import { supabase } from '../lib/supabaseClient'
import type { ShelterType } from '../types/ShelterType'

export const getShelterById = async (shelterId: string): Promise<ShelterType | null> => {
    const { data, error } = await supabase
        .from('shelters')
        .select('id, name, email, phone, address, city, state, zip_code, description, logo_url, created_at, updated_at')
        .eq('id', shelterId)
        .single()

    if (error) {
        console.error('Error fetching shelter:', error)
        throw error
    }

    return data
}

export const getAllShelters = async (): Promise<ShelterType[]> => {
    const { data, error } = await supabase
        .from('shelters')
        .select('id, name, email, phone, address, city, state, zip_code, description, logo_url, created_at, updated_at')
        .order('name')

    if (error) {
        console.error('Error fetching shelters:', error)
        throw error
    }

    return data || []
}