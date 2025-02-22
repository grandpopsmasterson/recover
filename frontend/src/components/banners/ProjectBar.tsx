import { LongProject } from '@/types/project'
import React from 'react'
import { Image } from '@heroui/react'
import { useParams } from 'next/navigation'
import AssignUserBtn from '../buttons/AssignButton'

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

    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-4  w-full py-4 pl-4 pr-8" style={{ height: '240px',  gridTemplateRows: '2fr 1.5fr 2fr' , backgroundColor: '#090f21'}}>
                        <div className=" col-span-1 flex justify-center items-center" style={{ gridRow: '1/4'}}>
                            <Image
                                alt='house picture'
                                className="rounded-lg -z-5"
                                src={houseImage || defaultImage}
                                width={350}
                            />
                        </div>
                        <div className="col-span-1 row-span-1 w-full h-auto">
                            <p className="text-gray-400">{streetAddress}</p>
                            <p className="text-gray-400">{`${city}, ${state} ${zipcode}`}</p>
                        </div>


                        {/* Spacing Div -- possibly flags
                        <div className="flex justify-center">
                        <div className="bg-[#090F21] " style={{width: '75%'}}></div>
                        </div> */}

                        <div className="col-span-1 row-span-1">
                            {stageProcess()}
                            <p className="text-purple-500 font-semibold mt-2">{projectType}</p>
                        </div>

                        <div className="!col-start-4 col-span-1 row-start-1 flex flex-col justify-center items-center">
                            <button className="bg-purple-500 font-semibold w-3/4 h-full text-2xl px-2 rounded-xl hover:bg-purple-700 ease-in-out transition-all duration-200">
                                Continue progress
                            </button>
                            <AssignUserBtn projectId={projectId} />
                        </div>

                        <div className='col-start-2 row-start-2' >
                            <p className="text-gray-400">{clientName}</p>
                            <p className="text-gray-400">{clientPhone}</p>    
                            <p className="text-gray-400">{clientEmail}</p>    
                        </div>
                        {/* Spacing Empty Divs */}
                        <div className='col-span-1 row-start-3' />
                        <div className='col-span-1 row-start-3' />

                    </div>
    )
}