'use client'
import Button1 from "@/components/ui/ButtonC";
import {useRouter} from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter, Image, Dropdown, DropdownTrigger, AvatarGroup, Avatar, DropdownMenu, DropdownItem, User} from '@heroui/react';
import { LongProject } from "@/types/project";
import { DownArrow } from "@/components/ui/DownArrow";

export default function LongProjectCard({
   id,
   projectName,
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

   const router = useRouter();
   const defaultImage = '/house1.png';
   const defaultUser = '/user-svgrepo-com.png';

   const handleBack = () => {
       router.push('/dashboard');
   };

   const formatDate = (dateValue?: Date | string | null) => {
        if (!dateValue) return 'Not set';
        try {
            const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
            return date.toLocaleDateString();
        } catch (error) {
            return 'Invalid date';
        }
    };

   return (
       <div className="w-full max-w-4xl mx-auto mt-8">
           <Button1 
               color='success' 
               className="mb-4 !bg-green-500"
               onPress={handleBack}
           >
               Back to Dashboard
           </Button1>
           
           <Card className="bg-[#090F21] flex flex-col items-center">
               <CardHeader className="w-full">
                   <div className="flex justify-between items-start w-full">
                       <Image 
                           alt='house picture'
                           className="rounded-md" 
                           src={houseImage || defaultImage} 
                           width={300}
                       />
                       <div className="text-right">
                           <span className="text-gray-400 text-sm">{stage}</span>
                           <p className="text-green-500 font-semibold mt-2">{projectType}</p>
                       </div>
                   </div>
               </CardHeader>

               <CardBody 
                    className="bg-[#09090B] w-[300px] rounded-md p-6"
                    style={{ width: '300px' }}>
                   {/* Client Info Section */}
                   <div className="mb-6">
                       <h2 className="text-green-500 text-lg font-semibold mb-2">Client Information</h2>
                       <p className="text-sm">{clientName}</p>
                       <p className="text-xs text-gray-400">{clientEmail}</p>
                       <p className="text-xs text-gray-400">{clientPhone}</p>
                   </div>

                   {/* Project Details Section */}
                   <div className="mb-6">
                       <h2 className="text-green-500 text-lg font-semibold mb-2">Project Details</h2>
                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <p className="text-xs text-gray-400">Address</p>
                               <p className="text-sm">{streetAddress}</p>
                               <p className="text-sm">{`${city}, ${state} ${zipcode}`}</p>
                           </div>
                           <div>
                               <p className="text-xs text-gray-400">Insurance</p>
                               <p className="text-sm">{carrier}</p>
                           </div>
                       </div>
                   </div>

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
               </CardBody>
           </Card>
       </div>
   );
}