import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

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
  images: FileList;
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
      reset(item as any);
    } else {
      setIdx(null);
      reset({
        name: "",
        description: "",
        isCompleted: false,
        images: {} as FileList,
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <Routes>
        <Route
          path="/"
          element={
            <div className="max-w-7xl mx-auto p-6 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Users List</h2>
                <Button onClick={() => openForm()}>Add New User</Button>
              </div>

              <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-100/50">
                    <TableRow>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Description</TableHead>
                      <TableHead className="font-semibold">Completed</TableHead>
                      <TableHead className="font-semibold">Images</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.id} className="group hover:bg-slate-50">
                        <TableCell className="font-medium align-middle">{item.name}</TableCell>
                        <TableCell className="text-slate-500 align-middle max-w-[200px] truncate">
                          {item.description.slice(0,15)+"....."}
                        </TableCell>
                        <TableCell className="align-middle">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.isCompleted ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                            {item.isCompleted ? "Yes" : "No"}
                          </span>
                        </TableCell>
                        <TableCell className="align-middle">
                          {item.images?.length > 0 ? (
                            <Swiper
                              modules={[Navigation, Pagination]}
                              navigation
                              pagination={{ clickable: true }}
                              slidesPerView={1}
                              className="w-24 h-24 rounded-md border shadow-sm"
                            >
                              {item.images.map((img) => (
                                <SwiperSlide key={img.id} className="relative group/slide flex items-center justify-center bg-slate-50">
                                  <img
                                    src={`${apiImg}/${img.imageName}`}
                                    alt="task-img"
                                    className="w-full h-full object-cover"
                                  />
                                  <Button 
                                    size="icon" 
                                    variant="destructive" 
                                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover/slide:opacity-100 transition-opacity"
                                    onClick={() => dispatch(deleteImg(img.id))}
                                    title="Delete Image"
                                  >
                                    <span className="text-[10px]">✕</span>
                                  </Button>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          ) : (
                            <span className="text-xs text-slate-400 italic">No images</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right align-middle">
                          <div className="flex items-center justify-end gap-2">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                              checked={item.isCompleted}
                              onChange={() => dispatch(completeData(item.id))}
                              title="Toggle Completion"
                            />
                            <Button size="sm" variant="secondary" onClick={() => openForm(item)}>
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => openImgForm(item.id)}>
                              + Img
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => navigate(`/info/${item.id}`)}>
                              Info
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => dispatch(deleteData(item.id))}>
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {data.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                          No tasks found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {showForm && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">{idx ? "Edit Task" : "Add Task"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block text-slate-700">Name</label>
                        <Input placeholder="Enter task name" {...register("name")} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block text-slate-700">Description</label>
                        <Input placeholder="Enter description" {...register("description")} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block text-slate-700">Status</label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                          {...register("isCompleted", { valueAsBoolean: true })}
                        >
                          <option value="false">Not Completed</option>
                          <option value="true">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block text-slate-700">Images</label>
                        <Input type="file" multiple {...register("images")} />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                      </div>
                    </form>
                  </div>
                )}

                {showImgForm && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
                    <h3 className="text-lg font-semibold mb-4">Upload Images to Task</h3>
                    <form onSubmit={handleSubmit(onSubmitAddImg)} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block text-slate-700">Select Images</label>
                        <Input type="file" multiple {...register("images")} />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setShowImgForm(false)}>Cancel</Button>
                        <Button type="submit">Upload</Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          }
        />
        <Route path="/info/:id" element={<Info />} />
      </Routes>
    </div>
  );
};

export default App;
