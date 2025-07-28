import React, { useState, useEffect, useRef } from 'react'
import LoginModal from './LoginModal'
import SearchBar from './SearchBar'
import './Header.css'

const Header = ({ onToggleSidebar }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogin = (email) => {
    console.log('Login attempt with email:', email)
    setUserEmail(email)
    setIsLoggedIn(true)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
    setShowUserDropdown(false)
  }

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button className="menu-button" onClick={onToggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="logo">Trustbuilder AI</span>
        </div>

        <div className="header-center">
          <SearchBar />
        </div>

        <div className="header-right">
          {isLoggedIn ? (
            <div className="user-menu" ref={dropdownRef}>
              <button
                className="user-button"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                {userEmail}
              </button>
              {showUserDropdown && (
                <div className="user-dropdown">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-button"
              onClick={() => setShowLoginModal(true)}
            >
              Login / Register
            </button>
          )}
        </div>
      </header>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  )
}

export default Header