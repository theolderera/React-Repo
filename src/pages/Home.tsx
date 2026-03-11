import React, { useState } from "react";
import { Table, Input, Button, Space, Select, Checkbox, Tag, Modal } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useTodo } from "../store/store";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const { Option } = Select;

interface IData {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: boolean;
}


const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setValues({
            name: "",
            email: "",
            phone: "",
            status: true,
        });
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const columns = [
        {
            title: "",
            dataIndex: "checkbox",
            render: () => <Checkbox />,
        },
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) =>
                status === true ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
        },
        {
            title: "Actions",
            render: (_: any, user: IData) => (
                <Space>
                    <Checkbox checked={user.status} onChange={(e) => checkStatus(user.id, e.target.checked)} />
                    <Link to={`/info/${user.id}`}>
                        <Button type="link">Info</Button>
                    </Link>
                    <Button onClick={() => deleteUser(user.id)} danger type="link">
                        Delete
                    </Button>
                    
                </Space>
            )
        }
    ];
    const { data, deleteUser, addNewUser, searchUser, selectStatus, checkStatus } = useTodo();
    const { values, handleChange, handleSubmit, resetForm, setValues } = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            status: true,
        },
        onSubmit: (values) => {
            const newUser = {
                id: Date.now(),
                name: values.name,
                email: values.email,
                phone: values.phone,
                status: values.status,
            };
            addNewUser(newUser);
            resetForm();
            setIsModalOpen(false);
        },
    });
    return (
        <>
            <div style={{ padding: 24 }}>
                <Space style={{ width: "100%", marginBottom: 20, justifyContent: "space-between" }}>
                    <Space>
                        <Input onChange={(e) => searchUser(e.target.value)} placeholder="Search" prefix={<SearchOutlined />} style={{ width: 220 }} />
                        <Select defaultValue="all" style={{ width: 160 }} onChange={(value) => selectStatus(value === "active")}>
                            <Option value="all">All</Option>
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
                    </Space>

                    <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
                        Add
                    </Button>
                </Space>

                <Table columns={columns} dataSource={data} pagination={false} bordered />
            </div>


            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <form onSubmit={handleSubmit} action="">
                    <Input placeholder="Name" name="name" value={values.name} onChange={handleChange} />
                    <Input placeholder="Email" name="email" value={values.email} onChange={handleChange} />
                    <Input placeholder="Phone" name="phone" value={values.phone} onChange={handleChange} />
                    <select name="status" id="" value={values.status ? "true" : "false"} onChange={(e) =>
                        setValues({
                            ...values,
                            status: e.target.value === "true",
                        })
                    }
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    <button type="submit">SAVE</button>
                </form>
            </Modal>
        </>
    );
}
export default Home