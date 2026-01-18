import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCalendarAlt, FaAward, FaUsers, FaGraduationCap } from 'react-icons/fa'

const About = () => {
  const timeline = [
    { year: '1988', event: 'School Established' },
    { year: '1995', event: 'CBSE Affiliation Granted' },
    { year: '2005', event: 'Digital Classrooms Introduced' },
    { year: '2015', event: 'New Building Inaugurated' },
    { year: '2024', event: '35+ Years of Excellence' },
  ]

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-head"
        >
          <h2>About TISK</h2>
          <div className="divider"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://picsum.photos/seed/school_front/600/400"
              alt="School Building"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-primary mb-6">A Legacy Since 1988</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              TISK English Medium School is a private, co-educational institution located in 
              Kovvapuram, Kunhimangalam, nestled in the serene surroundings of Kannur.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              <strong>Managed by:</strong> Manshau Thazkiyathi Sunniyathil Islamiya Society
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              <strong>CBSE Affiliated:</strong> Affiliation No: 931267 | <strong>EST:</strong> 1988
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our school has been a beacon of educational excellence, committed to nurturing 
              young minds and developing globally competent citizens. We blend traditional 
              values with modern pedagogical approaches.
            </p>
            <Link to="/contact" className="btn btn-gold">
              <FaArrowRight /> Enroll Today
            </Link>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <FaGraduationCap className="text-5xl text-accent mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be a leading educational institution that empowers students to achieve 
              excellence in academics, character, and life skills, preparing them to 
              be responsible global citizens.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <FaAward className="text-5xl text-accent mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide quality education through innovative teaching methods, holistic 
              development programs, and a nurturing environment that fosters creativity, 
              critical thinking, and ethical values.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-primary text-center mb-12">
            <FaCalendarAlt className="inline-block mr-3 text-accent" />
            Our Journey
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent to-gold"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="card inline-block">
                      <div className="text-2xl font-bold text-gold mb-2">{item.year}</div>
                      <div className="text-primary font-semibold">{item.event}</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-accent rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

