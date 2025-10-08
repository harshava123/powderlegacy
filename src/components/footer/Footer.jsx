import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#8B7355] via-[#A0826D] to-[#8B7355] text-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Info */}
          <div className="space-y-3 md:order-2 ">
            <h3 className="text-base sm:text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#F5F5DC] flex-shrink-0" />
                <a href="mailto:contact@thepowderlegacy.in" className="text-[#F5F5DC] hover:text-white transition-colors truncate">contact@thepowderlegacy.in</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#F5F5DC] flex-shrink-0" />
                <a href="tel:+917093121689" className="text-[#F5F5DC] hover:text-white transition-colors">+91-7337334653</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#F5F5DC] mt-0.5 flex-shrink-0" />
                <div className="text-[#F5F5DC]">
                  <div>Plot No. 542, Ground Floor, Dr. Prakashrao Nagar</div>
                  <div>Annojiguda, Ghatkesar – 500088, Telangana, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-3 md:order-1">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="The Powder Legacy" className="h-6 w-6 sm:h-8 sm:w-8 object-contain" />
              <div className="text-lg sm:text-xl font-bold text-white">
                The Powder Legacy
              </div>
            </div>
            <p className="text-[#F5F5DC]/90 text-xs sm:text-sm">
              Carrying forward the timeless wisdom of traditional self-care, reimagined with natural, chemical-free ingredients.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/thepowderlegacystore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5F5DC] hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/thepowderlegacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5F5DC] hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#A0826D] mt-6 pt-4 sm:mt-8 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-[#F5F5DC]/80">
              © 2024 The Powder Legacy. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <Link to="/privacy" className="text-[#F5F5DC]/90 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-[#F5F5DC]/90 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/shipping" className="text-[#F5F5DC]/90 hover:text-white transition-colors">Shipping Info</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
