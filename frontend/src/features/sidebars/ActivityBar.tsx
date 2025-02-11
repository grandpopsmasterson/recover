import React from 'react'
import {Accordion, AccordionItem} from '@heroui/react';

const ActivityBar = () => {
    return (
        <div className='rounded-tl-lg rounded-bl-lg' style={{width: '15vw',
            borderColor: '#090F21',
            borderTopWidth: '5px',
            borderLeftWidth: '5px',
            borderBottomWidth: '5px',
            borderStyle: 'solid',
            borderTopLeftRadius: '1.1rem',     // equivalent to rounded-lg
            borderBottomLeftRadius: '1.1rem'  }}>
            <div className='overflow-hidden'>
                <Accordion variant='bordered' className='bg-[#09090B]' defaultExpandedKeys={['1']}>
                    
                    <AccordionItem title='Activity log' key={1}>
                        
                    </AccordionItem>            
                </Accordion>
            </div>
        </div>
    )
}

export default ActivityBar