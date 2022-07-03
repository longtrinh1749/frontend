import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Dropdown, Layout, Menu, Radio, Typography } from "antd";
import { UserOutlined, DownOutlined, RedoOutlined, NotificationOutlined, BellOutlined, SendOutlined } from '@ant-design/icons';
import axios from "axios";
import './Notifications.css'
const Notification = ({ notiFilterMenu, refresh, setRefresh, setCourse, setAssignment, setStudent }) => {

    const BASE_URL = 'http://192.168.1.12:5000'

    const [notifications, setNotifications] = useState(0)

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                user_id: sessionStorage.getItem('id')
            }
        };

        axios.get(BASE_URL + '/notifications', config).then((res) => {
            setNotifications(res.data.notifications)
            console.log("notifications", notifications)
        })
    }, [refresh])
    const { Meta } = Card;
    const notificationJump = (pathString) => {
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
        }
        setRefresh(!refresh)
    }
    let notificationsHtml = (
        <div></div>
    )
    if (notifications.length > 0) {
        notificationsHtml = notifications.map((noti, index) => {
            return (
                // <Card key={index} className="noti-card" hoverable={true} loading={false} onClick={() => notificationJump(noti.path)}>
                //     <Meta
                //         avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                //         title={noti.type}
                //         description={noti.description}
                //     />
                // </Card>
                <Menu.Item id='notification-menu'>
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={noti.type}
                        description={noti.description}
                    />
                </Menu.Item>
            )
        })
    }
    let menu = (
        <Menu
            style={{
                height: '550px',
                width: '450px',
            }}
            id='notifications-menu'
        >
            <Typography.Title
                level={3}
                style={{
                    margin: '20px'
                }}
            >
                Notifications
            </Typography.Title>
            <div className='notification-filters'>
                <Radio.Group defaultValue='all' buttonStyle="solid">
                    <Radio.Button value='all'>All</Radio.Button>
                    <Radio.Button value='course'>Courses</Radio.Button>
                    <Radio.Button value='assignment'>Assignments</Radio.Button>
                    <Radio.Button value='conversation'>Conversations</Radio.Button>
                </Radio.Group>
            </div>
            <div id='notifications-list'>
                {notificationsHtml}
            </div>
        </Menu>
    )
    return (
        <Dropdown
            trigger={['click']}
            overlay={menu}
            placement='bottom'
            arrow={{
                pointAtCenter: true
            }}
        >
            <BellOutlined style={{
                color: 'white',
                marginTop: '20px'
            }} />
        </Dropdown>
    )
    // return (
    //     <Layout.Sider id='main-content' width={'15%'} className="site-layout-background" style={{
    //         overflow: 'auto',
    //         height: "calc(100vh - 64px)",
    //         padding: '0 5px 0 5px',
    //     }}>
    //         <Dropdown overlay={notiFilterMenu} trigger={['click']}>
    //             <Button id="noti-filter-button" shape="round" type="primary">
    //                 <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    //                     Filter <DownOutlined />
    //                 </a>
    //             </Button>
    //         </Dropdown>
    //         <BellOutlined />
    //         {notificationsHtml}
    //     </Layout.Sider>
    // )
}

export default Notification