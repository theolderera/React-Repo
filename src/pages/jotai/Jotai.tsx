import React, { useState } from "react";
import { useAtom } from "jotai";
import { addData, deleteData, editData, loadableAtom } from "./atom/atom";
import { Modal, Table, Button, Switch, Form, Input } from "antd";

const Jotai = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [data] = useAtom(loadableAtom);
  const [, deleteUser] = useAtom(deleteData);
  const [, addUser] = useAtom(addData);
  const [, editUser] = useAtom(editData);

  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue({ ...item });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        editUser({ id: editingItem.id, newUser: values });
      } else {
        addUser(values);
      }
      setIsModalOpen(false);
    });
  };

  if (data.state === "loading") return <h1>Loading...</h1>;

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => deleteUser(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Button type="primary" onClick={() => showModal()} className="mb-4">
        Add New
      </Button>
      <Table columns={columns} dataSource={data.data} rowKey="id" />

      <Modal
        title={editingItem ? "Edit Item" : "Add New Item"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input age!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Jotai;