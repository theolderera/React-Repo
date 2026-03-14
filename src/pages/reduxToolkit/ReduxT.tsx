import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewUser, changeStatus, deleteUser, editUser, searchUser, selectStatus } from './counter/counterSlice'
import type { RootState } from '../../store/store'
import { Button, Input, Modal, Select, Switch, Table, Space, Tag } from 'antd'
import { Link } from 'react-router-dom'

const ReduxT = () => {
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

  const { data } = useSelector((state: RootState) => state.counter)
  const dispatch = useDispatch()
  const { values, handleChange, handleSubmit, setValues, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: false
    },
    onSubmit: (values) => {
      if (isEdit?.id) {
        dispatch(editUser({ id: isEdit.id, ...values }))
      } else {
        dispatch(addNewUser({ id: Date.now(), ...values }))
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
        <Switch checked={record.status} onChange={() => dispatch(changeStatus(record.id))} />
      )
    },
    {
      title: 'Actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => showModal(record)}>Edit</Button>
          <Button danger onClick={() => dispatch(deleteUser(record.id))}>Delete</Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16, display: "flex", width: "100%", justifyContent: "center" }}>
        <Link to="/"><Button>Zustand</Button></Link>
        <Link to="/jotai"><Button>Jotai</Button></Link>
        <Link to="/redux-toolkit"><Button type="primary">Redux Toolkit</Button></Link>
      </Space>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => showModal(null)}>Add New User</Button>
        <Input placeholder="Search" onChange={(e) => dispatch(searchUser(e.target.value))} />
        <Select
          defaultValue="all"
          style={{ width: 160 }}
          onChange={(value) => {
            if (value === "all") return
            dispatch(selectStatus(value === "true"))
          }}
          options={[
            { value: "all", label: "All" },
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" }
          ]}
        />
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
          <Button type="primary" htmlType="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  )
}

export default ReduxT