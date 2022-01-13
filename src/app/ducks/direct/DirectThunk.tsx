import { createAsyncThunk } from "@reduxjs/toolkit";


export const openModals = createAsyncThunk<any,
    string>(
    "direct/openModals", async (payload, { rejectWithValue }) => {
        try {
            console.log(payload);
            return "hello"
        } catch (error) {
            console.log(error);
            return error
        }
    },
);