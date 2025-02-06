import DashboardNavBar from "../components/DashboardNavbar"

export default function AllProjects() {
    return (
        <div>
            <DashboardNavBar/>
            <div className="flex flex-col items-center justify-center min-h-screen"> 
                <h1 className="text-3xl">ALL PROJECTS </h1> 
                <p>Still under construction! Check back later</p> 
                <p>click the recover logo to return to the homepage</p>
            </div>
        </div>
    )
}