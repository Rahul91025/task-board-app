import React, { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import { api } from '../api/base'

export default function ListColumn({ list, onUpdate, onDelete, onRefresh }) {
  const [tasks, setTasks] = useState([])
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [listName, setListName] = useState(list.name)
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' })

  useEffect(() => {
    loadTasks()
  }, [list._id])

  const loadTasks = async () => {
    try {
      const data = await api.getTasks(list._id)
      setTasks(data)
    } catch (error) {
      console.error('Error loading tasks:', error)
    }
  }

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return
    try {
      await api.createTask({ ...newTask, listId: list._id })
      setNewTask({ title: '', description: '', dueDate: '' })
      setIsAddingTask(false)
      loadTasks()
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleUpdateTask = async (taskId, data) => {
    try {
      await api.updateTask(taskId, data)
      loadTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await api.deleteTask(taskId)
      loadTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleUpdateListName = async () => {
    if (!listName.trim()) return
    try {
      await api.updateList(list._id, { name: listName })
      setIsEditingName(false)
      onRefresh()
    } catch (error) {
      console.error('Error updating list:', error)
    }
  }

  return (
    <div className="bg-purple-50 rounded-lg p-4 w-80 flex-shrink-0">
      <div className="mb-4">
        {isEditingName ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="flex-1 px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleUpdateListName()}
            />
            <button
              onClick={handleUpdateListName}
              className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700"
            >
              ✓
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">{list.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditingName(true)}
                className="text-purple-600 hover:text-purple-800 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(list._id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {isAddingTask ? (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full mb-2 px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Task title"
          />
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full mb-2 px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Description"
            rows="2"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="w-full mb-3 px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateTask}
              className="flex-1 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700"
            >
              Add Task
            </button>
            <button
              onClick={() => {
                setIsAddingTask(false)
                setNewTask({ title: '', description: '', dueDate: '' })
              }}
              className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingTask(true)}
          className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          + Add Task
        </button>
      )}
    </div>
  )
}