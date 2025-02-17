import HomeNavBar from '@/components/ui/HomeNavBar';
import * as React from "react";

import { HeroUIProvider } from '@heroui/react';

export default function RootPage() {
  return (
    <HeroUIProvider>
      <div className="min-h-screen">
        <nav className="fixed top-1 left-0 px-4 w-full shadow-lg">
          <HomeNavBar />
        </nav>
        <div className="h-[clamp(35rem,50vw+10rem,60rem)] flex flex-col items-center justify-center rounded-2xl m-2 p-2 px-3 bg-recovernavy">
          
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center w-[75vw]">
              <h1 className="text-big-header text-white font-extrabold">
                Handle your business with Recover.
              </h1>
              <h1 className="text-h1 text-gray-500 mb-8">
                Effortlessly manage your projects in one place
              </h1>
              <button className="bg-purple-500 font-bold text-h1 px-6 py-2 rounded-xl hover:bg-secondary ease-in-out transition-all duration-300">
                Request a Demo
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="flex-1 py-10 px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full text-center">
              
            </div>
          </section>
        </main>
      </div>
    </HeroUIProvider>
  );
}
