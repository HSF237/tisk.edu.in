import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { FaRupeeSign, FaCreditCard, FaCheckCircle, FaFileDownload } from 'react-icons/fa'

const Fees = () => {
  const { user } = useAuth()
  const [feeStructures, setFeeStructures] = useState([])
  const [payments, setPayments] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeeStructures()
    fetchPaymentHistory()
  }, [])

  const fetchFeeStructures = async () => {
    try {
      const response = await axios.get('/api/fees/structure')
      setFeeStructures(response.data.data)
      if (user?.class) {
        setSelectedClass(user.class)
      }
    } catch (error) {
      console.error('Error fetching fee structures:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get('/api/fees/history')
      setPayments(response.data.data || [])
    } catch (error) {
      console.error('Error fetching payment history:', error)
    }
  }

  const handlePayment = async (feeStructureId) => {
    try {
      const response = await axios.post('/api/fees/payment', {
        feeStructureId,
        studentId: user?.id
      })

      const { order, paymentId, key } = response.data

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        const options = {
          key: key,
          amount: order.amount,
          currency: order.currency,
          name: 'TISK English Medium School',
          description: 'Fee Payment',
          order_id: order.id,
          handler: async function (response) {
            try {
              await axios.post('/api/fees/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: paymentId
              })
              toast.success('Payment successful!')
              fetchPaymentHistory()
            } catch (error) {
              toast.error('Payment verification failed')
            }
          },
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: user?.phone || ''
          },
          theme: {
            color: '#3b82f6'
          }
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
      }
      document.body.appendChild(script)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment')
    }
  }

  const selectedFee = feeStructures.find(f => f.class === selectedClass)

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
          <h2>Fee Payment</h2>
          <div className="divider"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Fee Structure */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Fee Structure</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary mb-2">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="input-field"
              >
                <option value="">Select Class</option>
                {feeStructures.map((fee) => (
                  <option key={fee._id} value={fee.class}>{fee.class}</option>
                ))}
              </select>
            </div>

            {selectedFee && (
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Tuition Fee</span>
                  <span className="font-semibold">₹{selectedFee.tuitionFee}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Development Fee</span>
                  <span className="font-semibold">₹{selectedFee.developmentFee}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Library Fee</span>
                  <span className="font-semibold">₹{selectedFee.libraryFee}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Lab Fee</span>
                  <span className="font-semibold">₹{selectedFee.labFee}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Sports Fee</span>
                  <span className="font-semibold">₹{selectedFee.sportsFee}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Other Fee</span>
                  <span className="font-semibold">₹{selectedFee.otherFee}</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-primary font-bold text-lg">
                  <span>Total Fee</span>
                  <span className="text-accent">₹{selectedFee.totalFee}</span>
                </div>

                <button
                  onClick={() => handlePayment(selectedFee._id)}
                  className="w-full btn btn-accent mt-6"
                >
                  <FaCreditCard /> Pay Now
                </button>
              </div>
            )}
          </motion.div>

          {/* Payment History */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Payment History</h3>
            
            {payments.length > 0 ? (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-primary">
                          {payment.feeStructureId?.class || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-accent">₹{payment.amount}</span>
                      {payment.status === 'completed' && payment.receiptPath && (
                        <a
                          href={`/api/fees/receipt/${payment._id}`}
                          target="_blank"
                          className="text-accent hover:underline flex items-center gap-2"
                        >
                          <FaFileDownload /> Receipt
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600">
                <FaRupeeSign className="text-5xl mx-auto mb-4 text-gray-300" />
                <p>No payment history found</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Fees
