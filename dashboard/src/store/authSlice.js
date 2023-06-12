import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getToken, setToken } from "../services/storage";
console.log(process.env.REACT_APP_API_URL)
export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkApi) => {
        let { rejectWithValue } = thunkApi;

        try {
            let sendLogin = await fetch(
                `${process.env.REACT_APP_API_URL}v2/teacher/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            )

            let loginResult = await sendLogin.json();

            if (loginResult.success === false)
                return rejectWithValue(loginResult.error);

            setToken(loginResult.token);

            return loginResult.token;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message);
        }
    }
)

const slice = createSlice({
    name: "auth",
    initialState: { token: getToken() || null, isLoading: false, validationErrors: null, loginError: null },
    reducers: {
        logout: (state) => {
            state.token = null
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            console.log("action in fullfilld", action)
            state.isLoading = false;
            state.validationErrors = null;
            state.token = action.payload;
        },
        [login.rejected]: (state, action) => {
            console.log("action in rejected", action)
            state.isLoading = false;
            if (action.payload.errorName === "loginError")
                state.loginError = action.payload.message;
            if (action.payload.errorName === "validationError")
                state.validationErrors = action.payload.validationErrors;
        }

    }

})

export const { logout } = slice.actions;

export default slice.reducer;