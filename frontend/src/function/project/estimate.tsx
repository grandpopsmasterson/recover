// import { Alert } from "@/components/shadcn/ui/alert";
// import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
// import { selectEstimates, selectEstimatesError, selectEstimatesLoading } from "@/store/selector/projectSelectors";

// function EstimatesSection() {
//     const estimates = useSelector(selectEstimates);
//     const isLoading = useSelector(selectEstimatesLoading);
//     const error = useSelector(selectEstimatesError);
  
//     if (isLoading) return <LoadingSpinner />;
//     if (error) return <Alert message={error} />;
  
//     return (
//       <div>
//         {estimates?.map(estimate => (
//           <EstimateItem key={estimate.id} estimate={estimate} />
//         ))}
//       </div>
//     );
//   }