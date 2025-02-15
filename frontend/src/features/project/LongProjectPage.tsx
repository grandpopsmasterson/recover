'use client'
// import Button1 from "@/components/ui/ButtonC";
// import {useRouter} from "next/navigation";
import { Dropdown, DropdownTrigger, AvatarGroup, Avatar, DropdownMenu, DropdownItem, User, Tabs, Tab, divider} from '@heroui/react';
import { LongProject } from "@/types/project";
import { DownArrow } from "@/components/ui/DownArrow";
import Details from './projectContent/Details';

export default function LongProjectPage({
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
    const defaultUser = '/user-svgrepo-com.png';

    const tabs: {id: string, label: string}[] = [
        {id: 'Flags', label: 'Flags'},
        {id: 'Timeline', label: 'Timeline'},
        {id: 'Details', label: 'Details'},
        {id: 'Progress', label: 'Progress'},
        {id: 'Contact', label: 'Contact'},
        {id: 'Estimate', label: 'Estimate'},
        {id: 'Materials', label: 'Materials'},
        {id: 'Comments', label: 'Comments'}
    ];

    const content = (id: string) => {
        switch (id) {
            case "Flags":
                return ( <div>Flags content</div> )
            case 'Timeline':
                return ( <div>Timeline Content</div> )
            case 'Details':
                return ( <Details startDate={startDate} lossDate={lossDate} /> ) // TODO LAZY LOADING FOR ALL OF THESE
            case 'Progress':
                return ( <div>Progress Content</div> )
            case 'Contact':
                return ( <div>Contact Content</div> )
            case 'Estimate':
                return ( <div>Estimate Content</div> )
            case 'Materials':
                return ( <div>Materials Content</div> )
            case 'Comments':
                return ( <div>Comments Content</div> )
            
        }
    }

    

    return (
        <div className="mx-12" >
            
                <div className="bg-[#09090B] rounded-md mb-4 pt-4" >
                <div className='flex flex-col'>
                    <Tabs items={tabs} className='justify-center' color='secondary'>
                        {(item) => (
                            <Tab key={item.id} title={item.label}>
                                {content(item.id)}
                            </Tab>
                        )}
                    </Tabs>
                </div>

                    {/* Team Section */}
                    <div>
                        <h2 className="text-purple-500 text-lg font-semibold mb-2">Project Team</h2>
                        <div className="flex justify-between items-center">
                            <AvatarGroup 
                                className="flex items-center" 
                                size="lg" 
                                max={4} 
                                radius="full" 
                                isBordered 
                                color="secondary"
                            >
                                {assignedRoles.map((user) => (
                                    <Avatar 
                                        key={user.id.toString()} 
                                        src={user.profileImageUrl || defaultUser} 
                                    />
                                ))}
                            </AvatarGroup>
                            
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="flex items-center gap-1">
                                        <p className="text-sm text-green-500">View Team</p>
                                        <DownArrow />
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu 
                                    aria-label="User Actions" 
                                    style={{
                                        background: '#09090b', 
                                        border: '5px solid #090f21', 
                                        borderRadius: '5px'
                                    }}
                                >
                                    {assignedRoles.map((user) => (
                                        <DropdownItem key={user.id.toString()}>
                                            <User 
                                                avatarProps={{
                                                    src: user.profileImageUrl || defaultUser,
                                                }}
                                                description={user.projectRole}
                                                name={user.shortName}
                                            />
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    </div>
                </div>
            
        
    );
}