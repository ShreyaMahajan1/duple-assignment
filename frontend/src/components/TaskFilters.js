import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const TaskFilters = ({ filters, onFilterChange, onReset, projects, employees }) => {
  return (
    <div className="bg-light p-3 rounded mb-4">
      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={filters.progress}
              onChange={(e) => onFilterChange('progress', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Pending">Pending</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={filters.priority}
              onChange={(e) => onFilterChange('priority', e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group className="mb-3">
            <Form.Label>Assigned To</Form.Label>
            <Form.Select
              value={filters.employeeId}
              onChange={(e) => onFilterChange('employeeId', e.target.value)}
            >
              <option value="">All Employees</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group className="mb-3">
            <Form.Label>Project</Form.Label>
            <Form.Select
              value={filters.projectId}
              onChange={(e) => onFilterChange('projectId', e.target.value)}
            >
              <option value="">All Projects</option>
              {projects.map(proj => (
                <option key={proj._id} value={proj._id}>
                  {proj.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={1} className="d-flex align-items-end">
          <Button
            variant="secondary"
            className="mb-3 w-100"
            onClick={onReset}
          >
            Reset
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Due Date From</Form.Label>
            <Form.Control
              type="date"
              value={filters.dueDateFrom}
              onChange={(e) => onFilterChange('dueDateFrom', e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Due Date To</Form.Label>
            <Form.Control
              type="date"
              value={filters.dueDateTo}
              onChange={(e) => onFilterChange('dueDateTo', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}

export default TaskFilters
