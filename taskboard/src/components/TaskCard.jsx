import { Link } from 'react-router-dom'
import { Check, Circle } from 'lucide-react'

export default function TaskCard({ task, userName }) {
  return <Link to={`/tasks/${task.id}`} className="group flex items-center gap-3 rounded-xl border border-[#e7deeb] bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft sm:gap-4 sm:px-4">
    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border ${task.completed ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-brand-500 text-brand-500'}`}>{task.completed ? <Check size={16}/> : <Circle size={15}/>}</span>
    <span className={`min-w-0 flex-1 text-sm font-semibold leading-5 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-brand-700'}`}>{task.title}</span>
    <span className="hidden max-w-32 truncate rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:inline-block">{userName || `User ${task.userId}`}</span>
    <span className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-bold ${task.completed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>{task.completed ? 'Done' : 'Open'}</span>
  </Link>
}
