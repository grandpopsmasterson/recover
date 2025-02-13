import LogInCard from "@/features/auth/LogInCard";


export default function LogIn() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <LogInCard/>
            </div>
            <div>
                <div className='flex justify-center pt-4'>
                    <p>Don&apos;t have an account? <a className='text-green-500 underline' href='./signup'>Sign up</a></p>
                </div>
            </div>
        </div>
    )
}