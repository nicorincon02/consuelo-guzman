// components/Navbar.tsx
import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      {/* Marca */}
      <div className="bg-white rounded-r-full rounded-bl-full px-4 py-2 flex items-center shadow-lg">
        <span className="block text-xs text-gray-600 mr-3"></span>

        {/* Link sin <a> */}
        <Link href="/" className="flex items-center">
          <Image src="/consuelo-black.png" alt="CoLabs" width={100} height={28} />
        </Link>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-full px-6 py-2 flex items-center space-x-8 shadow-lg">
        {/* Cada Link ahora recibe su className directamente */}
        <Link href="/services" className="text-gray-800 hover:text-gray-600 transition">
          Services
        </Link>
        <Link href="/about" className="text-gray-800 hover:text-gray-600 transition">
          About
        </Link>
        <Link href="/principles" className="text-gray-800 hover:text-gray-600 transition">
          Our Principles
        </Link>
        <Link href="/community" className="text-gray-800 hover:text-gray-600 transition">
          Community
        </Link>
        <Link href="/contact" className="text-gray-800 hover:text-gray-600 transition">
          Contact
        </Link>

        {/* Iconos sociales siguen siendo <a> normales */}
        <div className="flex items-center space-x-4">
          <a
            href="https://instagram.com/tu_perfil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600 transition"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://facebook.com/tu_perfil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600 transition"
          >
            <FaFacebookF size={18} />
          </a>
        </div>
      </div>
    </nav>
  )
}
