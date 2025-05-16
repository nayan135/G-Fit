"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const teamCertificates = [
  {
    name: "Nayan Acharya",
    role: "Team Lead",
    image: "https://iili.io/3C9xequ.jpg",
    specialization: "Backend Development"
  },
  {
    name: "Narayan Bhusal",
    role: "Frontend Developer",
    image: "https://iili.io/3C9xNse.jpg",
  },
  {
    name: "Rabin Chudali",
    role: "Frontend Specialist",
    image: "https://iili.io/3C9xwX9.jpg",
  },
  {
    name: "Dilip Acharya",
    role: "Backend Dev",
    image: "https://iili.io/3C9xk0b.jpg",

  },
  {
    name: "Shasank Shrestha",
    role: "Design/ UI/UX",
    image: "https://iili.io/3C9xSdx.jpg",
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-0.5">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.05,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="bg-black/10 dark:bg-white/10"
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black dark:text-white">G-FIT</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Transform your body. Transform your life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link href="/login">
              <button className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Start Now
              </button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-3 border border-black text-black dark:border-white dark:text-white rounded-full font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 2,
                ease: "linear",
              }}
              className="absolute h-px bg-gradient-to-r from-transparent via-black/30 dark:via-white/30 to-transparent"
              style={{
                top: `${30 + i * 20}%`,
                width: "100%",
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className="text-4xl font-bold mb-2 text-black dark:text-white">10+</div>
            <div className="text-gray-600 dark:text-gray-400">Active Users</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center p-8 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className="text-4xl font-bold mb-2 text-black dark:text-white">3+</div>
            <div className="text-gray-600 dark:text-gray-400">Workout Plans</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center p-8 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className="text-4xl font-bold mb-2 text-black dark:text-white">95%</div>
            <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
          </motion.div>
        </div>      </section>

      {/* Team Certificates Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0a] dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-6 text-black dark:text-white"
          >
            Meet Our Award-Winning Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto"
          >
            Each team member was recognized for their exceptional contributions at Steel City Hacks 2025
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamCertificates.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={member.image}
                      alt={`${member.name}'s Certificate`}
                      width={300}
                      height={200}
                      className="object-contain p-4"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                   
                    <div className="mt-2 inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Steel City Hacks 2025
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Together, our team's diverse expertise earned us the "Best Technical Complexity" award at Steel City Hacks 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black dark:text-white">
            Ready to start your journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of others who have already transformed their lives with G-Fit.
          </p>
          <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} 
            className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium inline-flex items-center group"
          >
            
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

