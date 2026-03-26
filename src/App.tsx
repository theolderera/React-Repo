import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addData,
  addImg,
  apiImg,
  completeData,
  deleteData,
  deleteImg,
  editData,
  getData,
} from "./counter/counterSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import Info from "./pages/Info";

interface IImage {
  id: number;
  imageName: string;
}
interface IData {
  id: number;
  isCompleted: boolean;
  images: IImage[];
  name: string;
  description: string;
}
interface IState {
  counter: {
    data: IData[];
    loading: boolean;
    error: string | null;
  };
}
interface IForm {
  name: string;
  description: string;
  isCompleted: boolean;
  images: IImage[];
}

const App = () => {
  const [idx, setIdx] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showImgForm, setShowImgForm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state: IState) => state.counter);

  const { register, handleSubmit, reset } = useForm<IForm>();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const openForm = (item?: IData) => {
    if (item) {
      setIdx(item.id);
      reset(item);
    } else {
      setIdx(null);
      reset({
        name: "",
        description: "",
        isCompleted: false,
        images: [],
      });
    }
    setShowForm(true);
  };

  const openImgForm = (id: number) => {
    setIdx(id);
    setShowImgForm(true);
  };

  const onSubmit = async (formData: IForm) => {
    if (idx) {
      await dispatch(editData({ id: idx, updateUser: formData }));
    } else {
      await dispatch(addData(formData));
    }
    dispatch(getData());
    setShowForm(false);
    reset();
  };

  const onSubmitAddImg = async (formData: IForm) => {
    await dispatch(addImg({ id: idx, images: formData.images }));
    dispatch(getData());
    setShowImgForm(false);
    reset();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h2>Todo</h2>
            <button onClick={() => openForm()}>Add</button>






            <table border={1} cellPadding={5}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.isCompleted ? "true" : "false"}</td>
                    <td>
                      {item.images?.map((img) => (
                        <div key={img.id}>
                          <img
                            src={`${apiImg}/${img.imageName}`}
                            width={50}
                          />
                          <button
                            onClick={() => dispatch(deleteImg(img.id))}
                          >
                            delete
                          </button>
                        </div>
                      ))}
                    </td>
                    <td>
                      <button onClick={() => openForm(item)}>edit</button>
                      <button onClick={() => openImgForm(item.id)}>
                        add img
                      </button>
                      <button
                        onClick={() => navigate(`/info/${item.id}`)}
                      >
                        info
                      </button>
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() =>
                          dispatch(completeData(item.id))
                        }
                      />
                      <button
                        onClick={() => dispatch(deleteData(item.id))}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>








            {showForm && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="name" {...register("name")} />
                <input
                  placeholder="description"
                  {...register("description")}
                />
                <select {...register("isCompleted")}>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                <input type="file" multiple {...register("images")} />
                <button type="submit">save</button>
              </form>
            )}

            {showImgForm && (
              <form onSubmit={handleSubmit(onSubmitAddImg)}>
                <input type="file" multiple {...register("images")} />
                <button type="submit">upload</button>
              </form>
            )}
          </div>
        }
      />
      <Route path="/info/:id" element={<Info />} />
    </Routes>
  );
};

export default App;