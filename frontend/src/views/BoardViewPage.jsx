import React, { useState, useEffect } from 'react'
import { api } from '../api/base'
import ListColumn from '../components/ListColumn'
import Loader from '../components/Loader'

export default function BoardViewPage({ boardId, onNavigateBack }) {
  const [board, setBoard] = useState(null)
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCreatingList, setIsCreatingList] = useState(false)
  const [newListName, setNewListName] = useState('')

  useEffect(() => {
    loadBoard()
    loadLists()
  }, [boardId])

  const loadBoard = async () => {
    try {
      const data = await api.getBoardById(boardId)
      setBoard(data)
    } catch (error) {
      console.error('Error loading board:', error)
    }
  }

  const loadLists = async () => {
    try {
      const data = await api.getLists(boardId)
      setLists(data)
    } catch (error) {
      console.error('Error loading lists:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateList = async () => {
    if (!newListName.trim()) return
    try {
      await api.createList({ name: newListName, boardId })
      setNewListName('')
      setIsCreatingList(false)
      loadLists()
    } catch (error) {
      console.error('Error creating list:', error)
    }
  }

  const handleDeleteList = async (listId) => {
    if (!window.confirm('Delete this list and all its tasks?')) return
    try {
      await api.deleteList(listId)
      loadLists()
    } catch (error) {
      console.error('Error deleting list:', error)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <button
          onClick={onNavigateBack}
          className="text-purple-600 hover:text-purple-800 mb-4"
        >
          ← Back to Boards
        </button>
        <h1 className="text-3xl font-bold text-purple-600">
          {board?.name || 'Board'}
        </h1>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8">
        {lists.map((list) => (
          <ListColumn
            key={list._id}
            list={list}
            onDelete={handleDeleteList}
            onRefresh={loadLists}
          />
        ))}

        {isCreatingList ? (
          <div className="bg-purple-50 rounded-lg p-4 w-80 flex-shrink-0">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="List name"
              className="w-full mb-3 px-4 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateList}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Add List
              </button>
              <button
                onClick={() => {
                  setIsCreatingList(false)
                  setNewListName('')
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreatingList(true)}
            className="bg-purple-100 rounded-lg p-4 w-80 flex-shrink-0 border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-200 transition flex items-center justify-center min-h-32"
          >
            <span className="text-purple-600 font-semibold">+ Add List</span>
          </button>
        )}
      </div>
    </div>
  )
}