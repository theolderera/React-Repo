import React, { useState } from 'react'
import type { RootState } from './store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addNew, deleteUser, editUser, searchUser, changeStatus } from './counter/counterSlice'
import { Modal, Input, Button, Card, Row, Col, Tag, Switch, Typography } from 'antd'
import { useFormik } from 'formik'

const { Title, Text } = Typography

const App = () => {

    const [idx, setIdx] = useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = (e) => {
        if (e) {
            setIdx(e.id);
            setFieldValue('name', e.name);
            setFieldValue('age', e.age);
        }
        else {
            setIdx(null);
            setFieldValue('name', "");
            setFieldValue('age', 0);
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { data } = useSelector((state: RootState) => state.counter)

    const { values, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            age: 0
        },
        onSubmit: (values) => {
            if (idx) {
                dispatch(editUser({ id: idx, name: values.name, age: values.age }))
            }
            else {
                dispatch(addNew({ id: Date.now(), name: values.name, age: values.age }))
            }
            setIsModalOpen(false);
        }
    })

    const dispatch = useDispatch()

    return (
        <div style={{ maxWidth: 1100, margin: "40px auto", padding: 20 }}>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 30
            }}>

                <Input
                    placeholder="Search user..."
                    style={{ width: 300 }}
                    size="large"
                    onChange={(e) => dispatch(searchUser(e.target.value))}
                />

                <Button
                    type="primary"
                    size="large"
                    onClick={() => showModal(null)}
                >
                    + Add User
                </Button>

            </div>

            <Row gutter={[20, 20]}>
                {data.map((e) => {
                    return (
                        <Col xs={24} sm={12} md={8} key={e.id}>

                            <Card
                                hoverable
                                style={{
                                    borderRadius: 14,
                                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
                                }}
                            >

                                <div style={{ marginBottom: 15 }}>
                                    <Title level={4} style={{ marginBottom: 0 }}>
                                        {e.name}
                                    </Title>

                                    <Text type="secondary">
                                        Age: {e.age}
                                    </Text>
                                </div>

                                <Tag
                                    color={e.status ? "green" : "red"}
                                    style={{ marginBottom: 15 }}
                                >
                                    {e.status ? "Active" : "Inactive"}
                                </Tag>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 15
                                }}>

                                    <Switch
                                        checked={e.status}
                                        onChange={() => dispatch(changeStatus(e.id))}
                                    />

                                </div>

                                <div style={{
                                    display: "flex",
                                    gap: 10
                                }}>

                                    <Button
                                        danger
                                        block
                                        onClick={() => dispatch(deleteUser(e.id))}
                                    >
                                        Delete
                                    </Button>

                                    <Button
                                        type="primary"
                                        block
                                        onClick={() => showModal(e)}
                                    >
                                        Edit
                                    </Button>

                                </div>

                            </Card>

                        </Col>
                    )
                })}
            </Row>

            <Modal
                title="User Form"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >

                <form onSubmit={handleSubmit}>

                    <Input
                        size="large"
                        placeholder="Name"
                        value={values.name}
                        style={{ marginBottom: 15 }}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                    />

                    <Input
                        size="large"
                        type="number"
                        placeholder="Age"
                        value={values.age}
                        style={{ marginBottom: 20 }}
                        onChange={(e) => setFieldValue('age', e.target.value)}
                    />

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                    >
                        Save
                    </Button>

                </form>

            </Modal>

        </div>
    )
}

export default App