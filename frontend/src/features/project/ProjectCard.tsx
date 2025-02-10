'use client'
import { Card, CardHeader, CardBody, CardFooter, Image, Dropdown, DropdownTrigger, AvatarGroup, Avatar, DropdownMenu, DropdownItem, User } from '@heroui/react'
import Button1 from "@/components/ui/ButtonC";
import { ShortProject } from "@/types/project";

const DownArrow = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path 
        fillRule="evenodd" 
        clipRule='evenodd' 
        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
        fill="#22C55E"
      />
    </svg>
  )
}

export default function ProjectCard({
  streetAddress,
  city,
  state,
  clientName,
  assignedRoles,
  projectStage,
  houseImage,
}: ShortProject) {
  const defaultImage = '/house1.png';
  const defaultUser = '/user-svgrepo-com.png';

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div>
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
            <span className="absolute top-2 right-2 pt-1 text-xs text-gray-400">{projectStage}</span>
            <p className="text-xs">{streetAddress}</p>
            <p className="text-xs">{`${city}, ${state}`}</p>
            <p className="text-xs text-green-500">{clientName}</p> <br/>
            <CardFooter className="w-full p-0 rounded-b-sm flex justify-between">
              <div className="overflow-hidden">
                <Button1 color='success' className="!bg-green-500 font-semibold h-6 rounded-sm rounded-b-sm">View</Button1>
              </div>
              <div className="flex rounded-md">
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center gap-1 pr-1">
                      <AvatarGroup 
                        className="flex items-center scale-75 -mr-3" 
                        size="sm" 
                        max={3} 
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
    </div>
  );
}