import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SignupState, UserDetails } from '@/types/auth.types';
import { AuthService } from '@/services/auth.service';

const initialState: SignupState = {
    form: {
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        companyId: '',
        role: 'Viewer',
    },
    status: 'idle',
    error: null,
    currentStep: 1,
    validations: {
        email: false,
        username: false,
    },
};

export const checkEmail = createAsyncThunk(
    'signup/checkEmail',
    async (email: string, { rejectWithValue }) => {
        try {
            const authService = AuthService.getInstance();
            const response = await authService.checkEmail(email);

            if (response.data.exists) {
                return rejectWithValue('Email already in use');
            }

            return email
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
        }
    }
);

export const checkUsername = createAsyncThunk(
    'signup/checkUsername',
    async (username: string, { rejectWithValue }) => {
        try {
            const authService = AuthService.getInstance();
            const response = await authService.checkEmail(username);

            if (response.data.exists) {
                return rejectWithValue('Username already in use');
            }

            return username
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
        }
    }
);

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setFormField: ( state: SignupState, action: PayloadAction<{ field: keyof SignupState['form']; value: string }>) => {
            state.form[action.payload.field] = action.payload.value; //TODO wtf??? line error here - type 'string' is not assignable to type 'never'
        },
        setUserDetails: (state, action: PayloadAction<UserDetails>) => {
            state.form = { ...state.form, ...action.payload };
        },
        nextStep: (state) => {
            state.currentStep += 1;
            state.error = null;
        },
        prevStep: (state) => {
            state.currentStep -= 1;
            state.error = null;
        },
        resetForm: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkEmail.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(checkEmail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.form.email = action.payload;
                state.validations.email = true;
                state.currentStep = 2;
                state.error = null;
            })
            .addCase(checkEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(checkUsername.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(checkUsername.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.form.username = action.payload;
                state.validations.username = true;
                state.currentStep = 3;
                state.error = null;
            })
            .addCase(checkUsername.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const {
    setFormField,
    setUserDetails,
    nextStep,
    prevStep,
    resetForm,
} = signupSlice.actions;

export default signupSlice.reducer;