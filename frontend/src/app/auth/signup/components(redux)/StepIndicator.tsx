interface StepIndicatorProps {
    currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    const steps = [
        { id: 1, name: 'Email'},
        { id: 2, name: 'Account'},
        { id: 3, name: 'Details'},
    ];

    return (
        <nav aria-label="Progress" className="mb-8">
        <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
            <li
                key={step.name}
                className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
            >
                <div className="flex items-center">
                <div
                    className={`${
                    step.id <= currentStep
                        ? 'bg-indigo-600'
                        : 'bg-gray-200'
                    } h-8 w-8 rounded-full flex items-center justify-center`}
                >
                    <span
                    className={`${
                        step.id <= currentStep ? 'text-white' : 'text-gray-500'
                    } text-sm font-medium`}
                    >
                    {step.id}
                    </span>
                </div>
                {stepIdx !== steps.length - 1 && (
                    <div
                    className={`hidden sm:block absolute top-4 left-8 -right-12 h-0.5 ${
                        step.id < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                    />
                )}
                </div>
                <div className="mt-2">
                <span className="text-xs font-medium text-gray-500">{step.name}</span>
                </div>
            </li>
            ))}
        </ol>
    </nav>
    )
}