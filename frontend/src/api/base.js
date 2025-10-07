const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export const api = {
  // Boards
  getBoards: async () => {
    const res = await fetch(`${API_BASE}/api/boards`)
    return res.json()
  },
  
  getBoardById: async (id) => {
    const res = await fetch(`${API_BASE}/api/boards/${id}`)
    return res.json()
  },
  
  createBoard: async (data) => {
    const res = await fetch(`${API_BASE}/api/boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  
  updateBoard: async (id, data) => {
    const res = await fetch(`${API_BASE}/api/boards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  
  deleteBoard: async (id) => {
    const res = await fetch(`${API_BASE}/api/boards/${id}`, {
      method: 'DELETE'
    })
    return res.json()
  },

  // Lists
  getLists: async (boardId) => {
    const res = await fetch(`${API_BASE}/api/lists/${boardId}`)
    return res.json()
  },
  
  createList: async (data) => {
    const res = await fetch(`${API_BASE}/api/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  
  updateList: async (id, data) => {
    const res = await fetch(`${API_BASE}/api/lists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  
  deleteList: async (id) => {
    const res = await fetch(`${API_BASE}/api/lists/${id}`, {
      method: 'DELETE'
    })
    return res.json()
  },

  // Tasks
  getTasks: async (listId) => {
    const res = await fetch(`${API_BASE}/api/tasks/${listId}`)
    return res.json()
  },
  
  createTask: async (data) => {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  
  updateTask: async (id, data) => {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  
  deleteTask: async (id) => {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'DELETE'
    })
    return res.json()
  }
}