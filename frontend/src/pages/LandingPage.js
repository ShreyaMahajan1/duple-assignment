import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-10">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="hero-title">
                Welcome to <span className="brand-name">ProManager</span>
              </h1>
              <p className="hero-subtitle">
                Your Complete Project Management Solution
              </p>
              <p className="hero-description">
                Streamline your workflow with powerful task management, 
                visual Kanban boards, team collaboration, and real-time tracking.
              </p>
              <div className="hero-buttons">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="me-3 mb-3"
                  onClick={() => navigate('/admin-login')}
                >
                  Admin Login
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg"
                  className="mb-3"
                  onClick={() => navigate('/user-login')}
                >
                  Employee Login
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-image">
                <i className="bi bi-kanban" style={{ fontSize: '15rem', color: '#0d6efd' }}></i>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Powerful Features</h2>
              <p className="section-subtitle">Everything you need to manage projects efficiently</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-kanban"></i>
                  </div>
                  <Card.Title>Kanban Board</Card.Title>
                  <Card.Text>
                    Visual drag-and-drop task management. Move tasks between 
                    Todo, In Progress, and Done with ease.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-people"></i>
                  </div>
                  <Card.Title>Team Collaboration</Card.Title>
                  <Card.Text>
                    Assign tasks, add comments, and track team progress. 
                    Keep everyone on the same page.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <Card.Title>Project Tracking</Card.Title>
                  <Card.Text>
                    Monitor project progress with real-time dashboards and 
                    detailed activity history.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-funnel"></i>
                  </div>
                  <Card.Title>Advanced Filtering</Card.Title>
                  <Card.Text>
                    Find tasks quickly with 8+ filter types including status, 
                    priority, assignee, and date range.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <Card.Title>Comments & Chat</Card.Title>
                  <Card.Text>
                    Communicate directly on tasks and projects. Built-in 
                    messaging keeps conversations organized.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <Card.Title>Secure & Reliable</Card.Title>
                  <Card.Text>
                    Enterprise-grade security with JWT authentication, 
                    role-based access, and data encryption.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">Get started in 4 simple steps</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="step-card text-center">
                <div className="step-number">1</div>
                <h4>Login</h4>
                <p>Choose Admin or Employee login based on your role</p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="step-card text-center">
                <div className="step-number">2</div>
                <h4>Create Projects</h4>
                <p>Set up projects and organize them with boards</p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="step-card text-center">
                <div className="step-number">3</div>
                <h4>Assign Tasks</h4>
                <p>Create tasks, set priorities, and assign to team members</p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="step-card text-center">
                <div className="step-number">4</div>
                <h4>Track Progress</h4>
                <p>Use Kanban board to visualize and manage workflow</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="mb-4">Ready to Get Started?</h2>
              <p className="lead mb-4">
                Join teams already using ProManager to streamline their workflow
              </p>
              <div className="cta-buttons">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="me-3 mb-3"
                  onClick={() => navigate('/admin-login')}
                >
                  Login as Admin
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg"
                  className="mb-3"
                  onClick={() => navigate('/user-login')}
                >
                  Login as Employee
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="landing-footer py-4 bg-dark text-white">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <h5>ProManager</h5>
              <p className="mb-0">Complete Project Management Solution</p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <p className="mb-0">© 2026 ProManager. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default LandingPage
