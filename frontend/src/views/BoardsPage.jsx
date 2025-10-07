import React, { useState, useEffect } from 'react'
import { api } from '../api/base'
import Loader from '../components/Loader'

export default function BoardsPage({ onNavigateToBoard }) {
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [newBoardName, setNewBoardName] = useState('')

  useEffect(() => {
    loadBoards()
  }, [])

  const loadBoards = async () => {
    try {
      const data = await api.getBoards()
      setBoards(data)
    } catch (error) {
      console.error('Error loading boards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return
    try {
      await api.createBoard({ name: newBoardName })
      setNewBoardName('')
      setIsCreating(false)
      loadBoards()
    } catch (error) {
      console.error('Error creating board:', error)
    }
  }

  const handleDeleteBoard = async (id) => {
    if (!window.confirm('Delete this board and all its lists and tasks?')) return
    try {
      await api.deleteBoard(id)
      loadBoards()
    } catch (error) {
      console.error('Error deleting board:', error)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">TaskBoard</h1>
          <p className="text-gray-600">Organize your projects efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div
              key={board._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition border border-purple-100 overflow-hidden group"
            >
              <div
                onClick={() => onNavigateToBoard(board._id)}
                className="p-6 cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {board.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {board.lists?.length || 0} lists
                </p>
              </div>
              <div className="px-6 pb-4 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleDeleteBoard(board._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete Board
                </button>
              </div>
            </div>
          ))}

          {isCreating ? (
            <div className="bg-white rounded-lg shadow-md p-6 border border-purple-200">
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Board name"
                className="w-full mb-4 px-4 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateBoard()}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateBoard}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false)
                    setNewBoardName('')
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="bg-purple-100 rounded-lg p-6 border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-200 transition flex items-center justify-center min-h-32"
            >
              <span className="text-purple-600 font-semibold">+ Create New Board</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}