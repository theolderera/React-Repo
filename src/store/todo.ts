import axios from "axios";
import { create } from "zustand";

export interface IData {
  id: number;
  avatar: string;
  name: string;
  age: number | null;
  status: boolean;
}

interface TodoState {
  data: IData[];
  getData: () => Promise<void>;
  addData: (newUser: Omit<IData, "id">) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
  editData: (id: number, updateUser: Partial<IData>) => Promise<void>;
  searchData: (query: string) => Promise<void>;
  changeStatus: (id: number, status: boolean) => Promise<void>;
  selectData: (status: "all" | "true" | "false") => Promise<void>;
}

const api = "https://694168c1686bc3ca8166df39.mockapi.io/users";

export const todoStore = create<TodoState>((set, get) => ({
  data: [],
  getData: async () => {
    try {
      const { data } = await axios.get(api);
      set({ data });
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
  deleteData: async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
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
  searchData: async (query) => {
    try {
      const { data } = await axios.get(`${api}?search=${query}`);
      set({ data });
    } catch (error) {
      console.error(error);
    }
  },
  changeStatus: async (id, status) => {
    try {
      await axios.put(`${api}/${id}`, { status });
      await get().getData();
    } catch (error) {
      console.error(error);
    }
  },
  selectData: async (status) => {
    try {
      if (status !== "all") {
        const { data } = await axios.get(`${api}?status=${status}`);
        set({ data });
      } else {
        await get().getData();
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
