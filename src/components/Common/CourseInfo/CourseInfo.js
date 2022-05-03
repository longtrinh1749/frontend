import axios from "axios";
import React, { useEffect, useState } from "react";
import { Descriptions, Button } from 'antd'
import EditCourseForm from '../../Teacher/EditCourse/EditCourseInfo'
import './CourseInfo.css'

const CourseInfo = ({ course, refresh, setRefresh }) => {
    let BASE_URL = 'http://127.0.0.1:5000/courses'
    const [courseInfo, setCourseInfo] = useState(1)
    console.log("CourseInfo ", course)
    useEffect(() => {
        let params = {
            id: course.id
        }
        axios.get(BASE_URL, { params }).then(res => setCourseInfo(res.data.courses[0]))
    }, [refresh])

    //Edit Course Form
    const [visible, setVisible] = useState(false);

    const onEdit = (values) => {
        console.log('Received values from form', values)
        setVisible(false)
    }
    return (
        <>
            <EditCourseForm courseInfo={courseInfo} visible={visible} onEdit={onEdit} onCancel={() => setVisible(false)} refresh={refresh}></EditCourseForm>
            <Descriptions
                bordered
                title="Class Information"
                size='middle'
                extra={<Button size="large" type="primary" onClick={() => {
                    setVisible(true);
                }}>Edit</Button>}
            >
                <Descriptions.Item label="Name">{courseInfo.name ? courseInfo.name : 'None'}</Descriptions.Item>
                <Descriptions.Item label="School">{courseInfo.school ? courseInfo.school : 'None'}</Descriptions.Item>
                <Descriptions.Item label="Year">{courseInfo.school_year ? courseInfo.school_year : 'None'}</Descriptions.Item>
                <Descriptions.Item label="Class">{courseInfo.class ? courseInfo.class : 'None'}</Descriptions.Item>
                <Descriptions.Item label="Course Description">
                    This course is meant for students who is extremely good
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default CourseInfo