import React, { useEffect, useState } from "react";
import { Card, Divider, Dropdown, Image, Menu, Modal, Typography } from "antd";
import axios from "axios";
import { MoreOutlined, ScissorOutlined } from '@ant-design/icons'
import './Bookmark.css'
import { Link } from "react-router-dom";

const Bookmark = ({ modalVisible, setModalVisible, setAssignment, setCourse, setStudent }) => {

    const BASE_URL = 'http://192.168.1.12:5000'

    const [savedItems, setSavedItems] = useState(0)
    const [savedAssignment, setSavedAssignment] = useState(0)
    const [savedSubmit, setSavedSubmit] = useState(0)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                user_id: sessionStorage.getItem('id')
            }
        };

        axios.get(BASE_URL + '/saved', config).then(res => {
            let _savedCourse = []
            let _savedAssignment = []
            let _savedSubmit = []
            for (let i = 0; i < res.data.saves.length; i++) {
                let save = res.data.saves[i]
                if (save.type == 'course') {
                    _savedCourse.push(save)
                } else if (save.type == 'assignment') {
                    _savedAssignment.push(save)
                } else if (save.type == 'submit') {
                    _savedSubmit.push(save)
                }
            }

            console.log(_savedAssignment, _savedCourse, _savedSubmit)
            setSavedItems(_savedCourse)
            setSavedAssignment(_savedAssignment)
            setSavedSubmit(_savedSubmit)
        })
    }, [reload])

    const modalOk = () => {
        setModalVisible(false)
    }

    const modalCancel = () => {
        setModalVisible(false)
    }

    const unsave = (type, type_id) => {
        axios.delete(BASE_URL + '/saved', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
            },
            data: {
                user_id: sessionStorage.getItem('id'),
                type: type,
                type_id: type_id,
            }
        }).then(res => {
            console.log(res)
            setReload(!reload)
        })
    }

    const toSavedLocation = (pathString) => {
        console.log('ege')
        pathString = pathString.replace(/'/g, '"')
        let path = JSON.parse(pathString)
        if (path.course) {
            console.log('update course')
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
                params: {
                    id: path.course
                }
            };
            axios.get(BASE_URL + '/courses', config).then((res) => {
                setCourse(res.data.courses[0])
            })
        } else {
            setCourse('')
        }
        if (path.assignment) {
            console.log('update assignment')
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
                params: {
                    id: path.assignment
                }
            };
            axios.get(BASE_URL + '/assignments', config).then((res) => {
                setAssignment(res.data.assignments[0])
            })
        } else {
            setAssignment('')
        }
        if (path.student) {

            console.log('update student')
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
                params: {
                    id: path.student
                }
            };
            axios.get(BASE_URL + '/users', config).then((res) => {
                if (setStudent) {
                    setStudent(res.data)
                }
            })
        } else {
            setStudent('')
        }
    }

    let saveCourseListHtml = (
        <div></div>
    )
    let saveAssignmentHtml = (
        <div></div>
    )
    let saveSubmitHtml = (
        <div></div>
    )

    let menu = (type, type_id) => (
        <Menu
            style={{
                minWidth: '110px'
            }}
        >
            <Menu.Item
                style={{
                    borderRadius: 'inherit'
                }}
                onClick={() => unsave(type, type_id)}
            >
                <ScissorOutlined />
                <Typography.Text
                    style={{
                        margin: '10px',
                    }}
                >
                    Unsave
                </Typography.Text>
            </Menu.Item>
        </Menu>
    )
    if (savedItems.length > 0) {
        console.log(savedItems)
        saveCourseListHtml = savedItems.map((item, index) => {
            return (
                <>
                    <Card
                        id="bookmark-card"
                        bordered={true}
                        key={index}
                        style={{
                            margin: '10px'
                        }}
                    // hoverable={true}
                    // onClick={() => toSavedLocation(item.path)}
                    >
                        <div>
                            <Image
                                width={50}
                                src="img/icon/c.png"
                                preview={false}
                            />
                        </div>
                        {/* <Typography.Text strong>{item.type.toUpperCase()} : </Typography.Text> */}
                        <div className="bookmark-card-content">
                            <Link to="/courses">
                                <Typography.Text
                                    italic
                                    strong
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => toSavedLocation(item.path)}>{item.type_name}
                                </Typography.Text>
                            </Link>
                            <br />
                            <Typography.Text>Note: {item.description}</Typography.Text>
                        </div>

                        <div className="bookmark-card-options">
                            <Dropdown
                                trigger={['click']}
                                overlay={menu(item.type, item.type_id)}
                                placement='bottomRight'
                            >
                                <MoreOutlined />
                            </Dropdown><br />
                        </div>
                    </Card>
                    {/* <Divider /> */}
                </>
            )
        })
    }
    if (savedAssignment.length > 0) {
        saveAssignmentHtml = savedAssignment.map((item, index) => {
            return (
                <>
                    <Card
                        id="bookmark-card"
                        bordered={true}
                        key={index}
                        style={{
                            margin: '10px'
                        }}
                    // hoverable={true}
                    // onClick={() => toSavedLocation(item.path)}
                    >
                        <div>
                            <Image
                                width={50}
                                src="img/icon/a.png"
                                preview={false}
                            />
                        </div>
                        {/* <Typography.Text strong>{item.type.toUpperCase()} : </Typography.Text> */}
                        <div className="bookmark-card-content">
                            <Link to="/courses">
                                <Typography.Text
                                    italic
                                    strong
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => toSavedLocation(item.path)}>{item.type_name}
                                </Typography.Text>
                            </Link>
                            <br />
                            <Typography.Text>Note: {item.description}</Typography.Text>
                        </div>

                        <div className="bookmark-card-options">
                            <Dropdown
                                trigger={['click']}
                                overlay={menu(item.type, item.type_id)}
                                placement='bottomRight'
                            >
                                <MoreOutlined />
                            </Dropdown><br />
                        </div>
                    </Card>
                    {/* <Divider /> */}
                </>
            )
        })
    }
    if (savedSubmit.length > 0) {
        saveSubmitHtml = savedSubmit.map((item, index) => {
            return (
                <>
                    <Card
                        id="bookmark-card"
                        bordered={true}
                        key={index}
                        style={{
                            margin: '10px'
                        }}
                    // hoverable={true} 
                    // onClick={() => toSavedLocation(item.path)}
                    >
                        {/* <Typography.Text strong>{item.type.toUpperCase()} : </Typography.Text> */}
                        <div>
                            <Image
                                width={50}
                                src="img/icon/s.png"
                                preview={false}
                            />
                        </div>
                        <div className="bookmark-card-content">

                            <Link to="/courses">
                                <Typography.Text
                                    italic
                                    strong
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => toSavedLocation(item.path)}>{item.type_name}
                                </Typography.Text>
                            </Link>
                            <br />
                            <Typography.Text>Note: {item.description}</Typography.Text><br />
                        </div>
                        <div className="bookmark-card-options">
                            <Dropdown
                                trigger={['click']}
                                overlay={menu(item.type, item.type_id)}
                                placement='bottomRight'
                            >
                                <MoreOutlined />
                            </Dropdown><br />
                        </div>
                    </Card>
                    {/* <Divider /> */}
                </>
            )
        })
    }
    return (

        <>
            <Typography.Title level={3}>Bookmark</Typography.Title>
            <Divider>Courses</Divider>
            {saveCourseListHtml}
            <Divider>Assignments</Divider>
            {saveAssignmentHtml}
            <Divider>Submits</Divider>
            {saveSubmitHtml}
        </>
        // <Modal
        //     title="Bookmark Items"
        //     visible={modalVisible}
        //     onOk={modalOk}
        //     onCancel={modalCancel}
        //     style={{
        //         overflow: 'auto',
        //         height: 'calc(75vh)'
        //     }}
        // >
        //     {saveListHtml}
        // </Modal>
    )
}

export default Bookmark