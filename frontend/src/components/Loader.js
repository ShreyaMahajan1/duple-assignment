import React from 'react'
import { Spinner } from 'react-bootstrap'
import './Loader.css'

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <Spinner animation="border" role="status" variant="primary" className="loader-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="loader-text">{message}</p>
      </div>
    </div>
  )
}

export default Loader
