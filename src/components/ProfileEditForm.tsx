import { useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type ProfileEditFormInputs,
  profileEditSchema,
} from '../schemas/profileSchema'
import type { ProfileEditFormProps } from '../types/profile'

export const ProfileEditForm = ({
  open,
  initialData,
  onClose,
  onSave,
}: ProfileEditFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileEditFormInputs>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      username: initialData.username,
      userEmail: initialData.userEmail,
      phoneNumber: initialData.phoneNumber || '',
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        username: initialData.username,
        userEmail: initialData.userEmail,
        phoneNumber: initialData.phoneNumber || '',
      })
    }
  }, [open, initialData, reset])

  const onSubmit = async (data: ProfileEditFormInputs) => {
    try {
      await onSave({
        username: data.username,
        userEmail: data.userEmail,
        phoneNumber: data.phoneNumber || '',
      })
      onClose()
    } catch (error) {
      console.error('Failed to save profile:', error)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div">
          Edit Profile
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: theme => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  variant="outlined"
                  required
                />
              )}
            />

            <Controller
              name="userEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.userEmail}
                  helperText={errors.userEmail?.message}
                  variant="outlined"
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  variant="outlined"
                  placeholder="+420 111 111 111"
                />
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} color="inherit" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ minWidth: 100 }}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
