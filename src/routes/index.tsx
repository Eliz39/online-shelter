import { createFileRoute } from '@tanstack/react-router'
import { Stack } from '@mui/material'
import { supabase } from '../lib/supabaseClient.ts'

export const Route = createFileRoute('/')({
  loader: () => supabase.from('animals').select(),
  component: Index,
  pendingComponent: () => <div>Animals Loading...</div>,
  pendingMs: 0,
})

function Index() {
  const data = Route.useLoaderData()
  console.log({ data })
  return (
    <Stack padding={2}>
      <h3>Welcome Home!</h3>
    </Stack>
  )
}
