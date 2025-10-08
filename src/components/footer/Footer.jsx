import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#8B7355] via-[#A0826D] to-[#8B7355] text-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="The Powder Legacy" className="h-8 w-8 object-contain" />
              <div className="text-2xl font-bold text-white">
                The Powder Legacy
              </div>
            </div>
            <p className="text-[#F5F5DC]/90 text-sm">
              Carrying forward the timeless wisdom of traditional self-care, reimagined with natural, chemical-free ingredients.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/thepowderlegacystore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5F5DC] hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/thepowderlegacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5F5DC] hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-[#F5F5DC] hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-[#F5F5DC] hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/shop" className="text-[#F5F5DC] hover:text-white transition-colors">Shop All Products</Link>
              </li>
              <li>
                <Link to="/shop/skin-care" className="text-[#F5F5DC] hover:text-white transition-colors">Skin Care</Link>
              </li>
              <li>
                <Link to="/shop/hair-care" className="text-[#F5F5DC] hover:text-white transition-colors">Hair Care</Link>
              </li>
              <li>
                <Link to="/shop/oral-care" className="text-[#F5F5DC] hover:text-white transition-colors">Oral Care</Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about/our-story" className="text-[#F5F5DC] hover:text-white transition-colors">Our Brand Story</Link>
              </li>
              <li>
                <Link to="/about/manufacturing" className="text-[#F5F5DC] hover:text-white transition-colors">Manufacturing & Quality</Link>
              </li>
              <li>
                <Link to="/about/sustainability" className="text-[#F5F5DC] hover:text-white transition-colors">Sustainability Promise</Link>
              </li>
              <li>
                <Link to="/about/ingredients" className="text-[#F5F5DC] hover:text-white transition-colors">Our Ingredients</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#F5F5DC]" />
                <a href="mailto:contact@thepowderlegacy.in" className="text-[#F5F5DC] hover:text-white transition-colors">contact@thepowderlegacy.in</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#F5F5DC]" />
                <a href="tel:+917337334653" className="text-[#F5F5DC] hover:text-white transition-colors">+91-7337334653</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-[#F5F5DC] mt-1" />
                <div className="text-[#F5F5DC]">
                  <div>Plot No. 542, Ground Floor</div>
                  <div>Dr. Prakashrao Nagar, Annojiguda</div>
                  <div>Ghatkesar – 500088</div>
                  <div>Telangana, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#A0826D] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-[#F5F5DC]/80">
              © 2024 The Powder Legacy. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
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
