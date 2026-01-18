import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLaptopCode, FaUsers, FaShieldAlt, FaBook, FaMedal, FaHandshake, FaStar } from 'react-icons/fa'

const Home = () => {
  const features = [
    { icon: FaLaptopCode, title: 'Digital Learning', desc: 'Interactive smart boards and modern digital tools for enhanced classroom experience.' },
    { icon: FaUsers, title: 'Expert Faculty', desc: 'Dedicated and experienced teachers committed to student excellence.' },
    { icon: FaShieldAlt, title: 'Safe Campus', desc: 'Secure transport, medical support, and comprehensive safety measures.' },
    { icon: FaBook, title: 'Rich Curriculum', desc: 'CBSE-affiliated with comprehensive academics and co-curricular activities.' },
    { icon: FaMedal, title: 'Award Winning', desc: 'Recognized institution with consistent academic excellence.' },
    { icon: FaHandshake, title: 'Community Focused', desc: 'Strong parent-school partnership and holistic development.' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section with Video Background */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden rounded-b-[35px] mb-20 shadow-2xl">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/85 z-10"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-accent/15 backdrop-blur-sm px-5 py-2 rounded-full border border-accent mb-6"
          >
            <FaStar className="text-accent-light" />
            <span className="text-accent-light font-semibold">CBSE Affiliated: 931267</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Welcome to the World of Education
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            TISK English Medium School. A legacy of excellence in Kannur since 1988. 
            Empowering students with world-class education and holistic development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/admissions" className="btn btn-gold">
              <FaStar /> Apply for Admission
            </Link>
            <Link to="/fees" className="btn btn-primary">
              Pay Fees
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-head"
        >
          <h2>Why Choose TISK?</h2>
          <div className="divider"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card group"
            >
              <feature.icon className="text-5xl text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">1988</div>
              <div className="text-gray-300">Established</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">Nursery-X</div>
              <div className="text-gray-300">Classes</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">CBSE</div>
              <div className="text-gray-300">Affiliated</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">35+</div>
              <div className="text-gray-300">Years</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

