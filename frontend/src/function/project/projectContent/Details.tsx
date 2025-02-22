import { DetailsProps } from '@/types/project'
import React from 'react'

const Details = ({startDate, lossDate}: DetailsProps) => {

    const formatDate = (dateValue?: Date | string | null) => {
        if (!dateValue) return 'Not set';
        try {
            const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
            return date.toLocaleDateString();
        } catch (error) {
            return `'Invalid date', ${error}`;
        }
    };

    return (
        <div className="mb-6">
                        <h2 className="text-purple-500 text-lg font-semibold mb-2">Important Dates</h2>
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
    )
}

export default Details
