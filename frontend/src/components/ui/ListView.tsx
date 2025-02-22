import { GroupedProjects, ShortProject } from '@/types/project';
import { Table, TableColumn, TableHeader, SortDescriptor, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react';
import React, { useEffect, useState } from 'react'

export default function ListView({projects}: GroupedProjects) {

    const [sortedData, setSortedData] = useState(projects);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor|undefined>(undefined);

    //update sorted data when new data comes in from parent component
    useEffect(() => {
        setSortedData(projects)
    }, [projects]);

    const handleSort = (descriptor: SortDescriptor) => {
        const sorted = [...projects].sort((a,b) => {
            const key = descriptor.column as keyof ShortProject;
            const first = (a[key] ?? '').toString();
            const second = (b[key] ?? '').toString();

            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
            if (descriptor.direction === 'descending') cmp *= -1;

            return cmp;
        });

        setSortedData(sorted);
        setSortDescriptor(descriptor);
    };

    return (
        <Table
            sortDescriptor={sortDescriptor}
            onSortChange={handleSort}
            classNames={{
                
            }}
        >
            <TableHeader>
                <TableColumn
                    key='streetAddress'
                    allowsSorting
                >
                    Street Address
                </TableColumn>
                <TableColumn
                    key='projectType'
                    allowsSorting
                >
                    Project Type
                </TableColumn>
                <TableColumn
                    key='stage'
                    allowsSorting
                >
                    Stage
                </TableColumn>
                <TableColumn
                    key='clientName'
                    allowsSorting
                >
                    Client Name
                </TableColumn>
                <TableColumn
                    key='carrier'
                    allowsSorting
                >
                    Carrier
                </TableColumn>
                <TableColumn
                    key='lossDate'
                    allowsSorting
                >
                    Loss Date
                </TableColumn>
                <TableColumn
                    key='dateRecieved'
                    allowsSorting
                >
                    Date Recieved
                </TableColumn>
                <TableColumn
                    key='startDate'
                    allowsSorting
                >
                    Start Date
                </TableColumn>
            </TableHeader>
            <TableBody items={sortedData}>
            {(item) => (
                <TableRow key={item.streetAddress}>
                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
            )}    
            </TableBody> 
        </Table>
    )
}


