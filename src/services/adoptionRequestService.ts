import { supabase } from '../lib/supabaseClient'
import type { AdoptionRequestWithDetails } from '../types/adoptionRequest'

export const getAdoptionRequestsByEmail = async (
    email: string
): Promise<AdoptionRequestWithDetails[]> => {
    const { data, error } = await supabase
        .from('adoption_requests')
        .select(
            `
      *,
      shelters (
        id,
        name,
        city,
        state,
        phone,
        email,
        address,
        zip_code
      )
    `
        )
        .eq('email', email)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching adoption requests:', error)
        throw error
    }

    // Fetch pet details separately
    if (data && data.length > 0) {
        const petIds = [...new Set(data.map((req) => req.pet_id))]
        const { data: pets, error: petsError } = await supabase
            .from('animals')
            .select('id, name, species, image_url')
            .in('id', petIds)

        if (petsError) {
            console.error('Error fetching pets:', petsError)
        } else {
            // Map pets to requests
            const petsMap = new Map(pets?.map((pet) => [pet.id, pet]))
            return data.map((req) => ({
                ...req,
                pets: petsMap.get(req.pet_id) || undefined,
            }))
        }
    }

    return data || []
}

export const getAdoptionRequestsByShelterId = async (
    shelterId: string
): Promise<AdoptionRequestWithDetails[]> => {
    const { data, error } = await supabase
        .from('adoption_requests')
        .select('*')
        .eq('shelter_id', shelterId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching shelter adoption requests:', error)
        throw error
    }

    // Fetch pet details separately
    if (data && data.length > 0) {
        const petIds = [...new Set(data.map((req) => req.pet_id))]
        const { data: pets, error: petsError } = await supabase
            .from('animals')
            .select('id, name, species, image_url')
            .in('id', petIds)

        if (petsError) {
            console.error('Error fetching pets:', petsError)
        } else {
            // Map pets to requests
            const petsMap = new Map(pets?.map((pet) => [pet.id, pet]))
            return data.map((req) => ({
                ...req,
                pets: petsMap.get(req.pet_id) || undefined,
            }))
        }
    }

    return data || []
}

export const updateAdoptionRequestStatus = async (
    requestId: string,
    status: 'pending' | 'approved' | 'rejected',
    shelterComment?: string
): Promise<void> => {
    const updateData: any = { status }
    if (shelterComment !== undefined) {
        updateData.shelter_comment = shelterComment
    }

    const { error } = await supabase
        .from('adoption_requests')
        .update(updateData)
        .eq('id', requestId)

    if (error) {
        console.error('Error updating adoption request:', error)
        throw error
    }
}
