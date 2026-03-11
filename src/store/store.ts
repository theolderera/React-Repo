import {create} from "zustand";

export const useTodo = create((set, get) => ({
  data: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      status: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "234-567-8901",
      status: true,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "345-678-9012",
      status: false,
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "456-789-0123",
      status: true,
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      phone: "567-890-1234",
      status: false,
    },
  ],
  deleteUser: (id: number) => {
    return set((state) => ({
      data: state.data.filter((user) => user.id !== id),
    }));
  },
  addNewUser: (user: any) => {
    return set((state) => ({
      data: [...state.data, user],
    }));
  },
  editUser: (id: number, newUser: any) => {
    return set((state) => ({
      data: state.data.map((user) =>
        user.id === id ? {...user, ...newUser} : user,
      ),
    }));
  },
  searchUser: (name: string) => {
    return set((state) => ({
      data: state.data.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      ),
    }));
  },
  selectStatus: (status: boolean) => {
    return set((state) => ({
      data: state.data.filter((user) => user.status === status),
    }));
  },
  checkStatus: (id: number) => {
    return set((state) => ({
      data: state.data.map((user) =>
        user.id === id ? {...user, status: !user.status} : user,
      ),
    }));
  },
}));
