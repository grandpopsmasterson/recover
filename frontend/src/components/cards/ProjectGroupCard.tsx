import React from 'react';
import { ListBucket} from '../../types/project';
import { Warning } from '@/components/ui/icons/Warning';
import { CircleX } from '@/components/ui/icons/CircleX';
import { CircleCheck } from '@/components/ui/icons/CircleCheck';
import { Calendar } from '@/components/ui/icons/Calendar';
import { AlertCircle } from '@/components/ui/icons/AlertCircle';
import { Phone } from '@/components/ui/icons/Phone';
import { RightArrow } from '@/components/ui/icons/RightArrow';

const ProjectGroupCard: React.FC<ListBucket> = ({ 
    name,
    total,
    redTotal,
    yellowTotal,
    greenTotal,
    revenue
}) => {
  const getStatusColor = (): string => {
    const maxCount = Math.max(yellowTotal, redTotal, greenTotal);
    if (maxCount === redTotal) return 'red-500';
    if (maxCount === yellowTotal) return 'yellow-500';
    return 'green-500';
  };

  return (

    <div className="grid columns-1 gap-2 bg-white w-full"> 

      <div className="border-black rounded-lg p-4 shadow-md">

        {/* card title + icons section */}
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-4 w-1/3">
          <div className={`text-lg font-semibold text-${getStatusColor()}`}>{name}</div>
          <p className='text-[15px] text-slate-700'>{total}</p>
          <div className={`flex h-7 items-center mx-auto border-2 px-4 rounded-full gap-1 border-${getStatusColor()}`}>
            <Warning />
            <p className="text-[15px]">{yellowTotal}</p>
            <CircleX />
            <p className="text-[15px]">{redTotal}</p>
            <CircleCheck />
            <p className="text-[15px]">{greenTotal}</p>
        </div>

        </div>

        <hr className={`my-6 w-full border-t-4 border-${getStatusColor()}`} />

        {/* lower section, details */}
        <div className="grid grid-cols-2 items-end">
          <div className="text-sm justify-self-start">
            <ul className="space-y-1"> 
                  {/* Projects this week - Calendar */}
              <li className="flex items-center gap-x-2">
                <Calendar />
                <span className="inline-block">Projects this week</span>
              </li>
                  
                  {/* Projects past end - Alert Circle */}
              <li className="flex items-center gap-x-2">
                <AlertCircle />
                <span className="inline-block">Projects past end</span>
              </li>
                  
              {/* Customer follow-up - Phone */}
              <li className="flex items-center gap-x-2">
                <Phone />
                <span className="inline-block">Customer follow-up</span>
              </li>
            </ul>  
          </div>

          {/* left-bottom details and button */}
          <div className="text-sm justify-self-end">
            <ul className="space-y-1">
              <li className="text-right">${revenue.toLocaleString()}</li>
              <li className="text-right">Total projects: 47</li>
            </ul>
            <div className="border-2 rounded-md mt-2 p-1 px-4 text-sm">
              <a href="/buckets" className="flex items-center gap-2">
                Go to bucket
              <RightArrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGroupCard;