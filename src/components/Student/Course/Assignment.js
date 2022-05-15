import React, { useEffect, useState } from "react";
import { Descriptions, Divider, Upload, Modal, Button, Image, notification, Typography } from "antd";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './Assignment.css'
import axios from "axios";
import { upload } from "@testing-library/user-event/dist/upload";

const Assignment = ({ assignment, refresh, setRefresh }) => {
    let BASE_ASM_URL = 'http://192.168.1.10:5000/assignments'
    let BASE_SUBMIT_URL = 'http://192.168.1.10:5000/submits'
    let BASE_WORK_URL = 'http://192.168.1.10:5000/work'

    // Data
    const [asmData, setAsmData] = useState(false)
    const [submitData, setSubmitData] = useState(false)
    const [worksData, setWorksData] = useState([])
    // UI effect
    const [handin, setHandin] = useState(false)

    useEffect(() => {
        let params = {
            id: assignment.id
        }
        axios.get(BASE_ASM_URL, { params }).then(res => {
            setAsmData(res.data.assignments[0])
            console.log('Assignment Data:', asmData)

            params = {
                user_id: sessionStorage.getItem('id'),
                assignment_id: res.data.assignments[0].id,
            }

            axios.get(BASE_SUBMIT_URL, { params }).then(res => {
                setSubmitData(res.data.submits[0])
                console.log('Submitted:', submitData)

                params = {
                    submit_id: res.data.submits[0] ? (res.data.submits[0].id) : 0,
                }

                axios.get(BASE_WORK_URL, { params }).then(res => {
                    setWorksData(res.data.works)
                    console.log('Work:', worksData)
                    setFileList(res.data.works.map((workData) => {
                        return {
                            id: workData.id,
                            status: 'done',
                            url: workData.image_path,
                        }
                    }))
                })
            })
        })
    }, [refresh])

    let handinText = 'Hand in'
    if (handin) handinText = 'Undo hand-in'

    const onHandin = () => {
        if (handin) {
            setHandin(!handin)
            console.log(submitData)
            axios.put(BASE_SUBMIT_URL, {
                id: submitData ? submitData.id : 0,
                status: 'submitted',
            })
        } else {
            console.log(submitData)
            if (fileList.length == 0) {
                notification.open({
                    message: 'Cannot handin',
                    description:
                        'Cannot handin without any file submitted!',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            } else {
                setHandin(!handin)
                axios.put(BASE_SUBMIT_URL, {
                    id: submitData ? submitData.id : 0,
                    status: 'handed in',
                })
            }
        }
    }

    const onFileChange = (file, fileList) => {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    }

    // Submit
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState(
        [
            // {
            //     uid: '-1',
            //     name: 'image.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // },
        //     {
        //         uid: '-2',
        //         name: 'image.png',
        //         status: 'done',
        //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //     },
        //     {
        //         uid: '-3',
        //         name: 'image.png',
        //         status: 'done',
        //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //     },
        //     {
        //         uid: '-4',
        //         name: 'image.png',
        //         status: 'done',
        //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //     },
        //     {
        //         uid: '-xxx',
        //         percent: 50,
        //         name: 'image.png',
        //         status: 'uploading',
        //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //     },
        //     {
        //         uid: '-5',
        //         name: 'image.png',
        //         status: 'error',
        //     },
        ]
    )

    let uploadFile = (file) => {
        return new Promise((resolve) => {
            let formData = new FormData()
            formData.append('file', file)
            formData.append('assignment_id', asmData.id)
            formData.append('user_id', sessionStorage.getItem('id'))
            axios.post(BASE_WORK_URL, formData).then(function (response) {
                setRefresh(!refresh)
                console.log(response)
            })
            resolve(true)
        })
    }

    let deactivateWork = (file) => {
        return new Promise((resolve) => {
            console.log('file:', file)
            axios.put(BASE_WORK_URL, {
                id: file.id,
                active: false,
            })
            setRefresh(!refresh)
            resolve(true)
        });
    }

    let handleCancel = () => setPreviewVisible(false)

    let handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }

    let handleChange = ({ files }) => setFileList(files)

    let getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    let resultHtml = worksData.map(workData => {
        if (workData.result_path) {
            return (
                <Image
                    width={200}
                    src={workData.result_path}
                />
            )
        }
    })
    return (
        <>
            <Typography.Title level={4} italic={true} style={{
                display: 'inline-block',
            }}>{asmData.name}</Typography.Title>
            <Descriptions title='' layout="vertical" size="middle">
                <Descriptions.Item label="Due"><i>{asmData.due}</i></Descriptions.Item>
                <Descriptions.Item label="Description">
                    <i>Doing homework 5 in page 23</i>
                </Descriptions.Item>
                <Descriptions.Item label="Score"><i>{submitData ? (submitData.result ? submitData.result : 'None') : 'None'}</i></Descriptions.Item>
                <Descriptions.Item label="Instruction" span={3}><i>{asmData.instruction ? asmData.instruction : 'None'}</i></Descriptions.Item>
            </Descriptions>
            <Divider />
            <>
                <Typography.Title level={4} italic={true} style={{
                    display: 'inline-block',
                }}>Your works:</Typography.Title>
                <Button type="primary" style={{ float: 'right' }} size='large' onClick={onHandin}>{handinText}</Button>
                <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    action={uploadFile}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={() => {
                        setRefresh(!refresh)
                    }}
                    disabled={handin}
                    // onRemove={(file) => console.log('Work id', file.id)}
                    onRemove={deactivateWork}
                >
                    {/* {fileList.length >= 8 ? null : uploadButton} */}
                    {uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
            <Divider />
            <Typography.Title level={4} italic={true} style={{
                display: 'inline-block',
            }}>Results:</Typography.Title>
            <Typography.Text strong={true} style={{
                display: 'block',
            }}>
                Teacher notes:
                <Typography.Text italic={true} type="danger" style={{
                    marginLeft: '5px',
                }}>
                    {submitData ? submitData.comment : ''}
                </Typography.Text>
            </Typography.Text>
            <Descriptions title="" layout="vertical">
                <Descriptions.Item>
                    {resultHtml}
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default Assignment