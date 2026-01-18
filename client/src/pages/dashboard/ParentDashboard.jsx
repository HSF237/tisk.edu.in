import { motion } from 'framer-motion'
import { FaUser, FaGraduationCap, FaRupeeSign, FaFileAlt } from 'react-icons/fa'

const ParentDashboard = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Parent Dashboard</h1>
          <p className="text-gray-600">Track your child's progress and activities</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <FaGraduationCap className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">My Children</h3>
            <p className="text-gray-600">View children's profiles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <FaRupeeSign className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Fee Payment</h3>
            <p className="text-gray-600">Pay fees online</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <FaFileAlt className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Reports</h3>
            <p className="text-gray-600">View progress reports</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <FaUser className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Attendance</h3>
            <p className="text-gray-600">Check attendance records</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ParentDashboard

