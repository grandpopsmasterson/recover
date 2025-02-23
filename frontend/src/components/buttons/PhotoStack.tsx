import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PhotoStackProps {
  count: number
  navigationPath: string  // Path to navigate to when clicked
  className?: string
}

const PhotoStack = ({ count, navigationPath, className = '' }: PhotoStackProps) => {
  const router = useRouter()

  const handlePress = () => {
    router.push(navigationPath)
  }

  return (
    <button
        onClick={handlePress}
        className="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg aspect-square"
        >
        <Plus className="h-5 w-5 text-gray-300 mb-2"/>
        <span className="text-gray-300 text-lg font-medium">
            +{count} more
        </span>
    </button>
  )
}

export default PhotoStack