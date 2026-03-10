import { create } from "zustand";
export const useTodo = create((set, get) => ({
  data: [
    {
      id: 1,
      avatar: "",
      name: "John Doe",
      email: "john@example.com",
      status: true,
    },
    {
      id: 2,
      avatar: "",
      name: "Jane Smith",
      email: "jane@example.com",
      status: false,
    },
    {
      id: 3,
      avatar: "",
      name: "Alice Johnson",
      email: "alice@example.com",
      status: true,
    },
  ],
  deleteUser: (id: number) => {
    set((state: any) => {
      return {
        data: state.data.filter((e: any) => e.id != id),
      };
    });
  },
  editUser: (user: any) => {
    set((state: any) => {
      return {
        data: state.data.map((e: any) => {
          if (e.id == user.id) {
            return { ...e, ...user };
          }
          return e;
        }),
      };
    });
  },
  addUser: (user: any) => {
    set((state: any) => {
      return {
        data: [...state.data, { ...user, id: state.data.length + 1 }],
      };
    });
  },
}));
