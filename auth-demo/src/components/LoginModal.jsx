import React, { useState, useEffect } from 'react'
import './LoginModal.css'
import { auth } from '../lib/supabase'

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await auth.signInWithOtp(email)
      
      if (error) throw error
      
      setMessage('Check your email for the login link!')
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
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
          
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginModal