'use client'
import Button1 from "@/components/ui/ButtonC";
import {useRouter} from "next/navigation"
import { Card, CardHeader, CardBody, CardFooter, Image, Dropdown, DropdownTrigger, AvatarGroup, Avatar, DropdownMenu, DropdownItem, User} from '@heroui/react'
import { ShortProject } from "@/types/project";
import { DownArrow } from "@/components/ui/DownArrow";
//import './../../images/house1.png';
// const recoverGreen = "#4ade80";



export default function DashboardCard({
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
    const defaultUser = '/user-svgrepo-com.png'
    console.log('Card props:', { streetAddress, clientName, assignedRoles, stage, city, state }); // Debug log

    const handleViewProject = () => {
        router.push(`/projects/${id}`);  // Navigate to project detail page
    };

    return (
        <div className="w-full">
            <Card className="bg-[#090F21] flex flex-col justify-center items-center">
                <CardHeader>
                    <Image 
                        alt='house picture'
                        className="rounded-md" 
                        src={houseImage || defaultImage} 
                        width={225} 
                    />
                </CardHeader>
                <CardBody className="flex flex-col bg-[#09090B] h-full w-[90%] mb-2 rounded-md">
                <span className="absolute top-2 right-2 pt-1 text-xs text-gray-400">{stage}</span>
                    <p className="text-xs">{streetAddress}</p>
                    {/* <p className="text-xs">{`${city}, ${state}`}</p> */}
                    <p className="text-xs text-green-500">{clientName}</p> <br/><br/><br/><br/>
                    <CardFooter className=" w-[90%] p-0 rounded-b-sm">
                        <div className="overflow-hidden">
                            <Button1 
                                color='success' 
                                className="!bg-green-500 font-semibold h-6 w-10 rounded-sm rounded-b-sm"
                                onPress={handleViewProject}
                                >View</Button1>
                        </div>
                        <div className="flex rounded-md">
                        <Dropdown>
                        <DropdownTrigger>
                        <div className="flex items-center gap-1 pr-1">
                            <AvatarGroup className=" flex items-center scale-75 -mr-3" size="sm" max={3} radius="full" isBordered color="success"
                            >
                                {assignedRoles.map((user) => (
                                    <Avatar key={user.id.toString()} src={user.profileImageUrl || defaultUser} />
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
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    );
}