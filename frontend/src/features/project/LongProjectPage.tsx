'use client'
import Button1 from "@/components/ui/ButtonC";
import {useRouter} from "next/navigation";
import { Image, Dropdown, DropdownTrigger, AvatarGroup, Avatar, DropdownMenu, DropdownItem, User} from '@heroui/react';
import { LongProject } from "@/types/project";
import { DownArrow } from "@/components/ui/DownArrow";

export default function LongProjectPage({
    //id,
    //projectName,
    clientName,
    clientEmail,
    clientPhone,
    startDate,
    lossDate,
    streetAddress,
    city,
    state,
    zipcode,
    stage,
    projectType,
    carrier,
    assignedRoles,
    houseImage,
    }: LongProject) {

    const defaultImage = '/house1.png';
    const defaultUser = '/user-svgrepo-com.png';

    const formatDate = (dateValue?: Date | string | null) => {
        if (!dateValue) return 'Not set';
        try {
            const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
            return date.toLocaleDateString();
        } catch (error) {
            return `'Invalid date', ${error}`;
        }
    };

    return (
        <div className="w-full" style={{marginLeft: '3vw', marginRight: '3vw'}}>
            
                <div className="bg-[#09090B] rounded-md mb-4"
                        >


                    {/* Dates Section */}
                    <div className="mb-6">
                        <h2 className="text-green-500 text-lg font-semibold mb-2">Important Dates</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-400">Start Date</p>
                                <p className="text-sm">{formatDate(startDate)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Loss Date</p>
                                <p className="text-sm">{formatDate(lossDate)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div>
                        <h2 className="text-green-500 text-lg font-semibold mb-2">Project Team</h2>
                        <div className="flex justify-between items-center">
                            <AvatarGroup 
                                className="flex items-center" 
                                size="lg" 
                                max={4} 
                                radius="full" 
                                isBordered 
                                color="success"
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