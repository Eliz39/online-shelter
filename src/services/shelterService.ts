import { supabase } from '../lib/supabaseClient'
import type { ShelterType } from '../types/ShelterType'

export const getShelterById = async (
    shelterId: string
): Promise<ShelterType | null> => {
    const { data, error } = await supabase
        .from('shelters')
        .select('*')
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
        .select('*')
        .order('name')

    if (error) {
        console.error('Error fetching shelters:', error)
        throw error
    }

    return data || []
}

export const createShelter = async (shelterData: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip_code: string
    description?: string
}): Promise<ShelterType> => {
    const { data, error } = await supabase
        .from('shelters')
        .insert([shelterData])
        .select()
        .single()

    if (error) {
        console.error('Error creating shelter:', error)
        throw error
    }

    return data
}
