import { Button, Input, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import './Saved.css'

const Saved = ({ object, type, refresh, style }) => {
    const BASE_URL = 'http://192.168.1.12:5000'

    const [bookmarkButton, setBookmarkButton] = useState('Bookmark')

    const [modalVisible, setModalVisible] = useState(false)

    let bookmarkDescription = useRef('')

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                user_id: sessionStorage.getItem('id'),
                type: type,
                type_id: object?.id,
            }
        };
        axios.get(BASE_URL + '/saved', config).then(res => {
            if (res.data.saves.length > 0) {
                setBookmarkButton('Bookmarked')
            }
        })
    }, [refresh])

    const callBookmarkAPI = () => {
        console.log('Object', object)
        if (bookmarkButton == 'Bookmark') {
            axios.post(BASE_URL + '/saved', {
                user_id: sessionStorage.getItem('id'),
                type: type,
                type_id: object.id,
                type_name: object.name,
                description: bookmarkDescription.current
            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            }).then(res => {
                console.log(res)
                setBookmarkButton('Bookmarked')
            })
        } else {
            axios.delete(BASE_URL + '/saved', {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
                },
                data: {
                    user_id: sessionStorage.getItem('id'),
                    type: type,
                    type_id: object.id,
                }
            }).then(res => {
                console.log(res)
                setBookmarkButton('Bookmark')
            })
        }
        setModalVisible(false)
    }

    const bookmarkClick = () => {
        if (bookmarkButton == 'Bookmark') {
            setModalVisible(true)
        } else {
            callBookmarkAPI()
        }
    }

    const modalCancel = () => {
        setModalVisible(false)
    }
    return (
        <>
            <Button id='saved-button' onClick={bookmarkClick} style={style}>
                {bookmarkButton}
            </Button>
            <Modal
                title="Create new Bookmark"
                visible={modalVisible}
                onOk={callBookmarkAPI}
                onCancel={modalCancel}

            >
                <Input placeholder="Bookmark descripton" onChange={(e) => bookmarkDescription.current = e.target.value}></Input>
            </Modal>
        </>
    )
}

export default Saved