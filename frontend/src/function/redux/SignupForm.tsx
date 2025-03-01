// 'use client'

// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import StepOne from './StepOne';
// import StepTwo from './StepTwo';
// import StepThree from './StepThree';
// import StepIndicator from './StepIndicator';
// // import progressBar from './progressBar'; this will probably be in toplevel
// export default function SignUp() {

//     const {currentStep, error} = useSelector((state: RootState) => state.signup);

//     const renderStep = () => {
//         switch (currentStep) {
//             case 1:
//                 return <StepOne />;
//             case 2:
//                 return <StepTwo />;
//             case 3:
//                 return <StepThree />;
//             default:
//                 return null;
//         }
//     } // TODO will set this all up once steps are created with the parts of the HeroUI
//     return (
//         <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//         <StepIndicator currentStep={currentStep} />
//         {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {error}
//             </div>
//         )}
//         {renderStep()}
//         </div>
//     );
// }