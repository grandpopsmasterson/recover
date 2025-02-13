import React from 'react';
import { ProjectBucket} from '../../types/project';

const AltitudeListCard: React.FC<ProjectBucket> = ({ 
    id,
    stage,
    total,
    redTotal,
    yellowTotal,
    greenTotal = total,
    revenue
}) => {
  const getStatusColor = (): string => {
    const maxCount = Math.max(yellowTotal, redTotal, greenTotal);
    if (maxCount === redTotal) return 'border-red-500';
    if (maxCount === yellowTotal) return 'border-yellow-500';
    return 'border-green-500';
  };

  return (

    <div className="grid columns-1 gap-2 bg-white"> 

      <div className="border-black rounded-lg p-4 ">

        {/* card title + icons section */}
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-4">
          <div className={`text-lg font-semibold ${getStatusColor()}`}>PENDING SALE</div>

          <div className={`flex h-7 items-center border-2 px-4 rounded-full gap-1 ${getStatusColor()}`}>
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 2L2 22h20L12 2zm0 15v2m0-4v-4" className="stroke-white dark:stroke-sky-300"/>
            </svg>

            <p className="text-md">{yellowTotal}</p>
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="9" className="stroke-white"/>
              <path d="M15 9l-6 6m0-6l6 6" className="stroke-white dark:stroke-sky-300"/>
            </svg>
            <p className="text-md">{redTotal}</p>
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="9" className="stroke-white"/>
              <path d="M8 11.5L10.5 14L14 8" className="stroke-white dark:stroke-sky-300"/>
            </svg>
            <p className="text-md">{greenTotal}</p>
         </div>

        </div>

        <hr className={`my-6 w-full border-t-4 ${getStatusColor()}`} />

        {/* lower section, details */}
        <div className="grid grid-cols-2 items-end">
          <div className="text-sm justify-self-start">
            <ul className="space-y-1"> 
                  {/* Projects this week - Calendar */}
              <li className="flex items-center gap-x-2">
                <svg className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2V5"/>
                  <path d="M16 2V5"/>
                  <path d="M3 8H21"/>
                  <rect x="3" y="4" width="18" height="16" rx="2"/>
                </svg>
                <span className="inline-block">Projects this week</span>
              </li>
                  
                  {/* Projects past end - Alert Circle */}
              <li className="flex items-center gap-x-2">
                <svg className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 8v4"/>
                  <path d="M12 16h.01"/>
                </svg>
                <span className="inline-block">Projects past end</span>
              </li>
                  
              {/* Customer follow-up - Phone */}
              <li className="flex items-center gap-x-2">
                <svg className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"/>
                </svg>
                <span className="inline-block">Customer follow-up</span>
              </li>
            </ul>  
          </div>

          {/* left-bottom details and button */}
          <div className="text-sm justify-self-end">
            <ul className="space-y-1">
              <li className="text-right">$25,705</li>
              <li className="text-right">Total projects: 47</li>
            </ul>
            <div className="border-2 rounded-md mt-2 p-1 px-4 text-sm">
              <a href="/buckets" className="flex items-center gap-2">
                Go to bucket
              <svg 
                className="h-4 w-4" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
              </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltitudeListCard;