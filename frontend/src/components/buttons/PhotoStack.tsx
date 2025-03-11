import React from 'react';
import { Plus } from 'lucide-react';
import { useDisclosure, Modal, ModalContent, Button, ModalHeader, ModalBody, ModalFooter, Image } from '@heroui/react';

interface PhotoStackProps {
  count: number;
}

const PhotoStack = ({ count }: PhotoStackProps) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <button
        onClick={onOpen}
        className="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 aspect-square rounded-2xl"
        >
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' >
            <ModalContent>
              {(onClose) => (
                <>
                <ModalHeader>Photos</ModalHeader>
                <ModalBody className='overflow-y-auto max-h-[70vh]'>
                  <Image
                  src={'/house1.png'}
                  className="aspect-[3/2] object-cover"
                  alt='house'
                  />
                  <div className='flex space-x-2'>
                  <Image
                  src={'/house1.png'}
                  className="aspect-[3/2] object-cover"
                  alt='house'
                  />
                  <Image
                  src={'/house1.png'}
                  className="aspect-[3/2] object-cover"
                  alt='house'
                  />
                  </div>
                  <Image
                  src={'/house1.png'}
                  className="aspect-[3/2] object-cover"
                  alt='house'
                  />
                  <div className='flex space-x-2'>
                  <Image
                  src={'/house1.png'}
                  className="aspect-[3/2] object-cover"
                  alt='house'
                  />
                  <Image
                  src={'/house1.png'}
                  className="aspect-[3/2] object-cover"
                  alt='house'
                  />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>Close</Button>
                </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        <Plus className="h-5 w-5 text-gray-300 mb-2"/>
        <span className="text-gray-300 text-lg font-medium">
            +{count} more
        </span>
    </button>
  )
}

export default PhotoStack