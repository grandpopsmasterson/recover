import { Chip, tv, useCheckbox, VisuallyHidden } from "@heroui/react";
import { useState } from "react";

// Interface for your data items
interface CheckboxItem {
    id: string | number;
    label: string;
    // Add any other properties your data items might have
}

interface CustomCheckboxProps {
    value: string;
    isSelected?: boolean;
    onChange?: (isSelected: boolean) => void;
    children?: React.ReactNode;
}

  // Component for a single checkbox (same as before)
export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    value,
    isSelected: controlledSelected,
    onChange,
    children,
    ...props
}) => {
    const [internalSelected, setInternalSelected] = useState(false);
    const isSelected = controlledSelected !== undefined ? controlledSelected : internalSelected;

    const checkbox = tv({
        slots: {
            base: 'border-default hover:bg-success-500 focus:outline-none focus:ring-0',
            content: 'text-default-500',
        },
        variants: {
            isSelected: {
                true: {
                    base: 'border-success bg-green-500 hover:bg-success-500 focus:outline-none focus:ring-0',
                    content: 'text-black pl-1 ',
                },
            },
            isFocusVisible: {
                true: {
                base: 'outline-none ring-0',
                },
            },
        },
    });

    const { isFocusVisible, getBaseProps, getLabelProps, getInputProps } = useCheckbox({
        ...props,
        isSelected,
        onChange: () => {
            if (onChange) {
                onChange?.(!isSelected);
            } else {
                setInternalSelected(!isSelected);
            }
        
        },
    });

    const styles = checkbox({ isSelected, isFocusVisible });

    return (
        <label {...getBaseProps()} className="focus:outline-none">
            <VisuallyHidden>
                <input {...getInputProps()} value={value} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: `${styles.base()} cursor-pointer select-none`,
                    content: styles.content(),
                }}
                color="success"
                startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
                variant="bordered"
                {...getLabelProps()}
            >
                {children}
            </Chip>
        </label>
    );
};

  // Component that handles multiple checkboxes from data
interface MappedCheckboxGroupProps {
    items: CheckboxItem[];
    onChange?: (selectedItems: CheckboxItem[]) => void;
    defaultSelected?: string[];
    className?: string;
}

export const MappedCheckboxGroup: React.FC<MappedCheckboxGroupProps> = ({
    items,
    onChange,
    defaultSelected = [],
    className = ""
}) => {
    const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set(defaultSelected));

    const handleCheckboxChange = (value: string, isSelected: boolean) => {
        setSelectedValues(prev => {
            const newSet = new Set(prev);
            if (isSelected) {
                newSet.add(value);
            } else {
                newSet.delete(value);
            }
            if (onChange) {
                const selectedItems = items.filter(item => 
                    newSet.has(item.id.toString())
                );
                onChange(selectedItems);
            }
            return newSet;
        });
    };

    return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
        {items.map((item) => (
            <CustomCheckbox
                key={item.id}
                value={item.id.toString()}
                isSelected={selectedValues.has(item.id.toString())}
                onChange={(isSelected) => handleCheckboxChange(item.id.toString(), isSelected)}
            >
                {item.label}
            </CustomCheckbox>
        ))}
        </div>
    );
};

  // CheckIcon component (same as before)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CheckIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
};