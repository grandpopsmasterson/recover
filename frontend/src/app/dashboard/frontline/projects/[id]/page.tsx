'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import MultiPage from '@/function/project/multi-page'
//import ActivityBox from '@/components/widgets/RecentActivity'
import { ProjectBar } from '@/components/banners/ProjectBar'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { Alert, AlertDescription } from '@/components/shadcn/ui/alert'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { fetchProjectDetailsThunk } from '@/store/thunk/longProjectThunk'

export default function ProjectDetailPage() {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const {id} = useParams();

    const dispatch = useAppDispatch();
    const project = useAppSelector(state => state.longProject)
    
    
    useEffect(() => {
        const fetchProject = async () => {
            try {
                setIsLoading(true)
                dispatch(fetchProjectDetailsThunk(params.id as string))
            } catch (err) {
                setError(`Failed to fetch project details: ${err}`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProject()
    }, [params.id, dispatch, id])

    if (isLoading) {
        return (
            <div className="flex flex-col w-full gap-4 p-4">
                <Skeleton className="h-16 w-full" /> {/* ProjectBar skeleton */}
                <div className="flex gap-4">
                    <Skeleton className="flex-grow h-96" /> {/* Main content skeleton */}
                    <Skeleton className="w-64 h-96" /> {/* Activity box skeleton */}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="p-4">
                <Alert>
                    <AlertDescription>Project not found</AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col">
                <ProjectBar {...project.longProject.project} />
                
                <div className="flex flex-col">
                    <div className="flex-grow min-h-[clamp(20rem,20vw+10rem,45rem)]">
                        <MultiPage {...project.longProject.project} /> {/**, project.estimate so on and so forth for the further population of the pages*/}
                    </div>  
                </div>
            </div>
        </div>
    )
}