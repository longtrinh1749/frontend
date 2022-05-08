import React from "react";
import { Modal } from "antd";

const Saved = ({ modalVisible, setModalVisible }) => {

    const modalOk = () => {
        setModalVisible(false)
    }

    const modalCancel = () => {
        setModalVisible(false)
    }
    return (
        <Modal title="Basic Modal" visible={modalVisible} onOk={modalOk} onCancel={modalCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default Saved