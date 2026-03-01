import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Teachers from './pages/Teachers'
import Academics from './pages/Academics'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Admissions from './pages/Admissions'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Protected Pages
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import TeacherDashboard from './pages/dashboard/TeacherDashboard'
import ParentDashboard from './pages/dashboard/ParentDashboard'
import StudentDashboard from './pages/dashboard/StudentDashboard'
import Fees from './pages/Fees'
import TC from './pages/TC'
import Certificates from './pages/Certificates'
import AdminHidden from './pages/AdminHidden'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admissions" element={<Admissions />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/teacher" element={
                  <ProtectedRoute requiredRole="teacher">
                    <TeacherDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/parent" element={
                  <ProtectedRoute requiredRole="parent">
                    <ParentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/student" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/fees" element={
                  <ProtectedRoute>
                    <Fees />
                  </ProtectedRoute>
                } />
                <Route path="/tc" element={
                  <ProtectedRoute>
                    <TC />
                  </ProtectedRoute>
                } />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/admin-7h3k92" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminHidden />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App

