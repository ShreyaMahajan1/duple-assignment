import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [boards, setBoards] = useState([])
  const [tasks, setTasks] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    progress: '',
    priority: '',
    employeeId: '',
    projectId: '',
    boardId: '',
    dueDateFrom: '',
    dueDateTo: ''
  })

  // Pagination states
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      search: '',
      progress: '',
      priority: '',
      employeeId: '',
      projectId: '',
      boardId: '',
      dueDateFrom: '',
      dueDateTo: ''
    })
  }

  const value = {
    projects,
    setProjects,
    boards,
    setBoards,
    tasks,
    setTasks,
    employees,
    setEmployees,
    loading,
    setLoading,
    filters,
    updateFilter,
    resetFilters,
    pagination,
    setPagination
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
