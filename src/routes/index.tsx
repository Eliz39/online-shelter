import { createFileRoute } from '@tanstack/react-router'
import { Stack } from '@mui/material'
import { Loading } from '../components/Loading.tsx'
import { supabase } from '../lib/supabaseClient.ts'

export const Route = createFileRoute('/')({
  loader: () => supabase.from('animals').select(),
  component: Index,
  pendingComponent: () => <Loading />,
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
