import { Alert, Snackbar } from '@mui/material'

type InfoToastProps = {
  isOpen: boolean
  close: () => void
  severity: 'success' | 'warning' | 'error' | 'info'
  text: string
}
export const InfoToast = ({
  isOpen,
  close,
  severity,
  text,
}: InfoToastProps) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={close}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={close} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  )
}
