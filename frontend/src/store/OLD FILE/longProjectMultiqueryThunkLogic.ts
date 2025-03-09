// import { LongProject } from "@/types/project"; //TODO this is just for me to look at if we need to make individual changes to a project.
// import { PayloadAction } from "@reduxjs/toolkit";
// import { getMultiQueryThunk } from "../thunk/groupedProjectThunk";

//  // Multi-query thunk - also updates groupedProjects
//             .addCase(getMultiQueryThunk.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getMultiQueryThunk.fulfilled, (state, action: PayloadAction<LongProject[]>) => {
//                 // Transform Project[] to a single GroupedProjects entry
//                 if (action.payload.length > 1) {
//                     action.payload.map((data) => (
//                         state.longProject = {
//                             project: data.details,
//                             overview: {
//                                 data: data.details || initialState.longProject.project,
//                                 loading: false,
//                                 error: null
//                             },
//                             estimates: {
//                                 data: data.estimates?.data || [],
//                                 loading: false,
//                                 error: null
//                             },
//                             workOrders: {
//                                 data: data.workOrders?.data || [],
//                                 loading: false,
//                                 error: null
//                             },
//                             timeline: {
//                                 data: data.timeline?.data || [],
//                                 loading: false,
//                                 error: null
//                             },
//                             flags: {
//                                 data: data.flags?.data || [],
//                                 loading: false,
//                                 error: null
//                             },
//                         },
//                         state.loading = false
//                     ))
//                 }
//             })
//             .addCase(getMultiQueryThunk.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string; 
//             })