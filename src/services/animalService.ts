import { supabase } from '../lib/supabaseClient'
import type { PetType } from '../types/PetType'

export const uploadAnimalImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `animals/${fileName}`

    const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (uploadError) {
        console.error('Error uploading image:', uploadError)
        throw uploadError
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath)

    return data.publicUrl
}

export const createAnimal = async (animalData: {
    name: string
    species: string
    age: number
    gender: string
    size: string
    color: string
    description: string
    image_url: string
    shelter_id: string
}): Promise<PetType> => {
    const { data, error } = await supabase
        .from('animals')
        .insert([
            {
                ...animalData,
                status: 'available',
            },
        ])
        .select()
        .single()

    if (error) {
        console.error('Error creating animal:', error)
        throw error
    }

    return data
}
