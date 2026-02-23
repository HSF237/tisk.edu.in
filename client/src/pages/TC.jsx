import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { FaFilePdf, FaDownload, FaQrcode } from 'react-icons/fa'

const TC = () => {
  const { user } = useAuth()
  const [tcs, setTCs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchTCs()
    }
  }, [user])

  const fetchTCs = async () => {
    try {
      const response = await axios.get('/api/tc')
      const apiTCs = response.data.data || []
      const localTCs = JSON.parse(localStorage.getItem("tc")) || []
      const formattedLocal = localTCs.map(item => ({
        _id: item.id,
        studentName: 'Staff Uploaded TC',
        tcNumber: 'N/A',
        class: 'N/A',
        dateOfLeaving: new Date(),
        link: item.link,
        isLocal: true
      }))
      setTCs([...formattedLocal, ...apiTCs])
    } catch (error) {
      console.error('Error fetching TCs:', error)
      const localTCs = JSON.parse(localStorage.getItem("tc")) || []
      const formattedLocal = localTCs.map(item => ({
        _id: item.id,
        studentName: 'Staff Uploaded TC',
        tcNumber: 'N/A',
        class: 'N/A',
        dateOfLeaving: new Date(),
        link: item.link,
        isLocal: true
      }))
      setTCs(formattedLocal)
    } finally {
      setLoading(false)
    }
  }

  const downloadTC = async (tcId) => {
    try {
      const response = await axios.get(`/api/tc/${tcId}/download`, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `TC_${tcId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()

      toast.success('TC downloaded successfully')
    } catch (error) {
      toast.error('Failed to download TC')
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-head"
        >
          <h2>Transfer Certificates</h2>
          <div className="divider"></div>
          <p className="text-gray-600 mt-4 text-lg">
            {user?.role === 'admin'
              ? 'Generate and manage transfer certificates'
              : 'View your transfer certificates'}
          </p>
        </motion.div>

        {user?.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Generate New TC</h3>
            <p className="text-gray-600 mb-4">
              To generate a new Transfer Certificate, please use the admin dashboard or contact the system administrator.
            </p>
            <p className="text-sm text-gray-500">
              Note: TC generation requires student details and will create a PDF with QR code verification.
            </p>
          </motion.div>
        )}

        {tcs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {tcs.map((tc) => (
              <motion.div
                key={tc._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{tc.studentName}</h3>
                    <p className="text-gray-600 text-sm">TC Number: {tc.tcNumber}</p>
                    <p className="text-gray-600 text-sm">Class: {tc.class}</p>
                    <p className="text-gray-600 text-sm">
                      Date of Leaving: {new Date(tc.dateOfLeaving).toLocaleDateString()}
                    </p>
                  </div>
                  {tc.qrCode && (
                    <div className="bg-gray-100 p-2 rounded">
                      <img src={tc.qrCode} alt="QR Code" className="w-20 h-20" />
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>Admission Number:</span>
                    <span className="font-semibold">{tc.admissionNumber}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>Parent Name:</span>
                    <span className="font-semibold">{tc.parentName}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>Reason:</span>
                    <span className="font-semibold text-right max-w-xs">{tc.reason}</span>
                  </div>

                  {tc.isLocal ? (
                    <a
                      href={tc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn btn-accent flex items-center justify-center gap-2"
                    >
                      <FaDownload /> View TC File
                    </a>
                  ) : (
                    <button
                      onClick={() => downloadTC(tc._id)}
                      className="w-full btn btn-accent flex items-center justify-center gap-2"
                    >
                      <FaDownload /> Download TC PDF
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center py-12"
          >
            <FaFilePdf className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No Transfer Certificates Found</p>
            <p className="text-gray-500 text-sm">
              {user?.role === 'admin'
                ? 'Generate a new TC to get started'
                : 'You don\'t have any transfer certificates yet'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TC
