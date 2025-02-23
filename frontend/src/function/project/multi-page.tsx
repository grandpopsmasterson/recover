'use client'
import { Dropdown, DropdownTrigger, AvatarGroup, Avatar, DropdownMenu, DropdownItem, User, Tabs, Tab, divider} from '@heroui/react';
import { LongProject } from "@/types/project";
import { DownArrow } from "@/components/ui/icons/DownArrow";
import Details from './projectContent/Details';

export default function MultiApp({
    //id,
    //projectName,
    // clientName,
    // clientEmail,
    // clientPhone,
    startDate,
    lossDate,
    // streetAddress,
    // city,
    // state,
    // zipcode,
    // stage,
    // projectType,
    // carrier,
    assignedRoles,
    }: LongProject) {

    // const defaultImage = '/house1.png';
    const defaultUser = './user-svgrepo-com.png';

    const tabs: {id: string, label: string}[] = [
        {id: 'estimate', label: 'Estimate'},
        {id: 'timeline', label: 'Timeline'},
        {id: 'compliance', label: 'Compliance'},
        {id: 'work orders', label: 'Work Orders'},
        {id: 'progress', label: 'Progress'},
        {id: 'reporting', label: 'Reporting'},
        {id: 'materials', label: 'Materials'},
        {id: 'team', label: 'Team'}
    ];

    const content = (id: string) => {
        switch (id) {
            case "estimate":
                return ( <div>Estimates</div> )
            case 'timeline':
                return ( <div>Timeline</div> )
            case 'compliance':
                return ( <Details startDate={startDate} lossDate={lossDate} /> ) // TODO LAZY LOADING FOR ALL OF THESE
            case 'work orders':
                return ( <div>Progress Content</div> )
            case 'progress':
                return ( <div>Progress Content</div> )
            case 'reporting':
                return ( <div>Contact Content</div> )
            case 'materials':
                return ( <div>Materials Content</div> )
            
        }
    }

    

    return (
        <div className="h-[30vw] rounded-md border-2 border-purple-500">
            
                <div className="rounded-md border-2" >
                    <div className='flex flex-col'>
                        <Tabs items={tabs} className='justify-center' color='primary'>
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