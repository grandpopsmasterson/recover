import React from 'react'
import { LongProject } from '@/types/project'
import { Plus } from 'lucide-react'
import { Image } from '@heroui/react'
import { useParams } from 'next/navigation'
import AssignUserBtn from '../buttons/AssignButton'
import PhotoStack from '../buttons/PhotoStack'

export const ProjectBar = ({clientName, clientEmail, clientPhone, houseImage, zipcode, streetAddress, city, state, stage, projectType }: LongProject) => {

    const params = useParams();
        const projectId = params.id as string;
    
        if (!projectId) {
            return <div>Loading...</div>;
        }

    const stageProcess = () => {
        switch (stage) {
            case "PENDING_SALE":
                return (<span className="text-gray-400 text-sm">PENDING SALE</span>)
                break;
            default:
                return (<span className="text-gray-400 text-sm">Error</span>)
        }
    }
    

    const defaultImage = '/house1.png';
    const thumbnailStyles = "aspect-[1] object-cover"

    return (
        <div className="grid grid-cols-3 gap-4 p-4 max-w-full m-4 border-1 shadow-md rounded-lg">
            {/* first column, house photos grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="col-start-1">
                    <Image
                        alt="house picture"
                        className="aspect-[3/2] object-cover"
                        src={houseImage || defaultImage}
                    />
                </div>
                <div className="col-start-2 pr-10">
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
                        <button className="col-span-2 bg-blue-400 w-full py-4 font-sans text-white rounded-md hover:bg-blue-500 transition-all duration-200">
                            See Photos
                        </button>
                    </div>
                </div>
            </div>
            {/* empty middle column */}

            <div className="col-start-3 space-y-4">
                <div className="rounded-tr-lg rounded-bl-lg border-2 flex justify-start">
                    PENDING SALE
                </div>
                <AssignUserBtn projectId={projectId} />
                <button className="border-2 border-gray-200 text-gray-500 shadow-sm rounded-xl w-full py-3 font-sans ">
                    Continue progress
                </button>
                
                
            </div>
        </div>
    )
}