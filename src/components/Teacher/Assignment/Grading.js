import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Radio, Button, Typography, InputNumber, Input, Tooltip, notification, Form } from 'antd'
import axios from "axios";
import { fabric } from 'fabric'
import html2canvas from "html2canvas";
import './Grading.css'
import Saved from "../../Common/Saved/Saved";

const Grading = ({ assignment, student, token, course, refresh, setAssignment, setCourse, setStudent }) => {
    /*
        Handle resize: https://stackoverflow.com/questions/62846043/react-js-useeffect-with-window-resize-event-listener-not-working
    */

    // Constaint
    const objectConst = {
        TYPE_RIGHT: 'right',
        TYPE_WRONG: 'wrong',
        TYPE_COMMENT: 'comment',
        RIGHT_URL: 'img/right1.png',
        WRONG_URL: 'img/wrong1.png',
    }

    const toolConst = {
        PEN: 'pen',
        COMMENT: 'comment',
        CHECK: 'check',
    }

    // URL
    let BASE_WORK_URL = 'http://127.0.0.1:5000/work'
    let BASE_SUBMIT_URL = 'http://127.0.0.1:5000/submits'
    let BASE_GRADING_URL = 'http://127.0.0.1:5000/grading'

    // Data state
    const [worksData, setWorksData] = useState([])
    const [submitData, setSubmitData] = useState(false)
    const [canvasHtml, setCanvasHtml] = useState(false)
    const [objects, setObjects] = useState([])
    const [selectState, setSelectState] = useState('Select')
    const [gradingForm] = Form.useForm()

    // UI State
    let canvasRender = useRef(false)
    let canvases = useRef([])
    let canvasState = useRef(false)
    let tool = useRef(toolConst.PEN)
    let commentState = useRef(false)
    let commentValue = useRef('')
    const [commentInputSpan, setCommentInputSpan] = useState()
    const [objectSpans, setObjectSpans] = useState()
    // const [tool, setTool] = useState()

    //Data
    useEffect(() => {
        console.log('Student', student)
        console.log('Assignment', assignment)
        console.log('Token', token)
        console.log('Course', course)
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                user_id: student.id,
                assignment_id: assignment.id,
            }
        };
        axios.get(BASE_SUBMIT_URL, config).then(res => {
            setSubmitData(res.data.submits[0])
            console.log('Submits', res.data.submits[0])
            gradingForm.setFieldsValue({
                score: res.data.submits[0].result,
                comment: res.data.submits[0].comment
            })
            score.current = res.data.submits[0].result
            finalComment.current = res.data.submits[0].comment
        })
        axios.get(BASE_WORK_URL, config).then(res => {
            setWorksData(res.data.works)
            console.log('Works', worksData)
        })
    }, [refresh])

    // Render
    const [renderCanvas, setRenderCanvas] = useState(false)
    const [initFabric, setInitFabric] = useState(false)

    // UI
    useEffect(() => {
        console.log('Tool Changed')
    }, [tool.current])

    useEffect(() => {
        console.log("GetElementByClassName", document.getElementsByClassName('image-work'))
        let _canvasHtml = worksData.map((work, index) => {
            let _image = document.getElementById('work' + work.id)
            if (!_image) return
            let _width = _image.clientWidth
            let _height = _image.clientHeight
            return (
                <canvas id={'canvas' + work.id} className='canvas-work' style={{ border: "1px solid" }} width={_width} height={_height} />
            )
        })
        setCanvasHtml(_canvasHtml)
        if (!canvasState.current) {
            let _objects = []
            for (let i = 0; i < worksData.length; i++) {
                let _canvasId = 'canvas' + worksData[i].id
                if (document.getElementById(_canvasId)) {
                    canvasState.current = true
                }
                canvases.current[i] = new fabric.Canvas(_canvasId, {
                    isDrawingMode: false,
                    freeDrawingBrush: new fabric.PencilBrush({ width: 2 }),
                })
                canvases.current[i].freeDrawingBrush.color = 'red'
                canvases.current[i].freeDrawingBrush.width = 3
                // For grading to image

                // let _img = document.getElementById('work' + worksData[i].id)
                // let _imgInstance = new fabric.Image(_img, {
                //     scaleX: _img.width / _img.naturalWidth,
                //     scaleY: _img.height / _img.naturalHeight,
                // })
                // canvases.current[i].add(_imgInstance)

                // Add symbol right

                // _img = document.createElement('img')
                // _img.src = objectConst.RIGHT_URL
                // let imageInstance = new fabric.Image(_img)
                // canvases.current[i].add(imageInstance)

                console.log("Canvas JSON", canvases.current[i].toJSON())

                // load JSON from backend
                if (worksData[i].canvas_json) {
                    canvases.current[i].loadFromJSON(worksData[i].canvas_json, function () {
                        canvases.current[i].renderAll();
                    }, function (o, object) {
                        console.log(o, object)
                    })
                }
                for (let j = 0; j < worksData[i].objects.length; j++) {
                    let o = worksData[i].objects[j]
                    console.log('Object', o)
                    _objects.push({ left: o.left, top: o.top, image: o.image, workId: o.work_id, type: o.type, widthSize: o.width_size, value: o.value })
                    console.log('Objects', _objects)
                }
                setObjects(_objects)
                updateObjectSpan()
                console.log('Object Load', objects)
                // Click handler
                canvases.current[i].on('mouse:down', function (options) {
                    if (tool.current == toolConst.CHECK) {
                        addSymbol(options.e, i, worksData[i].id)
                    } else if (tool.current == toolConst.COMMENT) {
                        initComment(options.e, i, worksData[i].id)
                    }
                })
            }
        }
        if (document.getElementsByClassName('canvas-work').length == 0) {
            setRenderCanvas(true)
        }
    }, [canvasRender, refresh, document.getElementsByClassName('canvas-work')])

    let worksHtml = worksData.map((work, index) => {
        return (
            <img id={"work" + work.id} index={index} src={work.image_path} className="image-work" crossOrigin="anonymous" />
        )
    })
    // ?
    if (document.getElementById('canvas-layer')) {
        if (document.getElementById('canvas-layer').innerHTML == '') {
            canvasRender.current = !canvasRender.current
        }
    } else {
        canvasRender.current = !canvasRender.current
    }
    // Tool

    // Functions
    const addSymbol = (e, i, workId) => {
        console.log('Click to addObjec', e, i, workId)
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        let _image = document.getElementById('work' + workId)
        objects.push({ left: x, top: y, image: i, workId: workId, type: objectConst.TYPE_RIGHT, widthSize: _image.clientWidth })
        console.log('Current objects', objects)
        let _newObjects = objects
        setObjects(_newObjects)
        updateObjectSpan()
    }

    const updateObjectSpan = () => {
        setObjectSpans(objects.map((object, index) => {
            let _imgHeight = 0
            for (let i = 0; i < object.image; i++) {
                _imgHeight += document.getElementById('work' + worksData[i].id).clientHeight
                // console.log('_imgHeight', _imgHeight)
            }
            if (object.type == objectConst.TYPE_COMMENT) {
                return (
                    <span className="comment-container" onClick={(e) => objectClick(e, object.left, object.top)} style={{ left: 8 + object.left, top: 4 + (object.top + _imgHeight), color: "red", fontWeight: "bold" }}>
                        {object.value}
                    </span>
                )
            } else {
                let _src = objectConst.RIGHT_URL
                if (object.type == objectConst.TYPE_WRONG) _src = objectConst.WRONG_URL
                return (
                    <span className="symbol-container" style={{ left: object.left, top: (object.top + _imgHeight) }} onClick={(e) => objectClick(e, object.left, object.top)}>
                        <img className={"symbol object symbol" + object.workId} src={_src} />
                    </span>
                )
            }
        }))
    }

    const objectClick = (e, l, t) => {
        var objectIndexToRemove = -1
        console.log("mouse location ", l, t);
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].left == l && objects[i].top == t) {
                if (objects[i].type == objectConst.TYPE_RIGHT) {
                    objects[i].type = objectConst.TYPE_WRONG
                    break
                } else if (objects[i].type == objectConst.TYPE_WRONG || objects[i].type == objectConst.TYPE_COMMENT) {
                    objectIndexToRemove = i
                    break
                }
            }
        }
        if (objectIndexToRemove > -1) {
            objects.splice(objectIndexToRemove, 1)
        }
        setObjects(objects)
        updateObjectSpan()
    }

    const initComment = (e, i, workId) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        let _imgHeight = 0
        for (let j = 0; j < i; j++) {
            _imgHeight += document.getElementById('work' + worksData[j].id).clientHeight
        }
        commentState.current = !commentState.current
        console.log("commentState", commentState.current)
        if (commentState.current) {
            setCommentInputSpan(
                <span className="input-comment-container" style={{ left: x, top: (y + _imgHeight), color: "red", fontWeight: "bold" }}>
                    <form x={x} y={y} onSubmit={(e) => handleSubmit(e, x, y, i, workId)}>
                        <input type="text" style={{ backgroundColor: "rgba(0,0,0,0.2)", color: "red", fontWeight: "bold", textAlign: "initial", padding: "unset" }}
                            onChange={(e) => handleCommentChange(e)}></input>
                    </form>
                </span>
            )
        } else {
            setCommentInputSpan(<></>)
        }
    }

    function handleCommentChange(e) {
        commentValue.current = e.target.value
    }

    function handleSubmit(e, x, y, i, workId) {
        e.preventDefault()
        commentState.current = !commentState.current
        setCommentInputSpan(<></>)
        let _image = document.getElementById('work' + workId)
        objects.push({ left: x, top: y, image: i, workId: workId, type: objectConst.TYPE_COMMENT, value: commentValue.current, widthSize: _image.clientWidth })
        setObjects(objects)
        updateObjectSpan()
    }

    const saveGrading = (e) => {
        for (let i = 0; i < worksData.length; i++) {
            let _canvasData = JSON.stringify(canvases.current[i].toJSON())
            let _objects = objects.map((object, index) => {
                if (object.workId == worksData[i].id) {
                    return object
                }
            })
            _objects.filter(n => n)
            console.log('Objects', _objects)
            axios.put(BASE_WORK_URL, {
                submit_id: submitData.id,
                result: score.current,
                comment: finalComment.current,
                id: worksData[i].id,
                canvas_json: _canvasData,
                objects: _objects
            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
        }
    }

    const rescoring = (e) => {
        for (let i = 0; i < worksData.length; i++) {
            canvases.current[i].loadFromJSON(JSON.parse('{"version":"5.2.1","objects":[]}'), function () {
                canvases.current[i].renderAll();
            }, function (o, object) {
                console.log(o, object)
            })
            let _canvasData = JSON.stringify(canvases.current[i].toJSON())
            objects.splice(0, objects.length)
            setObjects(objects)
            updateObjectSpan()
            axios.put(BASE_WORK_URL, {
                id: worksData[i].id,
                canvas_json: _canvasData,
                objects: objects
            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
        }
    }
    const deleteDrawing = () => {
        console.log('Select')
        setSelectState('Remove')
        for (let i = 0; i < worksData.length; i++) {
            // canvases.current[i].getActiveObject().remove()
            canvases.current[i].remove(canvases.current[i].getActiveObject())
        }
    }
    //
    const options = [
        { label: 'Select', value: 'select' },
        { label: 'Pen', value: toolConst.PEN },
        { label: 'Check', value: toolConst.CHECK },
        { label: 'Comment', value: toolConst.COMMENT },
    ];
    // final score
    let score = useRef('')
    let finalComment = useRef('')
    const scoreChange = (e) => {
        console.log(e.target.value)
        score.current = e.target.value
    }
    const onFinalCommentChange = (e) => {
        console.log(e.target.value)
        finalComment.current = e.target.value
    }
    const onGraded = (e) => {
        // Uncomment tat ca ok
        saveGrading()

        notification.open({
            message: 'Graded',
            description:
                'Success submit grading.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
        for (let j = 0; j < worksData.length; j++) {
            let formData = new FormData()
            console.log("Grading objects", objects)
            console.log("workData", worksData[j])
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].image == j) {
                    let o = objects[i]
                    if (o.type == objectConst.TYPE_COMMENT) {
                        let text = new fabric.Text(o.value, {
                            fontSize: 20,
                            top: o.top,
                            left: o.left,
                            fontWeight: 'bold',
                            fontFamily: 'san-serif',
                            fill: 'red',
                        })
                        canvases.current[j].add(text)
                    } else {
                        let _img = document.createElement('img')
                        if (o.type == objectConst.TYPE_RIGHT) {
                            console.log("asd")
                            _img.src = objectConst.RIGHT_URL
                        } else if (o.type == objectConst.TYPE_WRONG) {
                            _img.src = objectConst.WRONG_URL
                        }
                        let imageInstance = new fabric.Image(_img, {
                            left: o.left,
                            top: o.top,
                        })
                        console.log("keke", j)
                        canvases.current[j].add(imageInstance)
                    }
                    console.log("keke", canvases.current[j].toJSON())
                }
            }
            let _img = document.getElementById('work' + worksData[j].id)
            let _imgInstance = new fabric.Image(_img, {
                scaleX: _img.width / _img.naturalWidth,
                scaleY: _img.height / _img.naturalHeight,
            })
            console.log("Img Instance", _imgInstance)
            canvases.current[j].setBackgroundImage(_imgInstance, canvases.current[j].renderAll.bind(canvases.current[j]))

            html2canvas(document.getElementById('canvas' + worksData[j].id), {
                allowTaint: true,
            }).then(canvas => {
                console.log("Work Data", worksData[j].id)
                var img = canvas.toDataURL("image/png");
                var imgHtml = document.createElement('img');
                imgHtml.crossOrigin = 'anonymous'
                imgHtml.src = img;
                // document.getElementById('image-layer').append(imgHtml);

                formData.append('id', worksData[j].submit_id)
                formData.append('score', score.current)
                formData.append('comment', finalComment.current)
                console.log('Work data image', worksData[j].id)
                formData.append('work_id', worksData[j].id)
                formData.append('file', img)

                axios.put(BASE_GRADING_URL, formData, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    }
                })
            })
        }
    }
    //
    return (
        <>
            <div id="tool-container">
                <Saved
                    object={submitData}
                    type="submit"
                    setAssignment={setAssignment}
                    setCourse={setCourse}
                    setStudent={setStudent}
                    refresh={refresh}
                >

                </Saved>
                {/* <Button onClick={() => deleteDrawing()}>Delete</Button> */}
                <Radio.Group
                    // options={options}
                    onChange={(e) => {
                        tool.current = e.target.value
                        if (e.target.value != 'select') {
                            setSelectState('Select')
                        }
                        if (tool.current == toolConst.PEN) {
                            for (let i = 0; i < canvases.current.length; i++) {
                                canvases.current[i].isDrawingMode = true
                                canvases.current[i].freeDrawingBrush.color = 'red'
                                canvases.current[i].freeDrawingBrush.width = 3
                            }
                            // } else if (e.target.value == 'delete') {
                            //     deleteDrawing()

                        } else {
                            for (let i = 0; i < canvases.current.length; i++) {
                                canvases.current[i].isDrawingMode = false
                            }
                        }
                        console.log('Set tool to', tool)
                    }}
                    optionType="button"
                    buttonStyle="outline"
                    defaultValue={options[0].label}
                    style={{
                        display: 'inline',
                    }}
                >
                    <Radio.Button value='select' onClick={() => deleteDrawing()}>
                        {selectState}
                    </Radio.Button>
                    <Radio.Button value={toolConst.PEN}>Pen</Radio.Button>
                    <Radio.Button value={toolConst.CHECK}>Check</Radio.Button>
                    <Radio.Button value={toolConst.COMMENT}>Comment</Radio.Button>
                </Radio.Group>
            </div>
            <Row>
                <Col span={24} style={{ backgroundColor: 'lightcyan' }}>

                    <div className="img-layer layer" id="image-layer">
                        {worksHtml}
                        <Form
                            form={gradingForm}>
                            <Row style={{ backgroundColor: 'white' }}>
                                <Col flex="20%" className="final-grade score">
                                    <Typography.Title style={{ color: 'red', textAlign: 'center' }}><i>Score</i></Typography.Title>
                                    <Form.Item
                                        name="score"
                                        rules={[{ required: false, pattern: new RegExp(/^([0-9]|10)$/), message: "Only integer between 0 and 10" }]}
                                    >
                                        <Input onChange={scoreChange}
                                            // value={submitData ? submitData.result : undefined}
                                            style={{
                                                'fontSize': '50px',
                                                border: 'none',
                                                textAlign: 'center',
                                            }} />
                                    </Form.Item>
                                </Col>
                                <Col flex="auto" className='final-grade criticism'>
                                    <Typography.Title style={{ color: 'red', textAlign: 'center' }}><i>Comment</i></Typography.Title>
                                    <Form.Item
                                        name="comment"
                                    >
                                        <Input.TextArea onChange={onFinalCommentChange}
                                            // value={submitData ? submitData.comment : undefined}
                                            style={{
                                                border: 'none',
                                                marginTop: '7px',
                                                fontFamily: 'cursive',
                                                fontSize: '20px',
                                            }}
                                            autoSize={{ minRows: 3, maxRows: 3 }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <div>
                            <Button id="grading-button" style={{
                                display: 'block',
                                width: '100%',
                                border: 'none',
                                backgroundColor: 'green',
                                fontSize: '16px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                height: '5rem',
                                color: 'white',
                            }} onClick={saveGrading}>
                                <Typography.Title style={{ color: 'white', textAlign: 'center', margin: '1.25%' }}><i>Save</i></Typography.Title>
                            </Button>
                            <Button id="grading-button" style={{
                                display: 'block',
                                width: '100%',
                                border: 'none',
                                backgroundColor: 'red',
                                fontSize: '16px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                height: '5rem',
                                color: 'white',
                            }} onClick={onGraded}>
                                <Typography.Title style={{ color: 'white', textAlign: 'center', margin: '1.25%' }}><i>Finish Grading</i></Typography.Title>
                            </Button>
                        </div>
                    </div>
                    <div className="canvas-layer layer" id="canvas-layer">
                        {canvasHtml}
                    </div>
                    <div className="object-layer layer" id="object-layer">
                        {objectSpans}
                        <div>
                            {commentInputSpan}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const Object = () => {

    return (
        <span></span>
    )
}
export default Grading