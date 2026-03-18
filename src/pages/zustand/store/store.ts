import axios from "axios";
import { create } from "zustand";
let api = "https://694168c1686bc3ca8166df39.mockapi.io/users";
export const todoStore = create((set, get) => ({
  data: [],
  getData: async () => {
    try {
      const { data } = await axios.get(api);
      set({ data });
    } catch (error) {
      console.error(error);
    }
  },
  deleteData: async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      await get().getData();
    } catch (error) {
      console.error(error);
    }
  },
  addData: async (newUser) => {
    try {
      await axios.post(api, newUser);
      await get().getData();
    } catch (error) {
      console.error(error);
    }
  },
  editData: async (id, updateUser) => {
    try {
      await axios.put(`${api}/${id}`, updateUser);
      await get().getData();
    } catch (error) {
      console.error(error);
    }
  },
}));
