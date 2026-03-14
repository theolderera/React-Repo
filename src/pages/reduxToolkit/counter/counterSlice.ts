import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface IData {
    id: number;
    name: string;
    email: string;
    status: boolean;
}
export interface counterSlice {
    data: IData[];
}

const initialState: counterSlice = {
    data: [
        {
            id: 1,
            name: "Ahmad",
            email: "ahmad@gmail.com",
            status: true
        },
        {
            id: 2,
            name: "Ali",
            email: "ali@gmail.com",
            status: false
        },
        {
            id: 3,
            name: "Usman",
            email: "usman@gmail.com",
            status: true
        }
    ]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        deleteUser: (state, { payload }) => {
            state.data = state.data.filter((e) => e.id !== payload)
        },
        addNewUser: (state, { payload }) => {
            state.data.push(payload)
        },
        editUser: (state, { payload }) => {
            state.data = state.data.map((e) => e.id === payload.id ? payload : e)
        },
        searchUser: (state, { payload }) => {
            state.data = state.data.filter((e) => e.name.toLowerCase().includes(payload.toLowerCase()))
        },
        selectStatus: (state, { payload }) => {
            state.data = state.data.filter((e) => e.status === payload)
        },
        changeStatus: (state, { payload }) => {
            state.data = state.data.map((e) => e.id === payload ? { ...e, status: !e.status } : e)
        }
    },
})

export const { deleteUser, addNewUser, editUser, searchUser, selectStatus, changeStatus } = counterSlice.actions

export default counterSlice.reducer