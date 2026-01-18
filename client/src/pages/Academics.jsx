import { motion } from 'framer-motion'
import { FaLaptop, FaFlask, FaBook, FaFootballBall, FaChalkboardTeacher, FaTheaterMasks } from 'react-icons/fa'

const Academics = () => {
  const facilities = [
    {
      icon: FaLaptop,
      title: 'Computer Lab',
      image: 'https://picsum.photos/seed/computer_lab/400/250',
      desc: 'Advanced systems with high-speed internet, coding labs, and digital literacy programs for all students.'
    },
    {
      icon: FaFlask,
      title: 'Science Laboratory',
      image: 'https://picsum.photos/seed/science_lab/400/250',
      desc: 'Modern Physics, Chemistry, and Biology labs with experimental equipment and research facilities.'
    },
    {
      icon: FaBook,
      title: 'Digital Library',
      image: 'https://picsum.photos/seed/library/400/250',
      desc: 'Over 200+ books, journals, and digital resources to support learning and research.'
    },
    {
      icon: FaFootballBall,
      title: 'Sports Facilities',
      image: 'https://picsum.photos/seed/sports/400/250',
      desc: 'Well-maintained grounds for cricket, football, badminton, and other athletic activities.'
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Smart Classrooms',
      image: 'https://picsum.photos/seed/classroom/400/250',
      desc: 'Interactive boards, projectors, and digital learning tools for immersive education experience.'
    },
    {
      icon: FaTheaterMasks,
      title: 'Auditorium',
      image: 'https://picsum.photos/seed/auditorium/400/250',
      desc: 'Modern auditorium for assemblies, cultural programs, seminars and co-curricular events.'
    },
  ]

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-head"
        >
          <h2>Academics & Facilities</h2>
          <div className="divider"></div>
        </motion.div>

        {/* Curriculum Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-3xl font-bold text-primary mb-6">Curriculum</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-accent mb-4">CBSE Curriculum</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                We follow the Central Board of Secondary Education (CBSE) curriculum, 
                which is recognized nationwide and internationally. Our curriculum is 
                designed to provide a balanced education that promotes holistic development.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Nursery to Grade X</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Continuous and Comprehensive Evaluation (CCE)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Activity-based learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Skill development programs</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-accent mb-4">Subjects Offered</h4>
              <div className="grid grid-cols-2 gap-3">
                {['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi', 'Malayalam', 'Computer Science', 'Physical Education', 'Arts', 'Music'].map((subject) => (
                  <div key={subject} className="bg-gray-50 px-4 py-2 rounded-lg text-center font-semibold text-primary">
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden group"
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                <facility.icon className="absolute bottom-4 left-4 text-3xl text-white" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-3">{facility.title}</h4>
              <p className="text-gray-600 leading-relaxed">{facility.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Academics

