import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '../lib/api'

export type Caregiver = {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export const Route = createFileRoute('/users')({
  component: UsersComponent,
})

function UsersComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchApi<{
      users: Caregiver[]
    }>('/caregivers'),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const { users } = data?.data ?? { users: [] }

  console.log({users})

  return (
    <div className="p-2">
      <h3 className="text-lg font-semibold mb-4">Users</h3>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white shadow rounded">
            <h4 className="font-medium">{user.name}</h4>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
