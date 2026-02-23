import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { FaTimes, FaSearchPlus } from 'react-icons/fa'

const Gallery = () => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery')
      const apiItems = response.data.data
      const localItems = JSON.parse(localStorage.getItem("gallery")) || []
      const formattedLocal = localItems.map(item => {
        let id = item.link.split("/d/")[1]?.split("/")[0]
        return {
          _id: item.id,
          filePath: `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
          title: 'Staff Upload',
          category: 'staff'
        }
      })
      setItems([...formattedLocal, ...apiItems])
    } catch (error) {
      // If API fails, use demo images + local ones
      const localItems = JSON.parse(localStorage.getItem("gallery")) || []
      const formattedLocal = localItems.map(item => {
        let id = item.link.split("/d/")[1]?.split("/")[0]
        return {
          _id: item.id,
          filePath: `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
          title: 'Staff Upload',
          category: 'staff'
        }
      })
      setItems([
        ...formattedLocal,
        { _id: '1', filePath: 'https://picsum.photos/seed/g1/800/600', title: 'Campus View', category: 'campus' },
        { _id: '2', filePath: 'https://picsum.photos/seed/g2/800/600', title: 'Sports Day', category: 'sports' },
        { _id: '3', filePath: 'https://picsum.photos/seed/g3/800/600', title: 'Science Fair', category: 'academics' },
        { _id: '4', filePath: 'https://picsum.photos/seed/g4/800/600', title: 'Cultural Event', category: 'cultural' },
        { _id: '5', filePath: 'https://picsum.photos/seed/g5/800/600', title: 'Annual Day', category: 'events' },
        { _id: '6', filePath: 'https://picsum.photos/seed/g6/800/600', title: 'Classroom', category: 'campus' },
      ])
    } finally {
      setLoading(false)
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
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-head"
        >
          <h2>Campus Gallery</h2>
          <div className="divider"></div>
          <p className="text-gray-600 mt-4 text-lg">
            Glimpse of campus life, events, and student achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.filePath}
                alt={item.title || 'Gallery Image'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FaSearchPlus className="text-white text-4xl" />
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-semibold">
                  {item.title}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.filePath}
                alt={selectedItem.title || 'Gallery Image'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white text-4xl hover:text-gold transition-colors"
              >
                <FaTimes />
              </button>
              {selectedItem.title && (
                <div className="absolute bottom-4 left-4 right-4 text-white text-xl font-semibold bg-black/50 p-4 rounded-lg">
                  {selectedItem.title}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery

