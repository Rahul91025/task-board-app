import React, { useState } from 'react'
import BoardsPage from '../views/BoardsPage'
import BoardViewPage from '../views/BoardViewPage'

export default function App() {
  const [currentView, setCurrentView] = useState('boards')
  const [selectedBoardId, setSelectedBoardId] = useState(null)

  const navigateToBoard = (boardId) => {
    setSelectedBoardId(boardId)
    setCurrentView('board')
  }

  const navigateToBoards = () => {
    setCurrentView('boards')
    setSelectedBoardId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {currentView === 'boards' ? (
        <BoardsPage onNavigateToBoard={navigateToBoard} />
      ) : (
        <BoardViewPage 
          boardId={selectedBoardId} 
          onNavigateBack={navigateToBoards} 
        />
      )}
    </div>
  )
}