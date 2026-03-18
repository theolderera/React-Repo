import axios from "axios";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

let api = "https://694168c1686bc3ca8166df39.mockapi.io/users";

const trigger = atom(false);
export const searchAtom = atom("");
export const selectAtom = atom("");

const getAtom = atom(async (get) => {
  get(trigger);
  const searchValue = get(searchAtom);
  const selectValue = get(selectAtom);

  try {
    let { data } = await axios.get(
      selectValue && searchValue
        ? `${api}?fullName=${searchValue}&status=${selectValue}`
        : searchValue
          ? `${api}?fullName=${searchValue}`
          : selectValue
            ? `${api}?status=${selectValue}`
            : api,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteData = atom(null, async (get, set, id) => {
  try {
    await axios.delete(`${api}/${id}`);
    set(trigger, !get(trigger));
  } catch (error) {
    console.error(error);
  }
});
export const addData = atom(null, async (get, set, newUser) => {
  try {
    await axios.post(api, newUser);
    set(trigger, !get(trigger));
  } catch (error) {
    console.error(error);
  }
});
export const editData = atom(null, async (get, set, {id,newUser}) => {
  try {
    await axios.put(`${api}/${id}`, newUser);
    set(trigger, !get(trigger));
  } catch (error) {
    console.error(error);
  }
});

export const loadableAtom = loadable(getAtom);
