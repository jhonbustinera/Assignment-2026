const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`)
  if (!response.ok) throw new Error(`Request failed (${response.status}). Please try again.`)
  return response.json()
}

export const fetchTasks = () => request('/todos?_limit=50')
export const fetchTask = (id) => request(`/todos/${id}`)
export const fetchUsers = () => request('/users')
