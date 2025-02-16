'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardBody, Input, CardFooter } from "@heroui/react";
import { RecoverLogo } from "@/components/ui/RecoverLogo";
import Button1 from "@/components/ui/ButtonC";
import { LoginCredentials } from "@/types/login";
import { loginApi } from "@/api/authApi";

interface LoginError {
    message: string;
    field: string;
}

export default function LogInCard() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState<LoginError | null>(null);
    const [loginData, setLoginData] = useState<LoginCredentials>({
        usernameOrEmail:'',
        password: '',
    })
    
    //TODO add error40 handlers (email format, blank fields)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (validateInput()) {
        setError(null);
        setIsLoading(true);

        try {
            const response = await loginApi.login({
                usernameOrEmail: loginData.usernameOrEmail,
                password: loginData.password
            });
            const { token, username } = response.data;
                localStorage.setItem('token', `Bearer ${token}`);
                localStorage.setItem('user', JSON.stringify({ username }));

                // Clear sensitive data
                setLoginData({ usernameOrEmail: '', password: '' });
                
            router.push('/dashboard')
            console.log(response);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            //apiClient logs the errors
            const errorMessage = error.response?.data?.message || 'An error occurred during login';
            
            switch (error.response?.status) {
                case 401:
                    setError({ message: 'Invalid email, username or password', field: 'server'});
                    break;
                case 403:
                    setError({ message: 'Account is locked or disabled', field: 'server'});
                    break;
                case 429:
                    setError({ message: 'Too many login attempts, please try again later.', field: 'server'});
                    break;
                default:
                    setError({ message: errorMessage, field: 'server' });
            }
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
            if (error) setError(null);
        };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#your-bg-color]">
            <form onSubmit={handleSubmit}>
            <Card
            isBlurred
            className="h-[clamp(30rem,30vw+10rem,45rem)]"
            style={{backgroundColor: '#09090b', border: '10px solid #090f21'}}
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
                        <div>
                            <Input
                                variant="bordered"
                                className='w-[30vw]' 
                                label='Email or Username' 
                                type='usernameOrEmail'
                                id='usernameOrEmail'
                                name='usernameOrEmail'
                                value={loginData.usernameOrEmail}
                                onChange={handleInputChange}
                                errorMessage='Enter a valid email or username'
                                isInvalid={error === null ? false : error.field == 'usernameOrEmail' ? true : false}
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
                                errorMessage='Enter a valid password'
                                isInvalid={error === null ? false : error.field == 'password' ? true : false}
                            />
                        </div> <br/>
                        <Button1 
                            variant="ghost" 
                            color="success" 
                            className="!bg-transparent font-bold !text-green-500" 
                            type="submit"
                            >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </Button1>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <div className='flex justify-center pt-4'>
                        <p>Don&apos;t have an account? <a className='text-green-500 underline' href='./SignUp'>Sign up</a></p>
                    </div>
                </CardFooter>
            </Card>
            </form>
        </div>
    )
}