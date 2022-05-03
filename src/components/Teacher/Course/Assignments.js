import React, { useEffect, useState } from "react";
import { Card, Col, Row, Divider, DatePicker } from 'antd'
import CourseInfo from "../../Common/CourseInfo/CourseInfo";
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import CreateAssignment from './CreateAssignment/CreateAssignment'
import moment from 'moment';

const Assignments = ({ token, course, setAssignment, refresh, setRefresh }) => {

    const BASE_URL = 'http://127.0.0.1:5000/assignments'

    const [assignments, setAssignments] = useState(1)
    useEffect(() => {
        console.log('Call GetAssignments')
        let params = {
            'user_id': sessionStorage.getItem('id'),
            'course_id': course.id,
        }

        axios.get(BASE_URL, { params }).then((res) => {
            console.log(res.data.assignments)
            setAssignments(res.data.assignments)
        })
    }, [refresh])
    let assignmentsHTML = (
        <div></div>
    )
    if (assignments.length > 0) {
        assignmentsHTML = assignments.map((assignment, index) => {
            return (
                <Col span={8} key={index}>
                    <Card hoverable={true} title={assignment.name} bordered={true} assignmentid={assignment.id} onClick={() => setAssignment({ 'name': assignment.name, 'id': assignment.id })}>
                        <p style={{ fontSize: 'smaller' }}>{moment(assignment.due, 'YYYY-MM-DD HH:mm').format('HH:mm DD-MM-YYYY')}</p>
                        <p style={{ fontSize: 'smaller' }}>{course.name}</p>
                        <p style={{ fontSize: 'smaller' }}>Đã nộp: {assignment.submit}/{course.total}</p>
                        <p style={{ fontSize: 'smaller' }}>Đã chấm: {assignment.graded}/{course.total}</p>
                    </Card>
                </Col>
            )
        })
    }
    // Create Assignment Form
    const [visible, setVisible] = useState(false);

    const onEdit = (values) => {
        console.log('Received values from form', values.due.format("YYYY-MM-DD HH:mm:ss"))
        setVisible(false)
    }
    return (
        <div className="site-card-wrapper">
            <CourseInfo course={course} refresh={refresh} setRefresh={setRefresh}></CourseInfo>
            <Divider />
            <b>Assignments</b>
            <Row gutter={16}>
                {assignmentsHTML}
                <Col span={8}>
                    <Card hoverable={true} title={'Create Assignment'} bordered={true} onClick={() => setVisible(true)} style={{ height: '100%', textAlign: 'center' }}>
                        <PlusOutlined style={{ textAlign: 'center', fontSize: '200%' }} />
                    </Card>
                </Col>
                <CreateAssignment course={course} visible={visible} onEdit={onEdit} onCancel={() => setVisible(false)}></CreateAssignment>
            </Row>
        </div>
    )
}

export default Assignments