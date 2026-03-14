import { create } from "zustand";
interface IData {
  id: number,
  name: string,
  email: string,
  status: boolean
}
interface ITodo {
  data: IData[];
  deleteUser: (id: number) => void;
  addNewUser: (user: Omit<IData, 'id'>) => void;
}

export const useTodo = create<ITodo>((set) => ({
  data: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: true,
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      status: false,
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "bob@example.com",
      status: true,
    },
  ],
  deleteUser: (id: number) => {
    set((state) => ({
      data: state.data.filter((user) => user.id !== id)
    }))
  },
  addNewUser: (user) => {
    set((state) => ({
      data: [...state.data, { ...user, id: Date.now() }]
    }))
  },
  editUser: (id: number, updatedUser: IData) => {
    set((state) => ({
      data: state.data.map((user) => user.id === id ? { ...user, ...updatedUser } : user)
    }))
  },
  searchUser: (search: string) => {
    set((state) => ({
      data: state.data.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    }))
  },
  selectStatus: (status: boolean) => {
    set((state) => ({
      data: state.data.filter((user) => user.status === status)
    }))
  },
  changeStatus: (id: number) => {
    set((state) => ({
      data: state.data.map((user) => user.id === id ? { ...user, status: !user.status } : user)
    }))
  }
}));
