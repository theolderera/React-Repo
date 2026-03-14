import React, { useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { addAtom, changeStatusAtom, dataAtom, deleteAtom, editAtom, searchAtom, selectStatusAtom } from './atoms/configAtom'
import { useFormik } from 'formik'
import { Button, Input, Modal, Select, Table, Space, Tag, Switch } from 'antd'
import { Link } from 'react-router-dom'

const Jotai = () => {
  const [isEdit, setIsEdit] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const showModal = (user: any) => {
    if (user?.id) {
      setIsEdit(user)
      setValues({
        name: user.name,
        email: user.email,
        status: user.status
      })
    } else {
      setIsEdit(null)
      setValues({
        name: "",
        email: "",
        status: false
      })
    }
    setIsModalOpen(true)
  }

  const deleteUser = useSetAtom(deleteAtom)
  const addUser = useSetAtom(addAtom)
  const editUser = useSetAtom(editAtom)
  const searchUser = useSetAtom(searchAtom)
  const selectStatusUser = useSetAtom(selectStatusAtom)
  const changeStatusUser = useSetAtom(changeStatusAtom)

  const [data] = useAtom(dataAtom)

  const { values, handleChange, handleSubmit, setValues, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: false
    },
    onSubmit: (values) => {
      if (isEdit?.id) {
        editUser({ id: isEdit.id, ...values })
      } else {
        addUser(values)
      }
      handleCancel()
      resetForm()
    }
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Status',
      render: (_: any, record: any) =>
        record.status ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
    },
    {
      title: 'Change Status',
      render: (_: any, record: any) => (
        <Switch checked={record.status} onChange={() => changeStatusUser(record.id)} />
      )
    },
    {
      title: 'Actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button danger onClick={() => deleteUser(record.id)}>
            Delete
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: 40 }}>
      <Space style={{ marginBottom: 20, display: "flex", width: "100%", justifyContent: "center" }}>
        <Link to="/"><Button>Zustand</Button></Link>
        <Link to="/jotai"><Button type="primary">Jotai</Button></Link>
        <Link to="/redux-toolkit"><Button>Redux Toolkit</Button></Link>
      </Space>
      <Space style={{ marginBottom: 20 }}>
        <Input placeholder="Search..." onChange={(e) => searchUser(e.target.value)} />
        <Select
          style={{ width: 150 }}
          defaultValue="all"
          onChange={(value) => selectStatusUser(value === "true")}
          options={[
            { value: "all", label: "All" },
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" }
          ]}
        />
        <Button type="primary" onClick={() => showModal(null)}>
          Add User
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal title="User Form" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default Jotai