import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Circle, UserRound } from 'lucide-react'
import { fetchTask, fetchUsers } from '../lib/api'
import { ErrorState, LoadingState } from '../components/States'

export default function TaskDetails() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const taskQuery = useQuery({ queryKey: ['task', id], queryFn: () => fetchTask(id), enabled: /^\d+$/.test(id) })
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const task = taskQuery.data
  const user = usersQuery.data?.find(person => person.id === task?.userId)
  const toggleMutation = useMutation({
    mutationFn: async (completed) => ({ ...task, completed }),
    onSuccess: updated => {
      queryClient.setQueryData(['task', id], updated)
      queryClient.setQueryData(['tasks'], old => old?.map(item => item.id === updated.id ? updated : item))
    },
  })
  if (!/^\d+$/.test(id)) return <ErrorState message="That task ID is not valid." />
  if (taskQuery.isPending) return <LoadingState label="Loading task details..." />
  if (taskQuery.isError || !task?.id) return <ErrorState message={taskQuery.error?.message || 'Task not found.'} onRetry={() => taskQuery.refetch()} />
  return <section className="mx-auto max-w-3xl space-y-5">
    <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-500"><ArrowLeft size={16}/> Back to tasks</Link>
    <article className="rounded-2xl border border-[#e9e1ed] bg-white p-5 shadow-soft sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-3"><span className="eyebrow">TASK DETAILS</span><span className={`rounded-md px-3 py-1 text-xs font-bold ${task.completed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>{task.completed ? 'Done' : 'Open'}</span></div>
      <h1 className="text-2xl font-extrabold leading-tight text-slate-800 sm:text-3xl">{task.title}</h1>
      <div className="my-7 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Assigned to</p><p className="mt-2 flex items-center gap-2 font-semibold text-slate-700"><UserRound size={17} className="text-brand-600"/>{user?.name || `User ${task.userId}`}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Task number</p><p className="mt-2 font-semibold text-slate-700">{task.id}</p></div></div>
      <button disabled={toggleMutation.isPending} onClick={() => toggleMutation.mutate(!task.completed)} className="btn-primary w-full sm:w-auto">{task.completed ? <><Circle size={17}/> Reopen task (this device only)</> : <><CheckCircle2 size={17}/> Mark done (this device only)</>}</button>
      <p className="mt-3 text-xs text-slate-400">JSONPlaceholder is a demo API. Status changes are kept in the current app session and are not saved to the API.</p>
    </article>
  </section>
}
