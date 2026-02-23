import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const AdminHidden = () => {
  const [galleryLink, setGalleryLink] = useState('')
  const [tcLink, setTCLink] = useState('')
  const [certLink, setCertLink] = useState('')
  const [certType, setCertType] = useState('Fire Safety Certificate')

  const addGallery = () => {
    if (!galleryLink) return toast.error('Please enter a link')
    let gallery = JSON.parse(localStorage.getItem("gallery")) || []
    gallery.push({ id: Date.now(), link: galleryLink })
    localStorage.setItem("gallery", JSON.stringify(gallery))
    setGalleryLink('')
    toast.success("Gallery Image Added Locally")
  }

  const addTC = () => {
    if (!tcLink) return toast.error('Please enter a link')
    let tc = JSON.parse(localStorage.getItem("tc")) || []
    tc.push({ id: Date.now(), link: tcLink })
    localStorage.setItem("tc", JSON.stringify(tc))
    setTCLink('')
    toast.success("TC File Added Locally")
  }

  const addCertificate = () => {
    if (!certLink) return toast.error('Please enter a link')
    let certs = JSON.parse(localStorage.getItem("certificates")) || []
    certs.push({ id: Date.now(), type: certType, link: certLink })
    localStorage.setItem("certificates", JSON.stringify(certs))
    setCertLink('')
    toast.success("Certificate Added Locally")
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-primary">Secret Staff Admin</h1>
            <p className="text-gray-500 mt-2">Upload Google Drive links for website updates</p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4 text-left">
              <p className="text-amber-700 text-sm">
                <strong>Note:</strong> Since this is the "Easy Method", these links are stored in your browser's local storage. 
                To make them visible to everyone, you will need to sync these to the global database later.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Gallery Section */}
            <section className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📸 Add Gallery Image
              </h2>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={galleryLink}
                  onChange={(e) => setGalleryLink(e.target.value)}
                  placeholder="Paste Google Drive Image Link"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                />
                <button 
                  onClick={addGallery}
                  className="bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-95"
                >
                  Add to Gallery
                </button>
              </div>
            </section>

            {/* TC Section */}
            <section className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📄 Add TC File
              </h2>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={tcLink}
                  onChange={(e) => setTCLink(e.target.value)}
                  placeholder="Paste Google Drive TC Link"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                />
                <button 
                  onClick={addTC}
                  className="bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-all active:scale-95"
                >
                  Add TC File
                </button>
              </div>
            </section>

            {/* Certificates Section */}
            <section className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📑 Add Certificate
              </h2>
              <div className="flex flex-col gap-3">
                <select 
                  value={certType}
                  onChange={(e) => setCertType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all bg-white"
                >
                  <option>Fire Safety Certificate</option>
                  <option>Ground Safety Certificate</option>
                  <option>Building Safety Certificate</option>
                  <option>Sanitation Certificate</option>
                </select>
                <input 
                  type="text" 
                  value={certLink}
                  onChange={(e) => setCertLink(e.target.value)}
                  placeholder="Paste Google Drive Certificate Link"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                />
                <button 
                  onClick={addCertificate}
                  className="bg-gold text-white py-3 rounded-xl font-semibold hover:bg-gold/90 transition-all active:scale-95"
                >
                  Add Certificate
                </button>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-sm text-gray-400 italic">
              "Easy Google Drive Method" implemented as requested.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminHidden
