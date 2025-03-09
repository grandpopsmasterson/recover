'use client'
import {  Tabs, Tab } from '@heroui/react';
import { Project } from "@/types/project";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MultiApp({
    //id,
    //projectName,
    // clientName,
    // clientEmail,
    // clientPhone,
    //startDate,
    //lossDate,
    // streetAddress,
    // city,
    // state,
    // zipcode,
    // stage,
    // projectType,
    // carrier,
    //assignedRoles,
    }: Project) {
        const router = useRouter();

    // const defaultImage = '/house1.png';
    // const defaultUser = './user-svgrepo-com.png';

    const tabs: {id: string, label: string}[] = [
        {id: 'estimate', label: 'Estimate'},
        {id: 'timeline', label: 'Timeline'},
        {id: 'compliance', label: 'Compliance'},
        {id: 'workOrders', label: 'Work Orders'},
        {id: 'progress', label: 'Progress'},
        {id: 'reporting', label: 'Reporting'},
        {id: 'materials', label: 'Materials'},
        {id: 'team', label: 'Team'}
    ];

    const content = (id: string) => {
        switch (id) {
            case "estimate":
                return ( 
                    <div className="h-[35rem] relative">
                        <div className="aspect-[2/1] relative p-4">
                            <Image 
                                src="/mockup_room.jpg" 
                                alt="Description" 
                                className="w-full h-full object-cover rounded-lg" 
                                width={500} 
                                height={300}
                            />
                            <button onClick={() => router.push(`./${id}/estimate-builder`)}className="absolute w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 text-black p-4 rounded-lg font-thin text-h2 hover:bg-green-300 transition-colors">
                                Begin Estimating
                            </button>
                        </div>
                    </div>
                )
            case 'timeline':
                return ( 
                    <div className="h-[45rem] relative">
                        <Image 
                            src="/jiraroadmap.jpg" 
                            alt="Description" 
                            className="w-full h-full rounded-lg" 
                            fill
                        />
                    </div>
                )
            case 'compliance':
                return ( <div>Compliance Content</div> ) // TODO LAZY LOADING FOR ALL OF THESE
            case 'workOrders':
                return ( <div>Work Orders Content</div> )
            case 'progress':
                return ( <div>Progress Content</div> )
            case 'reporting':
                return ( <div>Reporting Content</div> )
            case 'materials':
                return ( <div>Materials Content</div> )
            
        }
    }

    

    return (
        <div className="max-w-full rounded-xl m-4 bg-white shadow-sm">
            
                <div >
                    <div className='flex flex-col'>
                        <Tabs items={tabs} variant="bordered" className='justify-center' color="primary" fullWidth={true}>
                            {(item) => (
                                <Tab key={item.id} title={item.label}>
                                    {content(item.id)}
                                </Tab>
                            )}
                        </Tabs>
                    </div>
                </div>
            </div>
    );
}