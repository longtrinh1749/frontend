import React, { useEffect, useState } from "react";
import { Card, Divider, Modal, Typography } from "antd";
import axios from "axios";

const Saved = ({ modalVisible, setModalVisible, setAssignment, setCourse, setStudent }) => {

    const BASE_URL = 'http://192.168.1.12:5000'

    const [savedItems, setSavedItems] = useState(0)

    useEffect(() => {
        let params = {
            user_id: sessionStorage.getItem('id')
        }

        axios.get(BASE_URL + '/saved', { params }).then(res => {
            setSavedItems(res.data.saves)
        })
    }, [modalVisible])

    const modalOk = () => {
        setModalVisible(false)
    }

    const modalCancel = () => {
        setModalVisible(false)
    }

    let saveListHtml = (
        <div></div>
    )

    const toSavedLocation = (pathString) => {
        console.log('ege')
        pathString = pathString.replace(/'/g, '"')
        let path = JSON.parse(pathString)
        if (path.course) {
            console.log('update course')
            let params = {
                id: path.course
            }
            axios.get(BASE_URL + '/courses', { params }).then((res) => {
                setCourse(res.data.courses[0])
            })
        }
        if (path.assignment) {
            console.log('update assignment')
            let params = {
                id: path.assignment
            }
            axios.get(BASE_URL + '/assignments', { params }).then((res) => {
                setAssignment(res.data.assignments[0])
            })
        }
        if (path.student) {

            console.log('update student')
            let params = {
                id: path.student
            }
            axios.get(BASE_URL + '/users', { params }).then((res) => {
                if (setStudent) {
                    setStudent(res.data)
                }
            })
        }
        setModalVisible(false)
    }

    if (savedItems.length > 0) {
        saveListHtml = savedItems.map((item, index) => {
            return (
                <>
                    <Card bordered={true} key={index} hoverable={true} onClick={() => toSavedLocation(item.path)}>
                        <Typography.Text strong>{item.type.toUpperCase()} : </Typography.Text>
                        <Typography.Text italic strong>{item.type_name}</Typography.Text><br />
                        <Typography.Text strong>{"Description".toUpperCase()} : </Typography.Text>
                        <Typography.Text italic strong>{item.description}</Typography.Text>
                    </Card>
                    {/* <Divider /> */}
                </>
            )
        })
    }
    return (
        <Modal
            title="Bookmark Items"
            visible={modalVisible}
            onOk={modalOk}
            onCancel={modalCancel}
            style={{
                overflow: 'auto',
                height: 'calc(75vh)'
            }}
        >
            {saveListHtml}
        </Modal>
    )
}

export default Saved