'use client'
import { Button } from "@heroui/button"
import { useRouter } from "next/navigation";

export default function LogIn() {

    //TODO add authentication
    //TODO add error40 handlers (email format, blank fields)

    const router = useRouter();
    
    const handlePress = () => {
        console.log('routing to login')
        router.push('/Dashboard')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen"> 
            <h1 className="text-3xl">Log In </h1> <br/>
            <input type="text" placeholder="E-Mail" style={{color: "black", borderRadius: '5px'}}></input> <br/>
            <input type="password" placeholder="Password" style={{color: "black", borderRadius: '5px'}}></input> <br/>
            <Button onPress={handlePress} style={{backgroundColor:"#4ade80", color: "black"}}>Log in</Button> <br/>
            <a href="/Auth/Forgot">Forgot Username or Password?</a>
        </div>
    )
}