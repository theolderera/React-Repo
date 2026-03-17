import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
let api = "https://694168c1686bc3ca8166df39.mockapi.io/users";
interface IData {
  id: string;
  avatar: string;
  name: string;
  age: number;
}
const initialState = {
  data: [],
  isLoading: false,
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
  async (id: string, { dispatch }) => {
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
  async (userData: string, { dispatch }) => {
    try {
      await axios.post(api, userData);
      dispatch(getData());
    } catch (error) {
      console.error(error);
    }
  },
);
export const editData = createAsyncThunk(
  "counter/editData",
  async ({ id, updateData }: { id: string; updateData: any }, { dispatch }) => {
    try {
      await axios.put(`${api}/${id}`, updateData);
      dispatch(getData());
    } catch (error) {
      console.error(error);
    }
  },
);
export const changeStatusData = createAsyncThunk(
  "counter/changeStatusData",
  async (obj, { dispatch }) => {
    try {
      await axios.put(`${api}/${obj.id}`, obj);
      dispatch(getData());
    } catch (error) {
      console.error(error);
    }
  },
);
export const searchData = createAsyncThunk(
  "counter/searchData",
  async (query: string) => {
    try {
      const { data } = await axios.get(`${api}?search=${query}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
);
export const selectData = createAsyncThunk(
  "counter/selectData",
  async (status: string, { dispatch }) => {
    try {
      if (status !== "all") {
        const { data } = await axios.get(`${api}?status=${status}`);
        return data;
      } else {
        dispatch(getData());
      }
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
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(searchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(selectData.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
