import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'
import type { PetType } from '../types/PetType'

type FavoritePetAvatarProps = {
    pet: PetType
    onRemove?: (petId: string) => void
    size?: number
}

export const FavoritePetAvatar = ({
    pet,
    onRemove,
    size = 80,
}: FavoritePetAvatarProps) => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <Tooltip title={`${pet.name} - ${pet.species}`} arrow>
                    <Link to="/pets/$petId" params={{ petId: pet.id }}>
                        <Avatar
                            src={pet.image_url}
                            alt={pet.name}
                            sx={{
                                width: size,
                                height: size,
                                border: '3px solid',
                                borderColor: 'primary.main',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 4,
                                },
                            }}
                        />
                    </Link>
                </Tooltip>
                {onRemove && (
                    <IconButton
                        size="small"
                        onClick={() => onRemove(pet.id)}
                        sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            bgcolor: 'error.main',
                            color: 'white',
                            width: 24,
                            height: 24,
                            '&:hover': {
                                bgcolor: 'error.dark',
                            },
                        }}
                    >
                        <Close sx={{ fontSize: 16 }} />
                    </IconButton>
                )}
            </Box>
            <Typography
                variant="caption"
                sx={{
                    fontWeight: 600,
                    textAlign: 'center',
                    maxWidth: size,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {pet.name}
            </Typography>
        </Box>
    )
}
