import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { FaGraduationCap, FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'parent',
    phone: '',
    admissionNumber: '',
    class: ''
  })
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const result = await register(formData)
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <FaGraduationCap className="text-5xl text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-primary mb-2">Create Account</h2>
          <p className="text-gray-600">Register for TISK School Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <FaUser className="inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <FaEnvelope className="inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <FaLock className="inline mr-2" />
                Password *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <FaLock className="inline mr-2" />
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Role *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="input-field"
              >
                <option value="parent">Parent</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                <FaPhone className="inline mr-2" />
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          {formData.role === 'student' && (
            <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Admission Number *
                </label>
                <input
                  type="text"
                  required={formData.role === 'student'}
                  value={formData.admissionNumber}
                  onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Class *
                </label>
                <select
                  required={formData.role === 'student'}
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select Class</option>
                  <option value="Class I">Class I</option>
                  <option value="Class II">Class II</option>
                  <option value="Class III">Class III</option>
                  <option value="Class IV">Class IV</option>
                  <option value="Class V">Class V</option>
                  <option value="Class VI">Class VI</option>
                  <option value="Class VII">Class VII</option>
                  <option value="Class VIII">Class VIII</option>
                  <option value="Class IX">Class IX</option>
                  <option value="Class X">Class X</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" className="w-full btn btn-accent">
            Register
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default Register

