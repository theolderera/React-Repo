import React, { useState } from 'react'
import { useTodo } from './store/todo'
import { useFormik } from 'formik'
import { Modal, Table, Button, Input, Select, Switch, Space, Tag } from 'antd'
import { Link } from 'react-router-dom'

const Zustand = () => {
  const [isEdit, setIsEdit] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = (user: any) => {
    setIsEdit(user)
    if (user?.id) {
      setValues({
        name: user.name,
        email: user.email,
        status: user.status
      })
    } else {
      setValues({
        name: "",
        email: "",
        status: false
      })
    }
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { data, deleteUser, addNewUser, editUser, searchUser, selectStatus, changeStatus } = useTodo()

  const { values, handleSubmit, handleChange, resetForm, setValues } = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: false
    },
    onSubmit: (values) => {
      if (isEdit?.id) {
        editUser(isEdit.id, values)
      } else {
        addNewUser(values)
      }
      handleCancel()
      resetForm()
    }
  })

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Status",
      render: (_: any, user: any) =>
        user.status ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
    },
    {
      title: "Change Status",
      render: (_: any, user: any) => (
        <Switch checked={user.status} onChange={() => changeStatus(user.id)} />
      )
    },
    {
      title: "Actions",
      render: (_: any, user: any) => (
        <Space>
          <Button danger onClick={() => deleteUser(user.id)}>Delete</Button>
          <Button type="primary" onClick={() => showModal(user)}>Edit</Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 20, display: "flex", width: "100%", justifyContent: "center" }}>
        <Link to="/"><Button type="primary">Zustand</Button></Link>
        <Link to="/jotai"><Button>Jotai</Button></Link>
        <Link to="/redux-toolkit"><Button>Redux Toolkit</Button></Link>
      </Space>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => showModal(null)}>Add New User</Button>
        <Input placeholder="Search" onChange={(e) => searchUser(e.target.value)} />
        <Select
          defaultValue="all"
          style={{ width: 160 }}
          onChange={(value) => {
            if (value === "all") return
            selectStatus(value === "true")
          }}
          options={[
            { value: "all", label: "All" },
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" }
          ]}
        />
      </Space>

      <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />

      <Modal
        title="User Form"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input name="name" value={values.name} onChange={handleChange} placeholder="Name" />
          <Input name="email" value={values.email} onChange={handleChange} placeholder="Email" />
          <Select
            value={values.status ? "true" : "false"}
            onChange={(value) => setValues({ ...values, status: value === "true" })}
            options={[
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" }
            ]}
          />
          <Button type="primary" htmlType="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  )
}

export default Zustand