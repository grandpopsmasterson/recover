'use client'
import Button1 from "@/components/buttons/ButtonC";
import {useRouter} from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter, Image, Dropdown, DropdownTrigger, AvatarGroup, Avatar, DropdownMenu, DropdownItem, User} from '@heroui/react'
import { Project } from "@/types/project";
import { DownArrow } from "@/components/ui/icons/DownArrow";
//import './../../images/house1.png';
// const recoverGreen = "#4ade80";

export default function ProjectCard({
    id,
    streetAddress,
    clientName,
    assignedRoles,
    stage,
    city = '',
    state = '',
    houseImageUrl,
}: Project) {

    const router = useRouter();
    const defaultImage = '/house1.png';
    const defaultUser = './user-svgrepo-com.png'
    
    const handleViewProject = () => {
        router.push(`/dashboard/frontline/projects/${id}`);  // Navigate to project detail page
    };

    return (
        <div>
            <Card className="bg-white flex flex-col justify-center items-center p-3 space-y-3" radius="sm">
                <CardHeader className="w-full p-0 m-0">
                    <Image 
                        alt='house picture'
                        className="w-full h-[12vw] object-cover" 
                        src={houseImageUrl || defaultImage} 
                        radius="md"
                    />
                </CardHeader>
                <CardBody className="flex flex-col bg-gray-100 h-full w-full rounded-md">
                    <span className="absolute top-2 right-2 pt-1 text-xs text-gray-100">{stage}</span>
                    <p className="text-xs text-white">{streetAddress}</p>
                    <p className="text-xs text-white">{`${city}, ${state}`}</p>
                    <p className="text-xs text-purple-500">{clientName}</p> <br/><br/>
                    <CardFooter className="w-full p-0 rounded-b-sm flex justify-between">
                        <div className="overflow-hidden">
                            <Button1 
                                color='success' 
                                className="border-white font-semibold h-6 w-10 rounded-sm rounded-b-sm"
                                onPress={handleViewProject}
                            >
                                View
                            </Button1>
                        </div>
                        {assignedRoles && assignedRoles.length > 0 && (
                            <div className="flex rounded-md">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <div className="flex items-center gap-1 pr-1">
                                            <AvatarGroup 
                                                className="flex items-center scale-75" 
                                                size="sm" 
                                                max={3} 
                                                radius="full" 
                                                isBordered 
                                                color="secondary"
                                            >
                                                {assignedRoles.map((user) => (
                                                    <Avatar 
                                                        key={user.id.toString()} 
                                                        src={defaultUser || user.profileImageUrl} 
                                                    />
                                                ))}
                                            </AvatarGroup>
                                            <div className="-mr-2">
                                                <DownArrow />
                                            </div>
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
                                                        src: defaultUser || user.profileImageUrl,
                                                    }}
                                                    description={user.projectRole}
                                                    name={user.shortName}
                                                />
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        )}
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    );
}