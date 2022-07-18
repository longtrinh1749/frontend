import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js'
import axios from "axios";
import fileDownload from 'js-file-download';

const Statistic = ({course, setAssignment, setStudent}) => {
    const BASE_URL = 'http://192.168.1.12:5000'
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([])
    const [columns, setColumns] = useState([])

    const [students, setStudents] = useState(0)

    const toStudentPage = (assignment, student) => {
        console.log('ToStudentPage', assignment)
        console.log('ToStudentPage', student)
        setIsModalVisible(false)
        setAssignment(assignment)
        setStudent(student)
    }

    useEffect(() => {
        console.log('Yo statistic')
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                course_id: course.id,
                display: 1,
            }
        };
        axios.get(BASE_URL + '/grading/students', config).then(res => {
            setStudents(res.data.students)
            let s = res.data.students
            console.log("StudentRes", s)
            let ds = s.map((student, index) => {
                let new_student = {
                    name: student.name
                }
                for (let i = 0; i < student.assignments.length; i++) {
                    new_student[student.assignments[i].name] = student.assignments[i].score
                    if (student.assignments[i].status != 'graded') {
                        new_student[student.assignments[i].name] = '-'
                        new_student['student'] = student
                    }
                }
                return new_student
            })
            console.log('Datasource', ds)

            setDataSource(ds)

            let c = []
            if (s.length > 0) {
                c = s[0].assignments.map((assignment, index) => {
                    return {
                        title: assignment.name,
                        dataIndex: assignment.name,
                        key: assignment.name,
                        render: (_, record) => (
                            <a onClick={() => toStudentPage(assignment, record['student'])}>{record[assignment.name]}</a>
                        )
                    }
                })
                setColumns(c)
            }

            c.unshift(
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    fixed: 'left',
                },
            )
            setColumns(c)
        }
        )
    }, [isModalVisible])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        axios({
            url: BASE_URL + "/grading/excel",
            method: "GET",
            responseType: 'blob',
            params: {
                course_id: course.id
            }
        }).then(res => {
            // const url = window.URL.createObjectURL(new Blob([res.data]))
            // const link = document.createElement('a')
            // link.href = url
            // link.setAttribute('download', 'file.xlsx')
            // link.click()
            console.log(res.headers['content-disposition'].split(";")[1].split("filename=")[1].split("\"")[1])
            fileDownload(res.data, res.headers['content-disposition'].split(";")[1].split("filename=")[1].split("\"")[1])
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // const dataSource = []
    // const columns = []

    // if (students.length > 0) {
    //     setDataSource(students.map((student, index) => {
    //         let new_student = {
    //             name: student.name
    //         }
    //         for (let i = 0; i < student.assignments.length; i++) {
    //             let assignments = students.assignments
    //             new_student[assignments[i].name] = assignments[i].score
    //         }
    //         return new_student
    //     }))
    // }

    // if (students.length > 0) {
    //     setColumns(students[0].assignments.map((assignment, index) => {
    //         return {
    //             title: assignment.name,
    //             dataIndex: assignment.name,
    //             key: assignment.name,
    //         }
    //     }))
    //     columns.unshift(
    //         {
    //             title: 'Name',
    //             dataIndex: 'name',
    //             key: 'name',
    //             fixed: 'left',
    //         },
    //     )
    //     setColumns(columns)
    // }


    return (
        <>
            <Button type="primary" size="large" onClick={showModal} style={{
                float: 'right',
                marginRight: '10px',
            }}>
                Scoreboard
            </Button>
            <Modal
                title="Student Transcript"
                centered
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Export
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                ]}
                width={1000}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ defaultPageSize: 8, showSizeChanger: true }}
                    scroll={{
                        x: 1500,
                    }}
                />
            </Modal>
        </>
    );
}

export default Statistic