//import SignupForm from "./components(redux)/SignupForm";
//import SignUpCard from "../Components/SignUpCard";
import SignUpCardLazy from "../Components/SignUpCardLazy";

export default function SignUpPage() {
    return (
        <div className="flex justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div >
            <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
                </a>
            </p>
            </div>
            <SignUpCardLazy />
        </div>
    </div>
    )
}