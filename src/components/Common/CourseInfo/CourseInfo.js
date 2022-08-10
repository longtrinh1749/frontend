import axios from "axios";
import React, { useEffect, useState } from "react";
import { Descriptions, Button, Typography } from 'antd'
import EditCourseForm from '../../Teacher/EditCourse/EditCourseInfo'
import './CourseInfo.css'
import Statistic from "../../Teacher/Course/Statistic";

const CourseInfo = ({ course, refresh, setRefresh, setAssignment, setStudent }) => {
    let BASE_URL = 'http://127.0.0.1:5000/courses'
    const [courseInfo, setCourseInfo] = useState(1)
    console.log("CourseInfo ", course)
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                id: course.id
            }
        };
        axios.get(BASE_URL, config).then(res => setCourseInfo(res.data.courses[0]))
    }, [refresh])

    //Edit Course Form
    const [visible, setVisible] = useState(false);

    const onEdit = (values) => {
        console.log('Received values from form', values)
        setVisible(false)
    }
    return (
        <>
            <EditCourseForm courseInfo={courseInfo} visible={visible} onEdit={onEdit} onCancel={() => setVisible(false)} refresh={refresh} setRefresh={setRefresh}></EditCourseForm>
            <Statistic
                course={course}
                setAssignment={setAssignment}
                setStudent={setStudent}
            ></Statistic>
            <Descriptions
                bordered
                title="Class Information"
                size='middle'
                extra={<Button size="large" type="primary" onClick={() => {
                    setVisible(true);
                }}
                    style={{
                        marginRight: '10px'
                    }}>Manage Course</Button>}
            >
                <Descriptions.Item label="Name">{courseInfo.name ? courseInfo.name : 'None'}</Descriptions.Item>
                <Descriptions.Item label="School">{courseInfo.school ? courseInfo.school : 'None'}</Descriptions.Item>
                <Descriptions.Item label="Year">{courseInfo.school_year ? courseInfo.school_year : 'None'}</Descriptions.Item>
                <Descriptions.Item label="Class">{courseInfo.class ? courseInfo.class : 'None'}</Descriptions.Item>
                <Descriptions.Item label="Course Description">
                    None
                </Descriptions.Item>
                <Descriptions.Item label="Join code"><Typography.Text copyable>{courseInfo.id ? courseInfo.id : 'None'}</Typography.Text></Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default CourseInfo