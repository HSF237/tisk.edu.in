import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa'

const Certificates = () => {
    const [certs, setCerts] = useState([])

    useEffect(() => {
        const localCerts = JSON.parse(localStorage.getItem("certificates")) || []
        setCerts(localCerts)
    }, [])

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-head text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-primary">School Certificates</h2>
                    <div className="divider mx-auto w-24 h-1 bg-accent my-4"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Official safety and compliance certificates of TISK English Medium School.
                    </p>
                </motion.div>

                {certs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certs.map((cert) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent">
                                    <FaCertificate size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-4">{cert.type}</h3>
                                <p className="text-gray-500 mb-6 text-sm">
                                    Click the button below to view or download the official document.
                                </p>
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
                                >
                                    <FaExternalLinkAlt /> View Document
                                </a>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
                        <p className="text-gray-400 text-lg">No certificates uploaded yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Certificates
