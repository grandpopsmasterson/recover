import { RootState } from '../store';

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectCurrentProject = (state: RootState) => state.projects.currentProject;

export const selectEstimates = (state: RootState) => state.projects.estimates?.data;
export const selectEstimatesLoading = (state: RootState) => state.projects.estimates?.loading;
export const selectEstimatesError = (state: RootState) => state.projects.estimates?.error;

export const selectWorkOrders = (state: RootState) => state.projects.workOrders?.data;
export const selectWorkOrdersLoading = (state: RootState) => state.projects.workOrders?.loading;
export const selectWorkOrdersError = (state: RootState) => state.projects.workOrders?.error;
