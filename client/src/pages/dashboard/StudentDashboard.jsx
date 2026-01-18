import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { FaGraduationCap, FaBook, FaCalendarAlt, FaFileAlt, FaRupeeSign } from 'react-icons/fa'

const StudentDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name}!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <FaBook className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">My Classes</h3>
            <p className="text-gray-600">View class schedule</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <FaFileAlt className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Assignments</h3>
            <p className="text-gray-600">View and submit assignments</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <FaCalendarAlt className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Attendance</h3>
            <p className="text-gray-600">Check your attendance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <FaRupeeSign className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Fee Payment</h3>
            <p className="text-gray-600">Pay fees online</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

