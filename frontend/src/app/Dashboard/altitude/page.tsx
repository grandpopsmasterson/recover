'use client'
import { useState, useEffect } from 'react'
import { projectsApi } from '@/api/projectsApi'
import { useRouter } from "next/navigation"
import DashboardNavBar from "../../../features/dashboard/DashboardNavbar"
import AltitudeListCard from '@/features/dashboard/AltitudeListCard'
import { ProjectBucket } from '@/types/project'

export default function AltitudePage() {
    const [buckets, setBuckets] = useState<ProjectBucket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchBuckets = async () => {
            try {
                setIsLoading(true);
                const buckets = await projectsApi.getAllBuckets();
                console.log('Fetched project bucket data:', buckets); // Debug log
                setBuckets(buckets);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching project buckets:', err); // Debug log
                setError('Failed to fetch project buckets');
                setIsLoading(false);
            }
        };
        fetchBuckets();
    }, []);

    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
  
    if (error) {
      return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
      <div>
          {isLoading ? (
              <div className="flex justify-center items-center h-[calc(100vh-64px)]">Loading...</div>
          ) : error || buckets.length === 0 ? (
              <div className="flex justify-center items-center h-[calc(100vh-64px)]">No projects to display</div>
          ) : (
              <div className="grid gap-4 p-4">
                  {buckets.map((bucket) => (
                      <AltitudeListCard
                          key={bucket.id.toString()}
                          {...bucket}
                      />
                  ))}
              </div>
          )}
      </div>
    );
}