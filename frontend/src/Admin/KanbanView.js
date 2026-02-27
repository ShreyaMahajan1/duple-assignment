import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import KanbanBoard from '../components/KanbanBoard'
import axiosInstance from '../utils/axiosConfig'

const KanbanView = () => {
  const [projects, setProjects] = useState([])
  const [boards, setBoards] = useState([])
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedBoard, setSelectedBoard] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedProject) {
      fetchBoards(selectedProject)
    } else {
      setBoards([])
      setSelectedBoard('')
    }
  }, [selectedProject])

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

  const fetchBoards = async (projectId) => {
    try {
      const response = await axiosInstance.post('/admin/board/all', { projectId })
      if (response.data.success) {
        setBoards(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching boards:', error)
    }
  }

  return (
    <main id="main" className="main">
    <Container fluid className="p-4" style={{ marginLeft: '0', width: '100%' }}>
      <Row className="mb-4">
        <Col>
          <h2>Kanban Board</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Select Project</Form.Label>
            <Form.Select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">All Projects</option>
              {projects.map(project => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Select Board</Form.Label>
            <Form.Select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              disabled={!selectedProject}
            >
              <option value="">All Boards</option>
              {boards.map(board => (
                <option key={board._id} value={board._id}>
                  {board.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedProject('')
              setSelectedBoard('')
            }}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <KanbanBoard 
            projectId={selectedProject} 
            boardId={selectedBoard}
          />
        </Col>
      </Row>
    </Container>
    </main>
  )
}

export default KanbanView
