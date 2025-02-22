import { StepFiveProps } from "@/types/createProject";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";


export default function StepFive({projStage, formData, handleStageChange}: StepFiveProps) {
    
    return (
        <div>
            <p>Dev stage selection</p>
                <Dropdown>
                    <DropdownTrigger>
                        <Button color="success">
                            {formData.stage || "Select stage"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        style={{background: '#09090b', border: '5px solid #090f21', borderRadius: '5px'}}
                        onAction={(key) => handleStageChange(key.toString())}
                    >
                        {projStage.map((stage: string) => (
                            <DropdownItem
                                key={stage}
                            >
                                {stage}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
        </div>
    )
}