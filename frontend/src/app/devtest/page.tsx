"use client"
import Button1 from "@/components/ui/ButtonC";
import {useRouter} from "next/navigation"

import { Card, CardHeader, CardBody, CardFooter, Image} from '@heroui/react'
import './../../images/house1.png';
// const recoverGreen = "#4ade80";



export default function devtest() {

  return (
    <div className="h-screen w-full flex justify-center items-center">
    <div>
      <Card className="bg-[#090F21] flex flex-col justify-center items-center">
        <CardHeader>
          <Image alt='house picture' className="rounded-md" src="./house1.png" width={225} />
        </CardHeader>
        <CardBody className="flex flex-col bg-[#09090B] h-full w-[90%] mb-2 rounded-md">
          <p className="text-xs">123 Normal Lane</p>
          <p className="text-xs">Scottsdale, AZ</p>
          <p className="text-xs text-green-500">Lee, Nathan</p> <br/><br/><br/><br/>
        <CardFooter className=" w-[90%] p-0 rounded-b-sm">
          <div className="overflow-hidden">
          <Button1 color='success' className="!bg-green-500 font-semibold h-6 w-10 rounded-sm rounded-b-sm">View</Button1>
          </div>
        </CardFooter>
        </CardBody>
      </Card>
    </div>
    </div>
  );
}