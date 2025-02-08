//import SignupForm from "./components(redux)/SignupForm";
//import SignUpCard from "../Components/SignUpCard";


import SignUpCard from "@/features/auth/SignUpCard";



export default function SignUpPage() {
    return (
    <div className="flex justify-center min-h-screen h-[100%] py-12 px-4 pt-16 sm:px-6 lg:px-8">
        <div className="w-[35vw] h-[40vw]">
        <SignUpCard />
        </div>
    </div>
    )
}