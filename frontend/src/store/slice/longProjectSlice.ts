import { LongProject, LongProjectState } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEstimatesThunk, fetchWorkOrdersThunk, fetchTimelineThunk, fetchFlagsThunk } from "../thunk/projectThunk";
import { fetchProjectDetailsThunk } from "../thunk/longProjectThunk";

const initialState: LongProjectState = {
    longProject: {
        project: {
            id: 0,
            projectName: '',
            clientName: '',
            clientEmail: '',
            clientPhone: '',
            street_address: '',
            city: '',
            state: '',
            zipcode: '',
            stage: 'pending sale',
            projectType: 'RESIDENTIAL',
            lossType: '',
            scope: '',
            houseImage: '',
        },
        overview: {
            data: null,
            loading: false,
            error: null,
        },
        estimates: {
            data: [],
            loading: false,
            error: null,
        },
        workOrders: {
            data: [],
            loading: false,
            error: null,
        },
        timeline: {
            data: [],
            loading: false,
            error: null,
        },
        flags: {
            data: [],
            loading: false,
            error: null,
        },
    },
    loading: false,
    error: null,
};

const longProjectSlice = createSlice({
    name: 'longProject',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // Fetch Long Project Details
        .addCase(fetchProjectDetailsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProjectDetailsThunk.fulfilled, (state, action: PayloadAction<LongProject>) => {
            state.longProject.project = action.payload.project;
            state.longProject.overview = action.payload.overview;
            state.loading = false;
        })
        .addCase(fetchProjectDetailsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Estimate Reducers
        .addCase(fetchEstimatesThunk.pending, (state) => {
            if (state.longProject.estimates != null) {
                state.longProject.estimates.loading = true;
                state.longProject.estimates.error = null;
            }
        })
        .addCase(fetchEstimatesThunk.fulfilled, (state, action) => {
            if (state.longProject.estimates != null) {
                state.longProject.estimates.loading = false;
                state.longProject.estimates.data = [...state.longProject.estimates.data, action.payload];
            }
        })
        .addCase(fetchEstimatesThunk.rejected, (state, action) => {
            if (state.longProject.estimates != null) {
                state.longProject.estimates.loading = false;
                state.longProject.estimates.error = action.payload as string;
            }
        })
        
        // Work Orders Reducers
        .addCase(fetchWorkOrdersThunk.pending, (state) => {
            if (state.longProject.workOrders != null) {
                state.longProject.workOrders.loading = true;
                state.longProject.workOrders.error = null;
            }
        })
        .addCase(fetchWorkOrdersThunk.fulfilled, (state, action) => {
            if (state.longProject.workOrders != null) {
                state.longProject.workOrders.loading = false;
                state.longProject.workOrders.data = action.payload;  //TODO Why is this one different? it makes no sense
            }
        })
        .addCase(fetchWorkOrdersThunk.rejected, (state, action) => {
            if (state.longProject.workOrders != null) {
                state.longProject.workOrders.loading = false;
                state.longProject.workOrders.error = action.payload as string;
            }
        })

        // Timeline Reducers
        .addCase(fetchTimelineThunk.pending, (state) => {
            if (state.longProject.timeline != null) {
                state.longProject.timeline.loading = true;
                state.longProject.timeline.error = null;
            }
        })
        .addCase(fetchTimelineThunk.fulfilled, (state, action) => {
            if (state.longProject.timeline != null) {
                state.longProject.timeline.loading = false;
                state.longProject.timeline.data = [...state.longProject.timeline.data ,action.payload];
            }
        })
        .addCase(fetchTimelineThunk.rejected, (state, action) => {
            if (state.longProject.timeline != null) {
                state.longProject.timeline.loading = false;
                state.longProject.timeline.error = action.payload as string;
            }
        })
        
        // Flag Reducers
        .addCase(fetchFlagsThunk.pending, (state) => {
            if (state.longProject.flags != null) {
                state.longProject.flags.loading = true;
                state.longProject.flags.error = null;
            }
        })
        .addCase(fetchFlagsThunk.fulfilled, (state, action) => {
            if (state.longProject.flags != null) {
                state.longProject.flags.loading = false;
                state.longProject.flags.data = [...state.longProject.flags.data, action.payload];
            }
        })
        .addCase(fetchFlagsThunk.rejected, (state, action) => {
            if (state.longProject.flags != null) {
                state.longProject.flags.loading = false;
                state.longProject.flags.error = action.payload as string;
            }
        })
    }
})

export const { } = longProjectSlice.actions;
export default longProjectSlice.reducer;