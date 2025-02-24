'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Input, CardFooter, Button } from "@heroui/react";
import { RecoverLogo } from "@/components/ui/icons/RecoverLogo";
import { LoginCredentials } from "@/types/login";
import { loginApi } from "@/api/features/authApi";
import { LoginError } from "@/types/auth";



export default function LogInCard() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState<LoginError | null>(null);
    const [serverError, setServerError] = useState<string>('')
    const [loginData, setLoginData] = useState<LoginCredentials>({
        usernameOrEmail:'',
        password: '',
    })
    
    //TODO add error40 handlers (email format, blank fields)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Token found, navigating to dashboard');
            router.push('/dashboard');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (validateInput()) {
        setError(null);
        setServerError('')
        setIsLoading(true);

        try {
            const response = await loginApi.login({
                usernameOrEmail: loginData.usernameOrEmail,
                password: loginData.password
            });
                // Clear sensitive data
                setLoginData({ usernameOrEmail: '', password: '' });
                
            console.log(response);
            router.push('/dashboard');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            //apiClient logs the errors
            if (error instanceof Error) {
                setServerError(error.message)
            };
        } finally {
            setIsLoading(false);
        }
        }
    }

    const validateInput = (): boolean => {
        if (loginData.usernameOrEmail.length < 5) {
            setError({ message: 'Enter a valid email or username', field: 'usernameOrEmail'});
            return false;
        }
        if (loginData.password.length < 8) {
            setError({ message: 'Enter a valid password', field: 'password'});
            return false;
        }
        return true;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setLoginData(prev => ({ ...prev, [name]: value}));
            setServerError('')
            if (error) setError(null);
        };

    return (
        <form onSubmit={handleSubmit}>
        <Card
        isBlurred
        className='border-10 h-[clamp(27rem,40vh+10rem,40rem)] w-[clamp(20rem,25vw+5rem,45rem)] !bg-recovernavy border-[10px] border-slate-500'
        shadow='md'
        >
            <CardHeader className="flex flex-col space-y-4">
                <div>
                    <RecoverLogo size={50} />
                </div>
                <div>
                    <h1 className="text-white">Login</h1>
                </div>
            </CardHeader>
            <CardBody className="space-y-6">
                    <div >
                        <Input
                            variant="bordered"
                            className='w-full text-white'
                            classNames={{
                                label: '!text-white'
                            }} 
                            label='Email or Username' 
                            type='usernameOrEmail'
                            id='usernameOrEmail'
                            name='usernameOrEmail'
                            color="secondary"
                            value={loginData.usernameOrEmail}
                            onChange={handleInputChange}
                            errorMessage='Enter a valid email or username'
                            isInvalid={serverError !== '' ? true : error === null ? false : error.field == 'usernameOrEmail' ? true : false}
                        />
                    </div> 
                    
                    <div>
                        <Input 
                            variant="bordered"
                            className='w-full text-white'
                            classNames={{
                                label: '!text-white'
                            }} 
                            label='Password' 
                            type='password'
                            id='password'
                            name='password'
                            color="secondary"
                            value={loginData.password}
                            onChange={handleInputChange}
                            errorMessage='Enter a valid password'
                            isInvalid={serverError !== '' ? true : error === null ? false : error.field == 'password' ? true : false}
                        />
                    </div>
                    <Button 
                        variant="bordered" 
                        color="secondary" 
                        className="border-white font-bold text-white hover:bg-white hover:text-recovernavy" 
                        type="submit"
                        >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </Button>
            </CardBody>
            <CardFooter className="flex flex-col justify-center">
                <small className="text-red-500 text-[18px]">{serverError}</small>
                <div className='flex justify-center pt-4'>
                    <small className="text-white">Don&apos;t have an account? <a className='text-gray-400 underline' href='./signup'>Sign up</a></small>
                </div>
            </CardFooter>
        </Card>
        </form>
    )
}