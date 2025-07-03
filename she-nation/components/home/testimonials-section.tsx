"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "",
    role: "",
    image: "",
    content:
      "",
    rating: 5,
  },
  {
    name: "",
    role: "",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "",
    rating: 5,
  },
  {
    name: "",
    role: "",
    image: "",
    content:
      "",
    rating: 5,
  },
  {
    name: "",
    role: "",
    image: "",
    content:
      "",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-poppins gradient-text mb-4">Success Stories That Inspire</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from women who have transformed their careers and lives through our platform
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-purple-400 mb-6 mx-auto" />

            <div className="text-center">
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </p>

              <div className="flex items-center justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-purple-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
