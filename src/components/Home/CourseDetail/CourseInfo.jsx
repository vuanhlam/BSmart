import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import cloud from '../../../assets/images/upload-img.jpg'
import { useEffect, useReducer, useState } from 'react';
import { courseInfoReducer, INITIALSTATE } from '../../../reducers/courseInfo';

const CourseInfo = () => {

    const [state, dispatch] = useReducer(courseInfoReducer, INITIALSTATE);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!state.image) {
            return
        }

        const objectUrl = URL.createObjectURL(state?.image)
        setPreviewImage(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [state?.image])

    const hanldeOnchangeValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({
            type: 'CHANGE_INPUT', payload: {
                name: name,
                value: value
            }
        })
    }

    const hanldeOnSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) return
        dispatch({
            type: 'CHANGE_FILE', payload: {
                name: e.target.name,
                value: e.target.files[0]
            }
        })
    }

    console.log(state);
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Thông tin khóa học</Accordion.Header>
                <Accordion.Body>
                    {/* course name */}
                    <div className="mb-3">
                        <label htmlFor="courseName" className="form-label">Tên khóa học: </label>
                        <input
                            type="email"
                            className="form-control"
                            id="courseName"
                            name="name"
                            value={state.name}
                            onChange={hanldeOnchangeValue}
                        />
                    </div>
                    {/* level */}
                    <div className="mb-3 d-flex">
                        <span className='me-3'>Trình độ: </span>
                        <div className="price">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="level"
                                    id="inlineRadio1"
                                    value="Beginner"
                                    checked={state.level === 'Beginner'}
                                    onChange={hanldeOnchangeValue}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio1">Beginner</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="level"
                                    id="inlineRadio2"
                                    value="Intermediate"
                                    checked={state.level === 'Intermediate'}
                                    onChange={hanldeOnchangeValue}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio2">Intermediate</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="level"
                                    id="inlineRadio3"
                                    value="Advanced"
                                    checked={state.level === 'Advanced'}
                                    onChange={hanldeOnchangeValue}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio3">Advanced</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="level"
                                    id="inlineRadio4"
                                    value="Expert"
                                    checked={state.level === 'Expert'}
                                    onChange={hanldeOnchangeValue}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio4">Expert</label>
                            </div>
                        </div>
                    </div>
                    {/* price */}
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Giá tiền: </label>
                        <input type="number" name='price' className="form-control" id="price" value={state.price} onChange={hanldeOnchangeValue} />
                    </div>
                    {/* image */}
                    <div className="rounded text-center mb-3" style={{ minHeight: '10rem', border: '1px solid #ddd', }}>
                        <img src={previewImage ? previewImage : cloud} alt="cloud" className='mt-3' style={{ width: '20rem', height: '100%' }} />
                        <hr />
                        <div className="mb-3 text-center d-flex align-items-center justify-content-evenly">
                            <span>Hình ảnh:</span>
                            <div>
                                <input accept=".png,.jpeg" className="form-control" type="file" id="formFile" name='image' onChange={hanldeOnSelectFile} />
                            </div>
                            <button className='btn text-white fw-bold' style={{ background: 'var(--secondary-color)', width: '8rem' }}>
                                <span
                                    style={{ fontSize: '.7rem' }}
                                    onClick={() => {
                                        setPreviewImage(null)
                                        dispatch({type: 'CHANGE_FILE', payload: {name: 'image', value: null}})
                                    }}
                                >
                                    XÓA ẢNH
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* major */}
                    <div className='mb-3'>
                        <label className="form-label">Lĩnh vực: </label>
                        <select className="form-select" aria-label="Default select example">
                            <option value="1" selected>Front-end</option>
                            <option value="2">Back-end</option>
                            <option value="3">Devops</option>
                        </select>
                    </div>
                    {/* learn type */}
                    <div className='mb-3'>
                        <label className="form-label">Hình thức khóa học: </label>
                        <select className="form-select" aria-label="Default select example">
                            <option value="1" selected>Online</option>
                            <option value="2">Offline</option>
                        </select>
                    </div>
                    {/* Link google meet */}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Link Google Meet: </label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    {/* student quantity */}
                    <div className="mb-3">
                        <label className="form-label">Số lượng học viên: </label>
                        <div className="student-quantity d-flex column-gap-3">
                            <div className="min d-flex align-items-center">
                                <label className="form-label me-2">min: </label>
                                <input min={1} max={15} type="number" className="form-control" id="exampleFormControlInput1" style={{ width: '4rem' }} />
                            </div>
                            <div className="max d-flex align-items-center">
                                <label className="form-label me-2">max: </label>
                                <input min={1} max={15} type="number" className="form-control" id="exampleFormControlInput1" style={{ width: '4rem' }} />
                            </div>
                        </div>
                    </div>
                    {/* Tags */}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Tags: </label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    {/* course description */}
                    <div className="mb-3" >
                        <label htmlFor="exampleFormControlInput1" className="form-label">Mô tả khóa học: </label>
                        <div className='bg-body-tertiary rounded position-relative' style={{ height: '10rem'}}>
                            <textarea
                                style={{ height: '85%', width: '95%', resize: 'none' }}
                                type="text"
                                className="form-control p-3 position-absolute top-50 start-50 translate-middle"
                                id="exampleFormControlInput1"
                            />
                        </div>
                        <span className='text-end d-block mt-1'>0/200</span>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default CourseInfo
