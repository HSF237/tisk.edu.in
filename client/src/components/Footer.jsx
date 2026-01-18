import { Link } from 'react-router-dom'
import { FaGraduationCap, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary-light text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
              <FaGraduationCap className="text-gold" />
              <span>TISK EMS</span>
            </div>
            <p className="text-gray-300 mb-4">
              Dedicated to nurturing excellence and developing globally competent citizens since 1988.
            </p>
            <p className="text-sm text-gray-400">
              Managed by Manshau Thazkiyathi Sunniyathil Islamiya Society
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/academics" className="text-gray-300 hover:text-gold transition-colors">Academics</Link></li>
              <li><Link to="/teachers" className="text-gray-300 hover:text-gold transition-colors">Faculty</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 text-gold">More</h4>
            <ul className="space-y-2">
              <li><Link to="/gallery" className="text-gray-300 hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link to="/admissions" className="text-gray-300 hover:text-gold transition-colors">Admissions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 text-gold">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gold mt-1" />
                <span className="text-gray-300 text-sm">
                  Kovvappuram, Cheruthazam Panchayath,<br />
                  near Ezhimala Railway Station,<br />
                  Kannur, Kerala – 670305
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-gold" />
                <a href="tel:+914972812349" className="text-gray-300 hover:text-gold transition-colors">
                  +91 497 281 2349
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gold" />
                <a href="mailto:tiskprincipal@yahoo.com" className="text-gray-300 hover:text-gold transition-colors">
                  tiskprincipal@yahoo.com
                </a>
              </li>
              <li className="flex items-center gap-4 mt-4">
                <a href="#" className="text-2xl hover:text-gold transition-colors"><FaFacebook /></a>
                <a href="#" className="text-2xl hover:text-gold transition-colors"><FaInstagram /></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 TISK English Medium School. All Rights Reserved. | CBSE Affiliation No: 931267</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

