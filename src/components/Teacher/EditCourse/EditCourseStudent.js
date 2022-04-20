import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import {List, Skeleton, Avatar} from 'antd'
import './EditCourseStudent.css'

const ManageStudentList = ({courseInfo}) => {  
    let BASE_URL = 'http://192.168.1.13:5000/users/course/students'

    const [students, setStudents]= useState([{name:'Error'}])

    useEffect(() => {
        let params = {
            course_id: courseInfo.id
        }
        axios.get(BASE_URL, {params}).then(res => {setStudents(res.data.students); console.log(res)})
    }, [])
    
    let studentsHtml = students.map((student, index) => {
        return (
            <h1></h1>
        )
    })
    return (
        <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={students}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit" className="danger-a">remove</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.class}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    )
}

export default ManageStudentList