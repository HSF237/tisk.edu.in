import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaUserTie, FaChalkboardTeacher, FaUser, FaGraduationCap } from 'react-icons/fa'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin')
          break
        case 'teacher':
          navigate('/teacher')
          break
        case 'parent':
          navigate('/parent')
          break
        case 'student':
          navigate('/student')
          break
        default:
          break
      }
    }
  }, [user, navigate])

  const roleIcons = {
    admin: FaUserTie,
    teacher: FaChalkboardTeacher,
    parent: FaUser,
    student: FaGraduationCap
  }

  const Icon = roleIcons[user?.role] || FaUser

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Icon className="text-6xl text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-primary mb-2">Loading Dashboard...</h2>
        <p className="text-gray-600">Redirecting to your dashboard</p>
      </div>
    </div>
  )
}

export default Dashboard

