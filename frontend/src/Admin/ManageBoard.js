import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axiosInstance from '../utils/axiosConfig'
import { ClipLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const ManageBoard = () => {
  const [boards, setBoards] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentBoard, setCurrentBoard] = useState({
    _id: '',
    name: '',
    description: '',
    projectId: ''
  })

  useEffect(() => {
    fetchBoards()
    fetchProjects()
  }, [])

  const fetchBoards = async () => {
    try {
      const response = await axiosInstance.post('/admin/board/all', {})
      if (response.data.success) {
        setBoards(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching boards:', error)
      toast.error('Failed to load boards')
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.post('/admin/project/all', {})
      if (response.data.success) {
        setProjects(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleShowModal = (board = null) => {
    if (board) {
      setEditMode(true)
      setCurrentBoard(board)
    } else {
      setEditMode(false)
      setCurrentBoard({
        _id: '',
        name: '',
        description: '',
        projectId: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentBoard({
      _id: '',
      name: '',
      description: '',
      projectId: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentBoard(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!currentBoard.name || !currentBoard.projectId) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const endpoint = editMode ? '/admin/board/update' : '/admin/board/add'
      const payload = {
        ...currentBoard,
        createdBy: sessionStorage.getItem('_id')
      }

      const response = await axiosInstance.post(endpoint, payload)

      if (response.data.success) {
        toast.success(editMode ? 'Board updated successfully' : 'Board created successfully')
        handleCloseModal()
        fetchBoards()
      }
    } catch (error) {
      console.error('Error saving board:', error)
      toast.error('Failed to save board')
    }
  }

  const handleDelete = async (boardId) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      try {
        const response = await axiosInstance.post('/admin/board/delete', { _id: boardId })
        if (response.data.success) {
          toast.success('Board deleted successfully')
          fetchBoards()
        }
      } catch (error) {
        console.error('Error deleting board:', error)
        toast.error('Failed to delete board')
      }
    }
  }

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <ClipLoader loading={loading} size={100} color="#0891b2" />
      </div>
    )
  }

  return (
    <main id="main" className="main">
      <ToastContainer/>
      <div className="pagetitle">
        <h1>Manage Boards</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Board</a>
            </li>
            <li className="breadcrumb-item active">Manage Boards</li>
          </ol>
        </nav>
      </div>

      <div className="container">
        <div className="row justify-content-between align-items-center mb-3">
          <div className="col">
            <h2>All Boards</h2>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={() => handleShowModal()}>
              + Add Board
            </button>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-12 mt-3">
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Board Name</th>
                    <th>Description</th>
                    <th>Project</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {boards.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No boards found
                      </td>
                    </tr>
                  ) : (
                    boards.map((board, index) => (
                      <tr key={board._id}>
                        <td>{index + 1}</td>
                        <td>{board.name}</td>
                        <td>{board.description}</td>
                        <td>{board.projectId?.name || 'N/A'}</td>
                        <td>{new Date(board.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleShowModal(board)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(board._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? 'Edit Board' : 'Add Board'}</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Board Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={currentBoard.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      name="description"
                      className="form-control"
                      value={currentBoard.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Project *</label>
                    <select
                      name="projectId"
                      className="form-control"
                      value={currentBoard.projectId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Project</option>
                      {projects.map(project => (
                        <option key={project._id} value={project._id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editMode ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default ManageBoard
