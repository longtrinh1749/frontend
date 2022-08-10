import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Dropdown, Layout, Menu, Radio, Typography } from "antd";
import { UserOutlined, DownOutlined, RedoOutlined, NotificationOutlined, BellOutlined, SendOutlined } from '@ant-design/icons';
import axios from "axios";
import './Notifications.css'
import { Link, BrowserRouter as Router } from "react-router-dom";
const Notification = ({ notiFilterMenu, refresh, setRefresh, setCourse, setAssignment, setStudent }) => {

    const BASE_URL = 'http://127.0.0.1:5000'

    const [notifications, setNotifications] = useState(0)
    const [showNotifications, setShowNotifications] = useState(0)
    const [notificationVisible, setNotificationVisible] = useState(false)

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                user_id: sessionStorage.getItem('id')
            }
        };

        axios.get(BASE_URL + '/notifications', config).then((res) => {
            setNotifications(res.data.notifications)
            setShowNotifications(res.data.notifications)
            console.log("notifications", notifications)
        })
    }, [refresh, notificationVisible])
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
    if (showNotifications.length > 0) {
        notificationsHtml = showNotifications.map((noti, index) => {
            return (
                // <Card key={index} className="noti-card" hoverable={true} loading={false} onClick={() => notificationJump(noti.path)}>
                //     <Meta
                //         avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                //         title={noti.type}
                //         description={noti.description}
                //     />
                // </Card>
                <Link to="/courses">
                    <Menu.Item id='notification-menu' onClick={() => notificationJump(noti.path)}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={noti.type}
                            description={noti.description}
                        />
                    </Menu.Item>
                </Link>
            )
        })
    }
    let filterNotification = (filterType) => {
        switch (filterType) {
            case 'all':
                setShowNotifications(notifications)
                break
            case 'course':
                setShowNotifications(notifications.map((notification, index) => {
                    if (notification.type == 'Course') {
                        return notification
                    }
                }).filter((notification) => {
                    return notification != undefined
                }))
                break
            case 'assignment':
                setShowNotifications(notifications.map((notification, index) => {
                    if (notification.type == 'Assignment' || notification.type == 'Work') {
                        return notification
                    }
                }).filter((notification) => {
                    return notification != undefined
                }))
                break
            case 'conversation':
                setShowNotifications(notifications.map((notification, index) => {
                    if (notification.type == 'Mention') {
                        return notification
                    }
                }).filter((notification) => {
                    return notification != undefined
                }))
                break
        }
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
                    <Radio.Button value='all' onClick={() => filterNotification('all')}>All</Radio.Button>
                    <Radio.Button value='course' onClick={() => filterNotification('course')}>Courses</Radio.Button>
                    <Radio.Button value='assignment' onClick={() => filterNotification('assignment')}>Assignments</Radio.Button>
                    <Radio.Button value='conversation' onClick={() => filterNotification('conversation')}>Conversations</Radio.Button>
                </Radio.Group>
            </div>
            <Router>
                <div id='notifications-list'>
                    {notificationsHtml}
                </div>
            </Router>
        </Menu>
    )
    return (
        <Dropdown
            trigger={['click']}
            overlay={menu}
            placement='bottomLeft'
            arrow={{
                pointAtCenter: true
            }}
            onVisibleChange={() => setNotificationVisible(!notificationVisible)}
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