import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'

type BackButtonProps = {
  text: string
  handleBackClick: () => void
}

export const BackButton = ({ text, handleBackClick }: BackButtonProps) => {
  return (
    <Button
      startIcon={<ArrowBack />}
      onClick={handleBackClick}
      sx={{ mb: 3, fontWeight: 500 }}
    >
      {text}
    </Button>
  )
}
