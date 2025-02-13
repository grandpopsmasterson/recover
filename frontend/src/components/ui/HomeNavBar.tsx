'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomeNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="max-w-screen-xl w-full mx-auto px-4 py-3">
            <div className="flex justify-between px-4 items-center">
            {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img 
                    src="/logo.svg" 
                    alt="Logo" 
                    className="h-5 w-auto"
                    />
                </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 ml-12">
                {/* Who We Serve Dropdown */}
                <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-gray-600">
                    <span>Who we serve</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white hidden group-hover:block">
                    <div className="py-1">
                    <Link href="/remodelers" className="block px-4 py-2 hover:bg-gray-100">
                        <div className="font-medium">Remodelers</div>
                        <div className="text-sm text-gray-500">Scale your remodeling business profitably.</div>
                    </Link>
                    <Link href="/handyman" className="block px-4 py-2 hover:bg-gray-100">
                        <div className="font-medium">Handyman</div>
                        <div className="text-sm text-gray-500">Become the best paid handyman in your area.</div>
                    </Link>
                    </div>
                </div>
                </div>

                <Link href="/pricing" className="px-3 py-1 rounded-lg border-1 border-transparent hover:border-gray-400 transition-all duration-200">
                Pricing
                </Link>
                
                <Link href="/reviews" className="px-3 py-1 rounded-lg border-1 border-transparent hover:border-gray-400 transition-all duration-200">
                Reviews
                </Link>

                {/* Resources Dropdown */}
                <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-gray-600">
                    <span>Resources</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white hidden group-hover:block">
                    <div className="py-1">
                    <Link href="/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</Link>
                    <Link href="/help" className="block px-4 py-2 hover:bg-gray-100">Help Center</Link>
                    </div>
                </div>
                </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
                <Link 
                href="/auth/login"
                className="px-4 py-0.5 border border-emerald-400 rounded-md hover:border-emerald-950 hover:bg-cyan-500"
                >
                Login
                </Link>
                <Link 
                href="/start"
                className="px-4 py-0.5 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
                >
                Start an estimate
                </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-md p-2 hover:bg-gray-100"
                >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
                </button>
            </div>
            </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/who-we-serve"
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Who we serve
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Pricing
            </Link>
            <Link
              href="/reviews"
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Reviews
            </Link>
            <Link
              href="/resources"
              className="block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Resources
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/auth/login"
              className="block w-full px-3 py-2 text-center border rounded-md"
            >
              Login
            </Link>
            <Link
              href="/start"
              className="block w-full px-3 py-2 text-center bg-blue-600 text-white rounded-md"
            >
              Start an estimate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}