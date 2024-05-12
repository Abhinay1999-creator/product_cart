import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createUser = createAsyncThunk(
    'createUser',
    async (data, { rejectWithValue }) => {
        const response = await fetch("https://64c2b7f9eb7fd5d6ebd04466.mockapi.io/crud", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)

        });

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const showUser = createAsyncThunk(
    'showUser',
    async (args, { rejectWithValue }) => {
        const response = await fetch("https://64c2b7f9eb7fd5d6ebd04466.mockapi.io/crud");

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const deleteUser = createAsyncThunk(
    'deleteUser',
    async (id, { rejectWithValue }) => {
        const response = await fetch(`https://64c2b7f9eb7fd5d6ebd04466.mockapi.io/crud/${id}`, {
            method: "DELETE",
        });

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const updateUser = createAsyncThunk(
    'updateUser',
    async (data, { rejectWithValue }) => {
        const response = await fetch(`https://64c2b7f9eb7fd5d6ebd04466.mockapi.io/crud/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        });

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        isLoading: false,
        error: null,
        searchData: []
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload;
        }
    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.isLoading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users.push(action.payload)
        },
        [createUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message
        },
        [showUser.pending]: (state) => {
            state.isLoading = true;
        },
        [showUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        [showUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message
        },
        [deleteUser.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            const { id } = action.payload;
            if (id) {
                state.users = state.users.filter((ele) => ele.id !== id)
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = state.users.map((ele) => ele.id === action.payload.id ? action.payload.id : ele)
        },
        [updateUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }


})

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;