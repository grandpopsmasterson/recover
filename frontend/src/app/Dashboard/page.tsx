import DashboardNavBar from "./Components/DashboardNavbar"

export default function Project() {
    return (
        <div>
            <DashboardNavBar />
            <div className="flex flex-col items-center justify-center min-h-screen"> 
                <h1 className="text-3xl">Dashboard </h1> 
                <p>Still under construction! Check back later</p> 
                <p>click the recover logo to return to the homepage</p>
            </div>
        </div>
    )
}