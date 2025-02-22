'use client'
import { TechDash } from '@/types/texhDash';
import { useDisclosure, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';


const AddyMapper = ({number, handleOpen}: TechDash) => (
    <div className='flex-shrink-0 w-[98%] h-[15%] rounded-lg shadow-md bg-[#e5e5e6] flex items-center py-2 mb-2'  >
        <div className='mx-2 text-fluid-p1'>{number} Cherry Lane</div> 
        <Divider orientation="vertical" />
        <div className='mx-2 text-fluid-p1'>Starlight, QZ</div> 
        <Divider orientation="vertical" />
        <div className='mx-2 text-fluid-p1'>Mitigation</div> 
        <Divider orientation="vertical" />  
        <Button className='ml-auto mr-4' color='secondary' key={number} onPress={handleOpen} variant='ghost'>Check In</Button>
    </div>
);

export default function Assigned() {

    const [showTopShadow, setShowTopShadow] = useState<boolean>(false);
    const [showBottomShadow, setShowBottomShadow] = useState<boolean>(false);
    const scrollRef = useRef<HTMLDivElement>(null)

    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter();

    const handleOpen = () => {
        onOpen();
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            setShowTopShadow(scrollTop > 0);
            setShowBottomShadow(scrollTop + clientHeight < scrollHeight);
        }
    };

    const i = 25;

    const pressHandler = () => {
        onClose();
        router.push('/dashboard');
    }

    return (
        <div className='h-full w-full flex flex-col items-center justify-center px-8'>
            <div className='text-red-500'>Assigned to me panel</div>
                    <div className='max-w-full w-full h-full rounded-lg flex flex-col items-center overflow-y-scroll scrollbar-hide py-2 border-gray-500 border-1' ref={scrollRef} onScroll={handleScroll}>
                    {showTopShadow && (
                        <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                    )}
                        {Array.from({ length: i }).map((_, index) => (
                            <AddyMapper key={index} number={index+1} handleOpen={handleOpen} />
                        ))}
                        {showBottomShadow && (
                        <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    )}    
                    </div>
                    <Modal backdrop='opaque' isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 !text-black text-fluid-p1">A house on cherry lane!</ModalHeader>
                    <ModalBody>
                        <p className='text-black'>
                        Veryifying your location...
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={pressHandler}>
                        Continue
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}