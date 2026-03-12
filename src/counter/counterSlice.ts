import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
export interface IData {
  id: number;
  name: string;
  age: number;
  status: boolean;
}

export interface CounterState {
  data: IData[];
}

const initialState: CounterState = {
  data: [
    {id: 1, name: "John", age: 30, status: true},
    {id: 2, name: "Jane", age: 25, status: false},
    {id: 3, name: "Bob", age: 35, status: true},
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    deleteUser: (state, {payload}) => {
      state.data = state.data.filter((e) => e.id != payload);
    },
    addNew: (state, {payload}) => {
      state.data.push(payload);
    },
    editUser: (state, {payload}) => {
      state.data = state.data.map((e) => {
        if (e.id == payload.id) {
          return payload;
        }
        return e;
      });
    },
    searchUser: (state, {payload}) => {
      state.data = state.data.filter((e) =>
        e.name.toLowerCase().includes(payload.toLowerCase()),
      );
    },
    changeStatus: (state, {payload}) => {
      state.data = state.data.map((e) => {
        if (e.id == payload) {
          return {...e, status: !e.status};
        }
        return e;
      });
    },
  },
});

export const {deleteUser, addNew, editUser, searchUser, changeStatus} =
  counterSlice.actions;

export default counterSlice.reducer;
