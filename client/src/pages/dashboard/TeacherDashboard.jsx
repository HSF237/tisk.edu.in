import { motion } from 'framer-motion'
import { FaChalkboardTeacher, FaUsers, FaBook, FaCalendarAlt } from 'react-icons/fa'

const TeacherDashboard = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your classes and students</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <FaUsers className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">My Students</h3>
            <p className="text-gray-600">View your class students</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <FaBook className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Attendance</h3>
            <p className="text-gray-600">Mark and view attendance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <FaChalkboardTeacher className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Assignments</h3>
            <p className="text-gray-600">Create and manage assignments</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <FaCalendarAlt className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Schedule</h3>
            <p className="text-gray-600">View your class schedule</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard

