import React from 'react'
import { LongProject } from '@/types/project'
import { Image } from '@heroui/react'
import { useParams } from 'next/navigation'
//import AssignUserBtn from '../buttons/AssignButton'
import PhotoStack from '../buttons/PhotoStack'

export const ProjectBar = ({clientName, houseImage, streetAddress, /*city, state, stage */ }: LongProject["details"]) => {

    const params = useParams();
        const projectId = params.id as string;
    
        if (!projectId) {
            return <div>Loading...</div>;
        }

    
    

    const defaultImage = '/house1.png';
    const thumbnailStyles = "aspect-[1] object-cover"

    return (
        <div className="grid grid-cols-[25vw,25vw,auto] gap-4 p-6 bg-white max-w-full m-4 shadow-[0_5px_15px_rgba(0,0,0,0.08)] border-1 rounded-2xl relative">
            {/* first column, house photos grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="col-start-1">
                    <Image
                        alt="house picture"
                        className="aspect-[3/2] object-cover"
                        src={houseImage || defaultImage}
                    />
                </div>
                <div className="col-start-2 pr-6">
                    <div className="grid grid-cols-2 gap-3">
                        <Image
                            className={thumbnailStyles}
                            alt="house picture"
                            src={houseImage || defaultImage}
                        />
                        <PhotoStack 
                            className={thumbnailStyles}
                            count={12} 
                            navigationPath="./photos"
                        />
                        <button className="col-span-2 border-blue-400 border-1 w-full py-3 font-sans rounded-xl hover:bg-blue-200 transition-all duration-200">
                            See Photos
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-h1 font-thin">
                <span className="text-h1">{streetAddress}</span><br />
                <span className="text-h2">{clientName}</span>
            </div>

            <div className="col-start-3 flex flex-row gap-5 items-start">
            
                {/* <AssignUserBtn projectId={projectId} className="w-1/2"/> */}
                <button className="border-1 border-blue-400 text-gray-500 shadow-sm rounded-xl px-6 py-2 font-sans ">
                    Continue progress
                </button>
                
                
            </div>
        </div>
    )
}