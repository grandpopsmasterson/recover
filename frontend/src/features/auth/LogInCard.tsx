'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardBody, Input, CardFooter } from "@heroui/react";
import { RecoverLogo } from "@/components/ui/RecoverLogo";
import Button1 from "@/components/ui/ButtonC";
import apiClient from "@/config/apiClient";

interface LoginData { 
    identifier: string;
    password: string;
    general?: string;
}

interface LoginError {
    message: string;
}

export default function LogInCard() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState<LoginError | null>(null);
    const [loginData, setLoginData] = useState<LoginData>({
        identifier:'',
        password: '',
    })
    //TODO add error handline with HERO alert
    //TODO add error40 handlers (email format, blank fields)

    const handlePress = async (e: React.FormEvent) => {

        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            //apiClient handles credentials and baseUrl, and extracts data. Since data is returned directly we dont need to check response.status
            const response = await apiClient.post('/auth/login', loginData);
            router.push('/dashboard')
            console.log(response);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            //apiClient logs the errors
            const errorMessage = error.response?.data?.message || 'An error occurred during login';
            
            switch (error.response?.status) {
                case 401:
                    setError({ message: 'Invalid email, username or password'});
                    break;
                case 403:
                    setError({ message: 'Account is locked or disabled'});
                    break;
                case 429:
                    setError({ message: 'Too many login attempts, please try again later.'});
                    break;
                default:
                    setError({ message: errorMessage });
            }
        } finally {
            setIsLoading(false);
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setLoginData(prev => ({ ...prev, [name]: value}));
            if (error) setError(null);
        };

    return (
        <Card
        isBlurred
        className='border-8  w-[35vw] h-[40vw]'
        style={{backgroundColor: '#09090b', borderColor: '#090f21'}}
        shadow='md'
        >
            <CardHeader>
                <div>
                    <RecoverLogo />
                </div>
                <div>
                    <h1>Login</h1>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handlePress}>
                    <div>
                        <Input
                            variant="bordered"
                            className='w-[30vw]' 
                            label='Email or Username' 
                            type='identifier'
                            id='identifier'
                            name='identifier'
                            value={loginData.identifier}
                            onChange={handleInputChange}
                        />
                    </div> 
                    <br/>
                    <div>
                        <Input 
                            variant="bordered"
                            className='w-[30vw]' 
                            label='Password' 
                            type='password'
                            id='password'
                            name='password'
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                    </div> <br/>
                    <Button1 
                        variant="ghost" 
                        color="success" 
                        className="!bg-transparent font-bold !text-green-500" 
                        onPress={handlePress}
                        >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </Button1>
                </form>
            </CardBody>
            <CardFooter className="flex justify-center">
                <div className='flex justify-center pt-4'>
                    <p>Don&apos;t have an account? <a className='text-green-500 underline' href='./SignUp'>Sign up</a></p>
                </div>
            </CardFooter>
        </Card>
    )
}