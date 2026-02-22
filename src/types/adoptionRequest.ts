export type AdoptionRequest = {
    id: string
    full_name: string
    email: string
    phone: string
    address: string
    pet_id: string
    pet_name: string
    shelter_id: string | null
    message: string | null
    shelter_comment: string | null
    status: 'pending' | 'approved' | 'rejected'
    created_at: string
    updated_at: string
}

export type AdoptionRequestWithDetails = AdoptionRequest & {
    pets?: {
        id: string
        name: string
        species: string
        image_url: string
    }
    shelters?: {
        id: string
        name: string
        city: string
        state: string
        phone: string
        email: string
        address: string
        zip_code: string
    }
}
