import React from 'react'
import {Accordion, AccordionItem} from '@heroui/react';

const Timeline = () => {
    return (
        <div className='' style={{width: '15vw', 
            borderColor: '#090F21',
            borderTopWidth: '5px',
            borderRightWidth: '5px',
            borderBottomWidth: '5px',
            borderStyle: 'solid',
            borderTopRightRadius: '1.1rem',     // equivalent to rounded-lg
            borderBottomRightRadius: '1.1rem'
        }}>
            <div className='overflow-hidden'>
                <Accordion variant='bordered' className='bg-[#09090B]' defaultExpandedKeys={['1']}>
                    
                    <AccordionItem title='Timeline' key={1}>
                        <Accordion>
                            <AccordionItem title='Pending Sale'>
                                Description
                            </AccordionItem>
                            <AccordionItem 
                                title='Authorization'
                            >
                                Acquired
                            </AccordionItem>

                            <AccordionItem title='Work in Progress'>
                                Description
                            </AccordionItem>
                        </Accordion>
                    </AccordionItem>
                    <AccordionItem title='Photos' key={2}>
                        
                        <Accordion>
                            <AccordionItem title='Floor 1'>
                                
                            </AccordionItem>
                            <AccordionItem title='Floor 2'>
                                
                            </AccordionItem>
                        </Accordion>
                    </AccordionItem>
                    <AccordionItem title='Documents'>
                        <Accordion>
                            <AccordionItem >

                            </AccordionItem>
                        </Accordion>
                    </AccordionItem>
                    <AccordionItem title='Estimate'>
                        <Accordion>
                            <AccordionItem >

                            </AccordionItem>
                        </Accordion>
                    </AccordionItem>            
                </Accordion>
            </div>
        </div>
    )
}

export default Timeline
