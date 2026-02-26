import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    FormHelperText,
    Divider,
} from '@mui/material'
import { Add, Upload, Link as LinkIcon } from '@mui/icons-material'
import {
    type AddAnimalFormInputs,
    addAnimalSchema,
} from '../../schemas/addAnimalSchema'
import { useCreateAnimal } from '../../hooks/useAnimals'
import { InfoToast } from '../InfoToast'

type AddAnimalSectionProps = {
    shelterId: string
}

export const AddAnimalSection = ({ shelterId }: AddAnimalSectionProps) => {
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { mutate: createAnimal, isPending } = useCreateAnimal()

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<AddAnimalFormInputs>({
        defaultValues: {
            name: '',
            species: undefined,
            age: 0,
            gender: undefined,
            size: undefined,
            color: '',
            description: '',
            imageUploadType: 'url',
            imageFile: undefined,
            imageUrl: '',
        },
        resolver: zodResolver(addAnimalSchema) as any,
    })

    const imageUploadType = watch('imageUploadType')

    const onSubmit = (data: AddAnimalFormInputs) => {
        createAnimal(
            {
                animalData: {
                    name: data.name,
                    species: data.species,
                    age: data.age,
                    gender: data.gender,
                    size: data.size,
                    color: data.color,
                    description: data.description,
                    shelter_id: shelterId,
                },
                imageFile: data.imageFile,
                imageUrl: data.imageUrl,
            },
            {
                onSuccess: () => {
                    setSuccessMessage('Animal added successfully!')
                    reset()
                },
                onError: (error) => {
                    console.error('Error creating animal:', error)
                    setErrorMessage(error.message || 'Failed to add animal. Please try again.')
                },
            }
        )
    }

    return (
        <Paper
            elevation={1}
            sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Add New Animal
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 2.5,
                    }}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                fullWidth
                                required
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                disabled={isPending}
                            />
                        )}
                    />

                    <Controller
                        name="species"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Species"
                                fullWidth
                                required
                                error={!!errors.species}
                                helperText={errors.species?.message}
                                disabled={isPending}
                            >
                                <MenuItem value="dog">Dog</MenuItem>
                                <MenuItem value="cat">Cat</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        )}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 2.5,
                    }}
                >
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Age (years)"
                                type="number"
                                fullWidth
                                required
                                error={!!errors.age}
                                helperText={errors.age?.message}
                                disabled={isPending}
                                inputProps={{ min: 0, max: 30 }}
                            />
                        )}
                    />

                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Gender"
                                fullWidth
                                required
                                error={!!errors.gender}
                                helperText={errors.gender?.message}
                                disabled={isPending}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Unknown">Unknown</MenuItem>
                            </TextField>
                        )}
                    />

                    <Controller
                        name="size"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Size"
                                fullWidth
                                required
                                error={!!errors.size}
                                helperText={errors.size?.message}
                                disabled={isPending}
                            >
                                <MenuItem value="Small">Small</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Large">Large</MenuItem>
                            </TextField>
                        )}
                    />
                </Box>

                <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Color"
                            fullWidth
                            required
                            error={!!errors.color}
                            helperText={errors.color?.message}
                            disabled={isPending}
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            disabled={isPending}
                            placeholder="Describe the animal's personality, behavior, and any special needs..."
                        />
                    )}
                />

                <FormControl component="fieldset" error={!!errors.imageFile}>
                    <FormLabel component="legend">Image</FormLabel>
                    <Controller
                        name="imageUploadType"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                <FormControlLabel
                                    value="url"
                                    control={<Radio />}
                                    label="Image URL"
                                    disabled={isPending}
                                />
                                <FormControlLabel
                                    value="upload"
                                    control={<Radio />}
                                    label="Upload Image"
                                    disabled={isPending}
                                />
                            </RadioGroup>
                        )}
                    />

                    {imageUploadType === 'url' && (
                        <Controller
                            name="imageUrl"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Image URL"
                                    fullWidth
                                    required
                                    error={!!errors.imageUrl}
                                    helperText={errors.imageUrl?.message}
                                    disabled={isPending}
                                    placeholder="https://example.com/image.jpg"
                                    sx={{ mt: 2 }}
                                    slotProps={{
                                        input: {
                                            startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                        }
                                    }}
                                />
                            )}
                        />
                    )}

                    {imageUploadType === 'upload' && (
                        <Controller
                            name="imageFile"
                            control={control}
                            render={({ field: { onChange, value, ...field } }) => (
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<Upload />}
                                    sx={{ mt: 2, justifyContent: 'flex-start' }}
                                    disabled={isPending}
                                >
                                    {value ? value.name : 'Choose Image File'}
                                    <input
                                        {...field}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                onChange(file)
                                            }
                                        }}
                                    />
                                </Button>
                            )}
                        />
                    )}

                    {errors.imageFile && (
                        <FormHelperText>{String(errors.imageFile.message || 'Please provide an image')}</FormHelperText>
                    )}
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Add />}
                        disabled={isPending}
                        sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                    >
                        {isPending ? 'Adding...' : 'Add Animal'}
                    </Button>
                </Box>
            </Box>

            <InfoToast
                isOpen={Boolean(successMessage)}
                close={() => setSuccessMessage('')}
                severity="success"
                text={successMessage}
            />

            <InfoToast
                isOpen={Boolean(errorMessage)}
                close={() => setErrorMessage('')}
                severity="error"
                text={errorMessage}
            />
        </Paper>
    )
}
