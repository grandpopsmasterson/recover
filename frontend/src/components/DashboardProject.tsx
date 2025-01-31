import React, { useState } from "react"; // react and state management
import { ShortProject, LongProject } from "../types/ProjectInterface"; // Types for project data

interface ProjectWidgetProps {
    project: ShortProject; // only short summary is initially passed
}

const ProjectWidget: React.FC<ProjectWidgetProps> = ({ project }) => {
    
    // Local state to manage the expanded/collapsed view
    const [ expanded, setExpanded ] = useState(false);

    //state to store detailed project data when fetched
    const [ detailedProject, setDetailedProject ] = useState<LongProject | null>(null);

    const handleExpand = async () => {
        if (!expanded) {
            //fetch detailed project data when expanding
            const response = await fetch(`/api/projects/${project.address}`); // axios?? look into changing this after
            const data: LongProject = await response.json();
            setDetailedProject(data); // store the fetched data
        }
        setExpanded(!expanded); // Toggle the expanded state
    };

    return (
        <div className="project-widget border rounded-1g p-4 shadpw-1g">
            {/* Always show the title */}
            <h3 className="text-x1 font-semibold">{project.address}</h3>

            {/* Show different descriptions based on state */}
            <p className="text-gray-700 my-2">
                {expanded && detailedProject
                    ? detailedProject.stage // stage shown when expanded
                    : project.assignedUsers.username // showing just the users otherwise // will be changes when more details come in
                }
            </p>

            {/* Conditionally render detailed data */}
            {expanded && detailedProject && (
                <div>
                    <img 
                        src={detailedProject.img} // will be inclueded later
                        alt={detailedProject.address} 
                        className="w-full h-40 object-cover rounded-1g mb-4"
                    />
                    <p className="text-gray-700">{detailedProject.startDate}</p>
                    <a 
                        href={detailedProject.link} // this will be the link to the full project page
                        className="text-blue-500 underline mt-2 block hover:text-blue-700"
                    >
                        View Full Project
                    </a>
                </div>
            )}

            {/* expand and collapse button -- will be changed to just on click of the nonexpanded widget */}
            <button
                onClick={handleExpand}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-1g hover:bg-blue-600"
            >
                { expanded ? "Collapse" : "Expand" }
            </button>
        </div>
    )
}