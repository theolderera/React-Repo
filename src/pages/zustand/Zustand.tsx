import React, { useEffect, useState } from "react";
import { Modal, Table, Button, Switch, Input, Form } from "antd";
import { todoStore } from "./store/store";

const Zustand = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const { data, getData, deleteData, addData, editData } = todoStore();

  useEffect(() => {
    getData();
  }, []);

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
    form.validateFields().then(values => {
      if (editingItem) {
        editData(editingItem.id, values);
      } else {
        addData(values);
      }
      setIsModalOpen(false);
    });
  };

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
          <Button type="danger" onClick={() => deleteData(record.id)}>
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
      <Table columns={columns} dataSource={data} rowKey="id" />

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

export default Zustand;