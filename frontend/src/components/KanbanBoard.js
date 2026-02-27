import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Card, Badge, Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosConfig'
import moment from 'moment'
import Loader from './Loader'
import './KanbanBoard.css'

const KanbanBoard = ({ projectId, boardId }) => {
  const [tasks, setTasks] = useState({
    'Todo': [],
    'In Progress': [],
    'Done': []
  })
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [projectId, boardId])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      // Check if user is employee or admin
      const isEmployee = !!sessionStorage.getItem('Emptoken')
      const isAdmin = !!sessionStorage.getItem('token')
      
      const endpoint = isAdmin ? '/admin/task/all' : '/employee/task/all'
      
      const body = {}
      if (projectId) body.projectId = projectId
      if (boardId) body.boardId = boardId

      const response = await axiosInstance.post(endpoint, body)
      
      if (response.data.success) {
        const taskData = response.data.data
        
        // Map old progress values to new ones
        const mapProgress = (progress) => {
          if (progress === 'Pending') return 'Todo'
          if (progress === 'Working') return 'In Progress'
          if (progress === 'Complete') return 'Done'
          return progress // Return as-is if already using new values
        }
        
        // Group tasks by progress (with mapping)
        const grouped = {
          'Todo': taskData.filter(t => mapProgress(t.progress) === 'Todo'),
          'In Progress': taskData.filter(t => mapProgress(t.progress) === 'In Progress'),
          'Done': taskData.filter(t => mapProgress(t.progress) === 'Done')
        }
        
        setTasks(grouped)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result

    // Dropped outside the list
    if (!destination) return

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceColumn = source.droppableId
    const destColumn = destination.droppableId

    // Create new task arrays
    const newTasks = { ...tasks }
    const sourceTasks = Array.from(newTasks[sourceColumn])
    const destTasks = sourceColumn === destColumn 
      ? sourceTasks 
      : Array.from(newTasks[destColumn])

    // Remove from source
    const [movedTask] = sourceTasks.splice(source.index, 1)

    // Add to destination
    destTasks.splice(destination.index, 0, movedTask)

    // Update state
    newTasks[sourceColumn] = sourceTasks
    newTasks[destColumn] = destTasks
    setTasks(newTasks)

    // Update task progress in backend
    if (sourceColumn !== destColumn) {
      try {
        // Check if user is employee or admin
        const isEmployee = !!sessionStorage.getItem('Emptoken')
        const isAdmin = !!sessionStorage.getItem('token')
        
        const endpoint = isAdmin
          ? '/admin/task/update' 
          : '/employee/task/progress'

        // Map Kanban status back to old system status
        const mapToOldProgress = (progress) => {
          if (progress === 'Todo') return 'Pending'
          if (progress === 'In Progress') return 'Working'
          if (progress === 'Done') return 'Complete'
          return progress
        }

        await axiosInstance.post(endpoint, {
          _id: draggableId,
          progress: mapToOldProgress(destColumn)
        })

        toast.success(`Task moved to ${destColumn}`)
      } catch (error) {
        console.error('Error updating task:', error)
        toast.error('Failed to update task')
        // Revert on error
        fetchTasks()
      }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'danger'
      case 'High': return 'warning'
      case 'Medium': return 'info'
      case 'Low': return 'secondary'
      default: return 'secondary'
    }
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  const TaskCard = ({ task, index }) => (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`kanban-task-card ${snapshot.isDragging ? 'dragging' : ''}`}
          onClick={() => handleTaskClick(task)}
        >
          <Card className="mb-2">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="mb-0">{task.title}</h6>
                <Badge bg={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              <p className="text-muted small mb-2">
                {task.description?.substring(0, 80)}
                {task.description?.length > 80 ? '...' : ''}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {task.employeeId?.name || 'Unassigned'}
                </small>
                <small className="text-muted">
                  {moment(task.deadline).format('MMM DD')}
                </small>
              </div>
              {task.comments && task.comments.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    💬 {task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  )

  const Column = ({ columnId, tasks }) => (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`kanban-column ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
        >
          <div className="kanban-column-header">
            <h5>{columnId}</h5>
            <Badge bg="secondary">{tasks.length}</Badge>
          </div>
          <div className="kanban-column-content">
            {tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )

  if (loading) {
    return <Loader message="Loading tasks..." />
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          <Column columnId="Todo" tasks={tasks['Todo']} />
          <Column columnId="In Progress" tasks={tasks['In Progress']} />
          <Column columnId="Done" tasks={tasks['Done']} />
        </div>
      </DragDropContext>

      {/* Task Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedTask?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <div>
              <div className="mb-3">
                <strong>Description:</strong>
                <p>{selectedTask.description}</p>
              </div>
              <div className="mb-3">
                <strong>Priority:</strong>{' '}
                <Badge bg={getPriorityColor(selectedTask.priority)}>
                  {selectedTask.priority}
                </Badge>
              </div>
              <div className="mb-3">
                <strong>Status:</strong> {selectedTask.progress}
              </div>
              <div className="mb-3">
                <strong>Assigned To:</strong> {selectedTask.employeeId?.name || 'Unassigned'}
              </div>
              <div className="mb-3">
                <strong>Deadline:</strong> {moment(selectedTask.deadline).format('MMMM DD, YYYY')}
              </div>
              {selectedTask.comments && selectedTask.comments.length > 0 && (
                <div className="mb-3">
                  <strong>Comments:</strong>
                  <div className="mt-2">
                    {selectedTask.comments.map((comment, idx) => (
                      <div key={idx} className="border-bottom pb-2 mb-2">
                        <small className="text-muted">
                          {comment.userId?.name} - {moment(comment.createdAt).fromNow()}
                        </small>
                        <p className="mb-0">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedTask.activityHistory && selectedTask.activityHistory.length > 0 && (
                <div>
                  <strong>Activity History:</strong>
                  <div className="mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {selectedTask.activityHistory.map((activity, idx) => (
                      <div key={idx} className="border-bottom pb-2 mb-2">
                        <small className="text-muted">
                          {moment(activity.timestamp).format('MMM DD, YYYY HH:mm')}
                        </small>
                        <p className="mb-0">
                          <strong>{activity.action}:</strong> {activity.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default KanbanBoard
