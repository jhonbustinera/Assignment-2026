
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, SlidersHorizontal } from 'lucide-react'
import { fetchTasks, fetchUsers } from '../lib/api'
import TaskCard from '../components/TaskCard'
import { EmptyState, ErrorState, LoadingState } from '../components/States'

export default function Tasks() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [user, setUser] = useState('all')

  // Stale time: 1 minute
  const STALE_TIME = 1 * 60 * 1000

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: STALE_TIME,
  })

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: STALE_TIME,
  })

  const users = usersQuery.data || []

  const userNames = Object.fromEntries(
    users.map(person => [person.id, person.name])
  )

  const filtered = useMemo(
    () => (tasksQuery.data || []).filter(task => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesStatus =
        status === 'all' ||
        (status === 'done' ? task.completed : !task.completed)

      const matchesUser =
        user === 'all' || String(task.userId) === user

      return matchesSearch && matchesStatus && matchesUser
    }),
    [tasksQuery.data, search, status, user]
  )

  const clearFilters = () => {
    setSearch('')
    setStatus('all')
    setUser('all')
  }

  if (tasksQuery.isPending) return <LoadingState />

  if (tasksQuery.isError) {
    return (
      <ErrorState
        message={tasksQuery.error.message}
        onRetry={() => tasksQuery.refetch()}
      />
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1 className="page-title">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500">
            Keep track of what needs to get done.
          </p>
        </div>

        <div className="rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
          {filtered.length}{' '}
          <span className="font-normal text-brand-600">
            of {tasksQuery.data.length} tasks
          </span>
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl border border-[#e9e1ed] bg-white p-3 shadow-sm sm:grid-cols-[minmax(0,1fr)_170px_170px] sm:p-4">
        <label className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={17}
          />
          <input
            className="field pl-10"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </label>

        <label className="relative">
          <SlidersHorizontal
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={15}
          />
          <select
            className="field pl-9"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="open">Status: Open</option>
            <option value="done">Status: Done</option>
          </select>
        </label>

        <select
          aria-label="Filter by user"
          className="field"
          value={user}
          onChange={e => setUser(e.target.value)}
        >
          <option value="all">User: All</option>
          {users.map(person => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length ? (
        <>
          <p className="text-xs font-medium text-slate-500">
            Showing {filtered.length} matching tasks
          </p>

          <div className="grid gap-2.5">
            {filtered.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                userName={userNames[task.userId]}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState onClear={clearFilters} />
      )}
    </section>
  )
}
