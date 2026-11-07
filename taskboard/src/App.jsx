import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import Stats from './pages/Stats'
import About from './pages/About'
import { ErrorState } from './components/States'
function NotFound(){return <ErrorState message="This page does not exist. Use the navigation to return to TaskBoard." />}
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<Tasks/>}/><Route path="tasks/:id" element={<TaskDetails/>}/><Route path="stats" element={<Stats/>}/><Route path="about" element={<About/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>}
