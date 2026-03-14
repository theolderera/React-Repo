import { atom } from "jotai";

export const configAtom = atom({
    name: "",
    email: "",
    status: false
})
interface IData {
    id: number
    name: string
    email: string
    status: boolean
}
export const dataAtom = atom<IData[]>([
    {
        id: 1,
        name: "John Doe",
        email: "jon@gmail.com",
        status: true
    },
    {
        id: 2,
        name: "dfsdadfa",
        email: "jane@gmail.com",
        status: false
    },
    {
        id: 3,
        name: "Jddsffdzd",
        email: "john@gmail.com",
        status: true
    },
    {
        id: 4,
        name: "J75463542",
        email: "jane@gmail.com",
        status: false
    },
])


export const deleteAtom = atom(null, (get, set, id) => {
    set(dataAtom, get(dataAtom).filter((item) => item.id !== id))
})

export const addAtom = atom(null, (get, set, user: any) => {
    set(dataAtom, [...get(dataAtom), { ...user, id: Date.now() }])
})

export const editAtom = atom(null, (get, set, user: any) => {
    set(dataAtom, get(dataAtom).map((item) => item.id === user.id ? { ...item, ...user } : item))
})

export const searchAtom = atom(null, (get, set, search: string) => {
    set(dataAtom, get(dataAtom).filter((item) => item.name.toLowerCase().includes(search.toLowerCase())))
})

export const selectStatusAtom = atom(null, (get, set, status: boolean) => {
    set(dataAtom, get(dataAtom).filter((item) => item.status === status))
})

export const changeStatusAtom = atom(null, (get, set, id: number) => {
    set(dataAtom, get(dataAtom).map((item) => item.id === id ? { ...item, status: !item.status } : item))
})