import React, { useState } from "react";
import { Descriptions, Divider, Upload, Modal, Button, Image } from "antd";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './Assignment.css'

const Assignment = () => {
    const [handin, setHandin] = useState(false)
    
    let handinText = 'Hand in'
    if (handin) handinText = 'Undo hand-in'

    const onHandin = () => {
        setHandin(!handin)
    }

    const onFileChange = (file, fileList) => {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    }

    return (
        <>
            <Descriptions title="Bai 5 SGK trang 23" layout="vertical">
                <Descriptions.Item label="Due"><b>12:00 23/04/22</b></Descriptions.Item>
                <Descriptions.Item label="Description">
                    <b>Doing homework 5 in page 23</b>
                </Descriptions.Item>
                <Descriptions.Item label="Score"><b>TBD</b></Descriptions.Item>
                <Descriptions.Item label="Instruction" span={3}><i>For question b, do it with 3 different way</i></Descriptions.Item>
            </Descriptions>
            <Divider />
            <Button type="primary" style={{ float: 'right' }} onClick={onHandin}>{handinText}</Button>
            <Upload action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'} onChange={onFileChange} defaultFileList={[
                {
                    uid: '1',
                    name: 'xxx.png',
                    status: 'error',
                    response: 'Server Error 500', // custom error message to show
                    url: 'http://www.baidu.com/xxx.png',
                }]}>
                {// can use fileList to modify order of file
                }
                <Button icon={<UploadOutlined />} disabled={handin}>Upload</Button>
            </Upload>
            <Divider />
            <Descriptions title="Result" layout="vertical">
                <Descriptions.Item>
                    <Image
                        width={200}
                        src="img/sample/data/AssignmentDetail/Trần Vũ Tuấn Kiệt/trang_0.jpg"
                    />
                    <Image
                        width={200}
                        src="img/sample/data/AssignmentDetail/Trần Vũ Tuấn Kiệt/trang_1.jpg"
                    />
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default Assignment