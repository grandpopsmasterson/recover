// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export const useProjects = (userId: string) => {
//     const dispatch = useDispatch();
//     const { projects, isLoading } = useSelector((state) => state.projects);
  
//     useEffect(() => {
//       dispatch(fetchUserProjects(userId));
//     }, [userId]);
  
//     const createProject = async (projectData) => {
//       await dispatch(createNewProject(projectData));
//     };
  
//     return {
//       projects,
//       isLoading,
//       createProject
//     };
//   };