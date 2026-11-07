import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react'

export function LoadingState({ label = 'Loading tasks...' }) {
  return <div className="state-panel"><LoaderCircle className="animate-spin text-brand-600" size={30} /><p>{label}</p><div className="skeleton-list"><i /><i /><i /></div></div>
}
export function ErrorState({ message, onRetry }) {
  return <div className="state-panel"><AlertCircle className="text-rose-600" size={32} /><h2>Something went wrong</h2><p>{message || 'We could not load the information. Please try again.'}</p>{onRetry && <button className="btn-primary" onClick={onRetry}>Try again</button>}</div>
}
export function EmptyState({ onClear }) {
  return <div className="state-panel"><CheckCircle2 className="text-brand-600" size={32} /><h2>No tasks match your filters</h2><p>Try changing your search or clearing the filters.</p>{onClear && <button className="btn-secondary" onClick={onClear}>Clear filters</button>}</div>
}
