// https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-version-9
import React, { useEffect, useState } from "react";
import { Avatar, Col, Input, notification as noti, Row, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import './Chat.css'
import { getFCMToken, db } from "../../../firebase";
import { onMessageListener } from "../../../firebase";
import { getFirestore, getDocs, collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import axios from "axios";

const Chat = ({ courseId, assignmentId, userId }) => {
    const BASE_USER_URL = 'http://192.168.1.9:5000/users'
    const [isTokenFound, setIsTokenFound] = useState();
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [userInfo, setUserInfo] = useState()
    getFCMToken(setIsTokenFound)
    onMessageListener().then(payload => {
        console.log(payload);
        setNotification({ title: payload.notification.title, body: payload.notification.body })
        noti.open({
            message: notification.title,
            description: notification.body,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }).catch(err => console.log('failed: ', err));

    useEffect(() => {
        if (courseId) {
            // for mention feature
        }
    }, [])

    useEffect(() => {
        let params = {
            id: sessionStorage.getItem('id')
        }
        axios.get(BASE_USER_URL, { params }).then(res => setUserInfo(res.data))
    }, [])

    // Chat
    const [messages, setMessages] = useState([])

    useEffect(() => {
        console.log('course', courseId, 'assignment', assignmentId, 'user', userId)
        const q = query(collection(db, 'Chat'), orderBy('created_at', 'asc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let _messages = []
            snapshot.forEach((doc) => {
                if (courseId && assignmentId && userId) {
                    if (doc.data().user_name && doc.data().course_id == courseId && doc.data().assignment_id == assignmentId) {
                        if (doc.data().created_by == sessionStorage.getItem('id') || doc.data().created_to == sessionStorage.getItem('id')) {
                            _messages.push({
                                'text': doc.data().text,
                                'user_id': doc.data().user_id,
                                'user_name': doc.data().user_name,
                                'created_at': doc.data().created_at,
                            })
                        }
                    }
                } else if (courseId) {
                    if (doc.data().user_name && doc.data().course_id == courseId && !doc.data().assignment_id) {
                        _messages.push({
                            'text': doc.data().text,
                            'user_id': doc.data().user_id,
                            'user_name': doc.data().user_name,
                            'created_at': doc.data().created_at,
                        })
                    }
                }
            })
            setMessages(_messages)
        })
        return unsubscribe
    }, [courseId, assignmentId, userId])
    let messagesHtml = (
        <p>Welcome to Homewerk. You can find how to use our system here.</p>
    )
    if (courseId) {
        messagesHtml = (
            <p>Currently no messages in this thread.</p>
        )
    }
    if (messages.length > 0) {
        messagesHtml = messages.map((message) => {
            console.log(message)
            return (
                <div>
                    <Row>
                        <Col span={4}>
                            <Avatar shape="square" icon={<UserOutlined />} style={{
                                margin: '0 10px'
                            }} />
                        </Col>
                        <Col span={20}>
                            <b>
                                {message.user_name}
                            </b>
                            <i style={{
                                fontSize: '12px',
                                marginLeft: '5px'
                            }}>
                                {String(message.created_at)}
                            </i>
                            <p style={{
                                width: '100%',
                                wordBreak: 'break-word'
                            }}>
                                {message.text}
                            </p>
                        </Col>
                    </Row>
                </div>
            )
        })
    }
    return (
        <>
            <div id='messages-container' style={{
                overflow: 'auto',
                height: 'calc(100vh - 118px)'
            }}>
                {messagesHtml}
            </div>
            <Input.Group>
                <Input.TextArea id="chat-input" placeholder="Chat" autoSize={{ minRows: 2, maxRows: 4 }} onPressEnter={(e) => {
                    try {
                        e.preventDefault()
                        let _text = e.target.value
                        const docRef = addDoc(collection(db, "Chat"), {
                            text: _text,
                            created_at: moment().format('MMMM Do YYYY, h:mm:s a'),
                            user_id: sessionStorage.getItem('id'),
                            user_name: userInfo.name,
                            course_id: courseId ? courseId : '',
                            assignment_id: assignmentId ? assignmentId : '',
                            created_to: userId ? userId : '',
                            created_by: sessionStorage.getItem('id'),
                        });
                        console.log("Document written with ID: ", _text);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    } finally {
                        e.target.value = ''
                    }
                }} />
            </Input.Group>
        </>
    )
}

export default Chat;