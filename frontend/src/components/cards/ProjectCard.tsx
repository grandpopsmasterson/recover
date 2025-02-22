'use client'
import Button1 from "@/components/buttons/ButtonC";
import {useRouter} from "next/navigation"
import { Card, CardHeader, CardBody, CardFooter, Image, Dropdown, DropdownTrigger, AvatarGroup, Avatar, DropdownMenu, DropdownItem, User} from '@heroui/react'
import { ShortProject } from "@/types/project";
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
    houseImage,
}: ShortProject) {

    const router = useRouter();
    const defaultImage = '/house1.png';
    const defaultUser = './user-svgrepo-com.png'
    //console.log('Card props:', { streetAddress, clientName, assignedRoles, stage, city, state }); // Debug log

    const handleViewProject = () => {
        router.push(`/dashboard/frontline/projects/${id}`);  // Navigate to project detail page
    };

    return (
        <div className="w-full">
            <Card className="bg-[#c8c5cb] flex flex-col justify-center items-center">
                <CardHeader>
                    <Image 
                        alt='house picture'
                        className="rounded-md" 
                        src={houseImage || defaultImage} 
                        width={225} 
                    />
                </CardHeader>
                <CardBody className="flex flex-col bg-recovernavy h-full w-[90%] mb-2 rounded-md">
                <span className="absolute top-2 right-2 pt-1 text-xs text-gray-100">{stage}</span>
                    <p className="text-xs text-white">{streetAddress}</p>
                    <p className="text-xs text-white">{`${city}, ${state}`}</p>
                    <p className="text-xs text-purple-500">{clientName}</p> <br/><br/>
                    <CardFooter className=" w-full p-0 rounded-b-sm flex justify-between">
                        <div className="overflow-hidden">
                            <Button1 
                                color='success' 
                                className="!bg-purple-500 font-semibold h-6 w-10 rounded-sm rounded-b-sm"
                                onPress={handleViewProject}
                                >View</Button1>
                        </div>
                        <div className="flex rounded-md">
                        <Dropdown>
                        <DropdownTrigger>
                        <div className="flex items-center gap-1 pr-1">
                            <AvatarGroup className=" flex items-center scale-75" size="sm" max={3} radius="full" isBordered color="secondary"
                            >
                                {assignedRoles.map((user) => (
                                    <Avatar key={user.id.toString()} src={defaultUser || user.profileImageUrl} />
                                ))}
                            </AvatarGroup>
                            <div className="-mr-2">
                            <DownArrow />
                            </div>
                            </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" style={{background: '#09090b', border: '5px solid #090f21', borderRadius: '5px'}}>
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
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    );
}