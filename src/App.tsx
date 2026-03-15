import { useEffect, useState } from "react";
import { todoStore, type IData } from "./store/todo";
import { Modal, Table, Input, Button, Select, Switch, Avatar, Space } from "antd";
import { useFormik } from "formik";

const App = () => {
  const [idx, setIdx] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    getData,
    addData,
    deleteData,
    editData,
    searchData,
    changeStatus,
    selectData,
  } = todoStore();

  useEffect(() => {
    getData();
  }, []);

  const showModal = (e: IData | null) => {
    if (e) {
      setIdx(e.id);
      setValues({
        avatar: e.avatar,
        name: e.name,
        age: e.age,
        status: e.status,
      });
    } else {
      setIdx(null);
      setValues({
        avatar: "",
        name: "",
        age: null,
        status: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { values, handleChange, handleSubmit, setValues, resetForm } =
    useFormik<Omit<IData, "id">>({
      initialValues: {
        avatar: "",
        name: "",
        age: null,
        status: true,
      },
      onSubmit: () => {
        if (idx) {
          editData(idx, values);
        } else {
          addData(values);
        }
        handleCancel();
        resetForm();
      },
    });

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text: string) => <Avatar src={text} />,
    },
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
      dataIndex: "status",
      render: (_: any, record: IData) => (
        <Switch
          checked={record.status}
          onChange={(checked) => changeStatus(record.id, checked)}
        />
      ),
    },
    {
      title: "Actions",
      render: (_: any, record: IData) => (
        <Space>
          <Button danger onClick={() => deleteData(record.id)}>
            Delete
          </Button>
          <Button onClick={() => showModal(record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 40 }}>
      <Space style={{ marginBottom: 20 }}>
        <Input.Search
          placeholder="Search..."
          onChange={(e) => searchData(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          defaultValue="all"
          style={{ width: 140 }}
          onChange={(value: "all" | "true" | "false") => selectData(value)}
          options={[
            { value: "all", label: "All" },
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ]}
        />
        <Button type="primary" onClick={() => showModal(null)}>
          Add
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} title="User">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Input
            value={values.avatar}
            onChange={handleChange}
            name="avatar"
            placeholder="Avatar url"
          />
          <Input
            value={values.name}
            onChange={handleChange}
            name="name"
            placeholder="Name"
          />
          <Input
            value={values.age ?? ""}
            onChange={handleChange}
            type="number"
            name="age"
            placeholder="Age"
          />
          <Select
            value={values.status ? "true" : "false"}
            onChange={(value: "true" | "false") =>
              setValues({ ...values, status: value === "true" })
            }
            options={[
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
          />
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default App;