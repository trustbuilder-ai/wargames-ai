import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Breadcrumbs from './components/Breadcrumbs'
import Home from './pages/Home'
import Wargames from './pages/Wargames'
import Models from './pages/Models'
import RedTeaming from './pages/RedTeaming'
import Callback from './pages/auth/Callback'
import './App.css'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="app">
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isCollapsed={sidebarCollapsed} isMobile={isMobile} />
      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wargames" element={<Wargames />} />
          <Route path="/models" element={<Models />} />
          <Route path="/redteaming" element={<RedTeaming />} />
          <Route path="/auth/callback" element={<Callback />} />
        </Routes>
      </main>
    </div>
  )
}

export default App