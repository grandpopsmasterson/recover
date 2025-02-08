import { StepTwoProps } from "@/types/createProject";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@heroui/react";


export default function StepTwo({ formData, projectType, errors, handleInputChange, handleKeyDown, handleProjectTypeChange }: StepTwoProps) {
    
    return (
        <div>
            <div className="space-y-4">
                <p>Location Information</p>
                <Dropdown>
                    <DropdownTrigger>
                        <Button color="success">
                            {formData.projectType || "Select location type"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        style={{background: '#09090b', border: '5px solid #090f21', borderRadius: '5px'}}
                        onAction={(key) => handleProjectTypeChange(key.toString())}
                    >
                        {projectType.map((type: string) => (
                            <DropdownItem
                                key={type}
                            >
                                {type}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Input 
                    className='w-[30vw]' 
                    label='Street Address' 
                    type='streetAddress'
                    id='streetAddress'
                    name='streetAddress'
                    variant='bordered'
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    errorMessage={errors?.message}
                    onKeyDown={handleKeyDown}
                    isInvalid={errors === null ? false : errors.field == 'streetAddress' ? true : false}
                />
                <Input 
                    className='w-[30vw]' 
                    label='City' 
                    type='city'
                    id='city'
                    name='city'
                    variant='bordered'
                    value={formData.city}
                    onChange={handleInputChange}
                    errorMessage={errors?.message}
                    onKeyDown={handleKeyDown}
                    isInvalid={errors === null ? false : errors.field == 'city' ? true : false}
                />
                <Input 
                    className='w-[30vw]' 
                    label='State' 
                    type='state'
                    id='state'
                    name='state'
                    variant='bordered'
                    value={formData.state}
                    onChange={handleInputChange}
                    errorMessage={errors?.message}
                    onKeyDown={handleKeyDown}
                    isInvalid={errors === null ? false : errors.field == 'state' ? true : false}
                />
                <Input 
                    className='w-[30vw]' 
                    label='Zip code' 
                    type='zipcode'
                    pattern="[0-9]*"
                    id='zipcode'
                    name='zipcode'
                    variant='bordered'
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    errorMessage={errors?.message}
                    onKeyDown={handleKeyDown}
                    isInvalid={errors === null ? false : errors.field == 'zipcode' ? true : false}
                />
            </div>
        </div>
    )
}