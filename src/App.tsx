import React, { useState } from "react";
import { Table, Avatar, Tag, Button, Space, Modal, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useTodo } from "./store/todo";
interface IData {
  name: string;
  email: string;
  status: boolean;
}

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoData, setInfoData] = useState<any>(null);
  const { data, deleteUser, editUser, addUser, searchUser, selectFilter } = useTodo();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      status: true,
    },
    onSubmit: (values) => {
      if (values.id == 0) {
        addUser(values);
      } else {
        editUser(values);
      }
      setIsModalOpen(false);
    },
  });

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: () => <Avatar size={40} icon={<UserOutlined />} />,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: boolean) =>
        status === true ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      render: (user: any) => (
        <Space>
          <Button type="default" onClick={() => showModalInfo(user)}>
            Info
          </Button>
          <Button type="primary" onClick={() => showModal(user)}>
            Edit
          </Button>
          <Button danger onClick={() => deleteUser(user.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (user: any) => {
    setIsModalOpen(true);
    if (user == 0) {
      setValues({
        id: 0,
        name: "",
        email: "",
        status: true,
      });
    } else {
      setValues({
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      });
    }
  };

  const handleCancelInfo = () => {
    setIsInfoModalOpen(false);
    setInfoData(null);
  };
  const showModalInfo = (user: any) => {
    setInfoData(user);
    setIsInfoModalOpen(true);
  };

  return (
    <>
      <div style={{ padding: 40 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2 className="text-blue-500 text-[40px] font-bold">Users</h2>
          <Input type="search" placeholder="Search user..." onChange={(e) => searchUser({ name: e.target.value })} />
          <select name="" id="" onChange={(e) => selectFilter(e.target.value === "true")}>
            <option value="all">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <Button type="primary" onClick={() => showModal(0)}>
            Add User
          </Button>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </div>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <Input
            value={values.name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="email">Email</label>
          <Input
            value={values.email}
            onChange={handleChange}
            type="text"
            name="email"
            id="email"
          />
          <label htmlFor="status">Status</label>
          <select
            value={String(values.status)}
            onChange={(e) =>
              setValues({ ...values, status: e.target.value === "true" })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </Modal>

      <Modal
        title="User Info"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isInfoModalOpen}
        onCancel={handleCancelInfo}
        footer={null}
      >
        {infoData && (
          <div>
            <p>
              <strong>Name:</strong> {infoData.name}
            </p>
            <p>
              <strong>Email:</strong> {infoData.email}
            </p>
            <p>
              <strong>Status:</strong> {infoData.status ? "Active" : "Inactive"}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default App;
