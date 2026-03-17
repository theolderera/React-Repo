import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  changeStatusData,
  deleteData,
  editData,
  getData,
  searchData,
  selectData,
} from "./counter/counterSlice";
import {
  Flex,
  Modal,
  Spin,
  Table,
  Button,
  Input,
  Select,
  Switch,
  Space,
} from "antd";
import { useFormik } from "formik";

const App = () => {
  const [idx, setIdx] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((store) => store.todo);

  const showModal = (e) => {
    if (e) {
      setIdx(e.id);
      setValues({ name: e.name, age: e.age });
    } else {
      setIdx(null);
      setValues({ name: "", age: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { values, handleSubmit, handleChange, setValues, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        age: 0,
      },
      onSubmit: (values) => {
        if (idx) {
          dispatch(editData({ id: idx, updateData: values }));
        } else {
          dispatch(addData(values));
        }
        resetForm();
        handleCancel();
      },
    });

  useEffect(() => {
    dispatch(getData());
  }, []);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      render: (_, record) => (
        <Switch
          checked={record.status}
          onChange={() =>
            dispatch(changeStatusData({ ...record, status: !record.status }))
          }
        />
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button danger onClick={() => dispatch(deleteData(record.id))}>
            Delete
          </Button>
          <Button type="primary" onClick={() => showModal(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 20 }}>
        <Select
          defaultValue="all"
          style={{ width: 150 }}
          onChange={(value) => dispatch(selectData(value))}
          options={[
            { value: "all", label: "All" },
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ]}
        />
        <Input.Search
          placeholder="Search..."
          onChange={(e) => dispatch(searchData(e.target.value))}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={() => showModal(null)}>
          Add New
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
      />

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <form onSubmit={handleSubmit}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <Input
              name="age"
              type="number"
              value={values.age}
              onChange={handleChange}
              placeholder="Age"
            />
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Space>
        </form>
      </Modal>
    </div>
  );
};

export default App;
