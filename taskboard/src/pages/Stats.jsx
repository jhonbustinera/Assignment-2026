import { useQuery } from '@tanstack/react-query'
import { fetchTasks, fetchUsers } from '../lib/api'
import { ErrorState, LoadingState } from '../components/States'

export default function Stats() {
  const tasksQuery = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks })
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  if (tasksQuery.isPending || usersQuery.isPending) return <LoadingState label="Calculating your task overview..." />
  if (tasksQuery.isError || usersQuery.isError) return <ErrorState message={tasksQuery.error?.message || usersQuery.error?.message} onRetry={() => { tasksQuery.refetch(); usersQuery.refetch() }} />
  const tasks = tasksQuery.data || []
  const done = tasks.filter(task => task.completed).length
  const open = tasks.length - done
  const perUser = (usersQuery.data || []).map(user => ({ ...user, count: tasks.filter(task => task.userId === user.id && task.completed).length })).sort((a,b) => b.count-a.count)
  const max = Math.max(...perUser.map(user => user.count), 1)
  return <section className="space-y-7"><div><p className="eyebrow">YOUR WORKSPACE</p><h1 className="page-title">Overview</h1><p className="mt-1 text-sm text-slate-500">A quick look at task progress across the team.</p></div>
    <div className="grid gap-3 sm:grid-cols-3">{[{label:'Total tasks',value:tasks.length,detail:'All tasks'},{label:'Done',value:done,detail:`${Math.round(done/(tasks.length||1)*100)}% completed`},{label:'Open',value:open,detail:'Still to do'}].map((item,i)=><div key={item.label} className="rounded-2xl border border-[#e9e1ed] bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">{item.label}</p><p className="mt-2 text-4xl font-extrabold tracking-tight text-brand-700">{item.value}</p><p className="mt-1 text-xs text-slate-400">{item.detail}</p></div>)}</div>
    <div className="rounded-2xl border border-[#e9e1ed] bg-white p-5 shadow-sm sm:p-7"><div className="mb-6 flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-800">Completed tasks by user</h2><p className="mt-1 text-xs text-slate-500">Counts calculated from the fetched task list</p></div><span className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">Team stats</span></div>
      <div className="space-y-5">{perUser.map(person=><div key={person.id} className="grid grid-cols-[minmax(82px,125px)_1fr_28px] items-center gap-3"><span className="truncate text-xs font-medium text-slate-600">{person.name.split(' ')[0]}</span><div className="h-3 overflow-hidden rounded-full bg-brand-50"><div className="h-full rounded-full bg-brand-500" style={{width:`${person.count/max*100}%`}}/></div><span className="text-right text-xs font-bold tabular-nums text-slate-600">{person.count}</span></div>)}</div>
    </div>
  </section>
}
