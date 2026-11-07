import { NavLink, Outlet } from 'react-router-dom'
import { CheckSquare, ChartNoAxesColumn, Info } from 'lucide-react'

const links = [
  { to: '/', label: 'Tasks', icon: CheckSquare, end: true },
  { to: '/stats', label: 'Stats', icon: ChartNoAxesColumn },
  { to: '/about', label: 'About', icon: Info },
]
export default function Layout() {
  return <div className="min-h-screen bg-[#faf8fb] text-slate-800">
    <header className="sticky top-0 z-20 border-b border-[#e9e1ed] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-brand-700"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100"><CheckSquare size={20}/></span>TaskBoard</NavLink>
        <nav className="flex items-center gap-1 sm:gap-2">{links.map(({to,label,icon:Icon,end}) => <NavLink key={to} to={to} end={end} className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`}><Icon size={16}/><span>{label}</span></NavLink>)}</nav>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10"><Outlet /></main>
    <footer className="border-t border-[#eee7f0] px-4 py-5 text-center text-xs text-slate-500">TaskBoard Mini Project · Built with React, TanStack Query and Tailwind CSS</footer>
  </div>
}
