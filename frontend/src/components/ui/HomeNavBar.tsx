'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';

export default function HomeNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (intendedPath && intendedPath !== pathname) {
  //     router.push(intendedPath);
  //     setIntendedPath(null);
  //   }
  // }, [intendedPath, pathname, router]);

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleEstimate = () => {
    router.push('/start');
  };

  return (
    <div className="max-w-screen-xl bg-white rounded-full mx-auto m-2 py-2">
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
                <button className="flex items-center px-3 py-1 rounded-lg border-1 border-transparent text-[16px] text-black hover:border-black transition-all duration-200">
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

                <Link href="/pricing" className="px-3 py-1 rounded-lg border-1 border-transparent text-[16px] text-black hover:border-black transition-all duration-200">
                Pricing
                </Link>
                
                <Link href="/reviews" className="px-3 py-1 rounded-lg border-1 border-transparent text-[16px] text-black hover:border-black transition-all duration-200">
                Reviews
                </Link>

                {/* Resources Dropdown */}
                <div className="relative group">
                <button className="flex items-center px-3 py-1 rounded-lg border-1 border-transparent text-[16px] text-black hover:border-black transition-all duration-200">
                    <span>Resources</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white hidden group-hover:block">
                    <div className="py-1">
                    <Link href="/blog" className="block px-4 py-2 hover:border-black">Blog</Link>
                    <Link href="/help" className="block px-4 py-2 hover:bg-gray-100">Help Center</Link>
                    </div>
                </div>
                </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center text-[18px] space-x-4">
                <Button 
                onPress={handleLogin}
                type='button'
                className="px-4 border-3 !border-purple-500 text-md text-black rounded-lg hover:!border-purple-700 hover:!text-purple-800 transition-all duration-200"
                >
                login
                </Button>
                <Button 
                onPress={handleEstimate}
                className="px-4 !bg-purple-500 py-0.75 rounded-lg hover:!bg-purple-600 transition-all duration-300"
                >
                Start an Estimate
                </Button>
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
            <Button
              onPress={handleLogin}
              type='button'
              className="block w-full px-3 py-2 text-center border rounded-md"
            >
              Login
            </Button>
            <Button
              onPress={handleEstimate}
              className="block w-full px-3 py-2 text-center bg-blue-600 text-white rounded-md"
            >
              Start an estimate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}