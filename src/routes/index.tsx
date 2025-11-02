import { createFileRoute } from '@tanstack/react-router'
import { Stack } from '@mui/material'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Stack padding={2}>
      <h3>Welcome Home!</h3>
    </Stack>
  )
}
