import { RootState } from '../store';

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectGroupedProjects = (state: RootState) => state.projects.groupedProject;

export const selectEstimates = (state: RootState) => state.longProject.longProject.estimates?.data;
export const selectEstimatesLoading = (state: RootState) => state.longProject.longProject.estimates?.loading;
export const selectEstimatesError = (state: RootState) => state.longProject.longProject.estimates?.error;

export const selectWorkOrders = (state: RootState) => state.longProject.longProject.workOrders?.data;
export const selectWorkOrdersLoading = (state: RootState) => state.longProject.longProject.workOrders?.loading;
export const selectWorkOrdersError = (state: RootState) => state.longProject.longProject.workOrders?.error;
