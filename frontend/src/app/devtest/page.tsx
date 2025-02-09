"use client"
import Button1 from "@/components/ui/ButtonC";
//import {useRouter} from "next/navigation"

import { Card, CardHeader, CardBody, CardFooter, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, AvatarGroup, Avatar, User} from '@heroui/react'
//import './../../images/house1.png';
// const recoverGreen = "#4ade80";



export default function devtest() {

  const DownArrow = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule='evenodd' d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
        fill="#22C55E"
        >

        </path>
      </svg>
    )
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
    <div>
      <Card className="bg-[#090F21] flex flex-col justify-center items-center">
        <CardHeader>
          <Image alt='house picture' className="rounded-md" src="./house1.png" width={225} />
        </CardHeader>
        <CardBody className="flex flex-col bg-[#09090B] h-full w-[90%] mb-2 rounded-md">
          <span className="absolute top-2 right-2 pt-1 text-xs text-gray-400">PENDING SALE</span>
          <p className="text-xs">123 Normal Lane</p>
          <p className="text-xs">Scottsdale, AZ</p>
          <p className="text-xs text-green-500">Lee, Nathan</p> <br/>
        <CardFooter className=" w-full p-0 rounded-b-sm flex justify-between">
          <div className="overflow-hidden">
          <Button1 color='success' className="!bg-green-500 font-semibold h-6 rounded-sm rounded-b-sm">View</Button1>
          </div>
          <div className="flex rounded-md">
          <Dropdown>
          <DropdownTrigger>
          <div className="flex items-center gap-1 pr-1">
              <AvatarGroup className=" flex items-center scale-75 -mr-3" size="sm" max={3} radius="full" isBordered color="success"
              >
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
              </AvatarGroup>
              <div className="-mr-2">
              <DownArrow />
              </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" style={{background: '#09090b', border: '5px solid #090f21', borderRadius: '5px'}}>
              <DropdownItem key="user1">
                <User
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  description="Project Manager"
                  name="Martin Manager"
                />
              </DropdownItem>
              <DropdownItem key="user2">
                <User
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
                  }}
                  description="Lead Technician"
                  name="Tommy Technician"
                />
              </DropdownItem>
              <DropdownItem key="user3">
                <User
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                  }}
                  description="Technician"
                  name="Timmy Technician"
                />
              </DropdownItem>
              <DropdownItem key="user4">
                <User
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026708c",
                  }}
                  description="Client"
                  name="Cynthia Client"
                />
              </DropdownItem>
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