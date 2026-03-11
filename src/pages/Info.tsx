import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useTodo } from '../store/store'
import { Button, Input, Modal } from 'antd';
import { useFormik } from 'formik'
import Home from './Home';

const Info = () => {
    const navigate = useNavigate();
    const [idx, setIdx] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { editUser } = useTodo();
    const { values, handleChange, setValues, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            status: true,
        },
        onSubmit: (values) => {
            editUser(idx, values);
            setIsModalOpen(false);
            navigate("/");
        }
    });
    const showModal = (user) => {
        setIdx(user.id);
        setValues({
            name: user.name,
            email: user.email,
            phone: user.phone,
            status: user.status,
        });
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const { id } = useParams<{ id: string }>();
    const { data } = useTodo();
    const user = data.find((e) => e.id === Number(id));
    return (
        <>
            <div>
                <h1>{user.name}</h1>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Status: {user.status ? 'Active' : 'Inactive'}</p>
                <Button type="link" onClick={() => showModal(user)}>Edit</Button>
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
    )
}

export default Info