import { LongProject } from '@/types/project'
import React from 'react'
import { Image } from '@heroui/react'
import Button1 from '@/components/ui/ButtonC';

const ProjectBar = ({clientName, clientEmail, clientPhone, houseImage, zipcode, streetAddress, city, state, stage, projectType }: LongProject) => {

    const defaultImage = '/house1.png';

    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-4  w-full pt-4" style={{ height: '220px',  gridTemplateRows: '2fr 1.5fr 2fr' , backgroundColor: '#090f21'}}>
                        <div className=" col-span-1 flex justify-center items-center" style={{ gridRow: '1/4'}}>
                            <Image 
                                alt='house picture'
                                className="rounded-lg" 
                                src={houseImage || defaultImage} 
                                width={350}
                            />
                        </div>
                        <div className="col-span-1 row-span-1 w-full h-auto">
                            <p className="text-gray-400">{streetAddress}</p>
                            <p className="text-gray-400">{`${city}, ${state} ${zipcode}`}</p>
                        </div>

                        {/* Spacing Div -- possibly flags */}
                        <div className="flex justify-center">
                        <div className="bg-[#090F21] " style={{width: '75%'}}></div>
                        </div>

                        <div className="col-span-1 row-span-1">
                            <span className="text-gray-400 text-sm">{stage}</span>
                            <p className="text-green-500 font-semibold mt-2">{projectType}</p>
                        </div>

                        <div className='col-start-2 row-start-2' >
                            <p className="text-gray-400">{clientName}</p>
                            <p className="text-gray-400">{clientPhone}</p>    
                            <p className="text-gray-400">{clientEmail}</p>    
                        </div> 
                        {/* Spacing Empty Divs */}
                        <div className='col-span-1 row-start-3' /> 
                        <div className='col-span-1 row-start-3' /> 

                        <div className="!col-start-4 col-span-1 row-start-3 flex justify-end items-center">
                            <Button1 className="!bg-green-500 font-semibold w-full h-full text-2xl">Continue progress</Button1>
                        </div>
                    </div>
    )
}

export default ProjectBar
