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
    const buttonStyles = "bg-blue-400 w-full py-2 font-sans text-white rounded-md hover:bg-blue-500 transition-all duration-200"
    const thumbnailStyles = "aspect-[1] object-cover rounded-md"

    return (
        <div className="grid grid-cols-[auto_0.5fr_1.5fr_1fr] grid-flow-col gap-3 p-3 w-full m-2 border-2 relative">
            {/* Main Image dictates height */}
            <div className="row-span-2">
                <Image
                    alt="house picture"
                    className="w-auto h-auto object-cover rounded-md" // removed constraining classes
                    src={houseImage || defaultImage}
                    width={350}
                />
            </div>
            <div className="col-start-2 grid grid-rows-[auto_auto] gap-2">
                <div className="grid grid-cols-2 gap-2">
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
                </div>
                <div className="self-start">
                    <button className={buttonStyles}>
                        See Photos
                    </button>
                </div>
            </div>
            <div className="col-start-4 row-start-1 w-full absolute top-2 right-2">
                <AssignUserBtn projectId={projectId} />
            </div>
            <div className="col-start-4 row-start-2 space-y-2">
                <button className="border-2 border-gray-300 shadowsm rounded-lg w-full py-3 font-sans ">
                    Continue progress
                </button>
                
            </div>
        </div>
    )
}