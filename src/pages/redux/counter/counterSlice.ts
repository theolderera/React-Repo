import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
let api = "https://694168c1686bc3ca8166df39.mockapi.io/users";
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getData = createAsyncThunk("counter/getData", async () => {
  try {
    const { data } = await axios.get(api);
    return data;
  } catch (error) {
    console.error(error);
  }
});
export const deleteData = createAsyncThunk(
  "counter/deleteData",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${api}/${id}`);
      dispatch(getData());
    } catch (error) {
      console.error(error);
    }
  },
);
export const addData = createAsyncThunk(
  "counter/addData",
  async (newUser, { dispatch }) => {
    try {
      await axios.post(api, newUser);
      dispatch(getData());
    } catch (error) {
      console.error(error);
    }
  },
);
export const editData = createAsyncThunk(
  "counter/editData",
  async ({ id, updateUser }, { dispatch }) => {
    try {
      await axios.put(`${api}/${id}`, updateUser);
      dispatch(getData());
    } catch (error) {
      console.error(error);
    }
  },
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
