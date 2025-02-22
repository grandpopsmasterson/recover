'use client';

import Link from 'next/link';

export default function AlpinePage() {
 return (
   <div>
     {/* Status message section */}
     <div className="text-center space-y-5 py-10">
       <h1 className="text-header text-black font-bold mb-2">Alpine Dashboard under construction!</h1>
       <div className="flex justify-center items-center gap-4">
         <p className="text-h2 text-gray-800">Check back soon</p>
         <Link 
           href="/dashboard/ridgeline"
           className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
         >
           See projects
         </Link>
       </div>
     </div>

     {/* Grid section */}
     <div className="grid grid-cols-3 gap-6 p-6">
       {[...Array(6)].map((_, i) => (
         <div 
           key={i}
           className="aspect-[4/3] rounded-xl border-2 border-gray-300"
         />
       ))}
     </div>
   </div>
 );
}