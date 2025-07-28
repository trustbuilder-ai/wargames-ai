import React, { useState, useEffect } from 'react'
import './LoginModal.css'

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      onLogin(email)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login / Register</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <p className="form-description">
            Enter your email address to receive a one-time password
          </p>
          
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
            autoFocus
          />
          
          <button type="submit" className="submit-button">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal