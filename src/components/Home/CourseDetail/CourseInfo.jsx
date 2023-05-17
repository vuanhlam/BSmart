/* eslint-disable no-case-declarations */
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import cloud from '../../../assets/images/upload-img.jpg'
import { useEffect, useReducer, useState } from 'react';
import { courseInfoReducer, INITIALSTATE } from '../../../reducers/courseInfo';
import { useRef } from 'react';
import './Tag.scss'

const CourseInfo = () => {
    const [state, dispatch] = useReducer(courseInfoReducer, INITIALSTATE);
    const [previewImage, setPreviewImage] = useState('');
    const [errorMes, setErrorMes] = useState({
        name: '',
        linkMeet: '',
        student: {
            max: '',
            min: ''
        },
        file: ''
    });
    const inputRef = useRef(null);
    const minRef = useRef();
    const maxRef = useRef();
    const [tags, setTags] = useState([]);
    const ValidFileExtensions = [".jpg", ".png"];
    const fileInputRef = useRef(null);

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
        let value = e.target.value;
        if (name === 'price') {
            value = value.replace(/[^\d]/g, '').replace(/^0+/, '');
        }

        if (name === 'courseDesc' && value.length > 200) return;

        dispatch({
            type: 'CHANGE_INPUT', payload: {
                name: name,
                value: value
            }
        })

        if (name === 'minStudent') {
            minRef.current = value
        }
        if (name === 'maxStudent') {
            maxRef.current = value
        }
        validateMinMaxStudent(parseInt(minRef.current), parseInt(maxRef.current));
        validateFields(name, value);
    }

    const validateFields = (field, value) => {
        switch (field) {
            case 'name':
                if (value.length < 3) {
                    setErrorMes({ ...errorMes, name: 'Tên khóa học phải nhiều hơn 3 kí tự' })
                } else {
                    setErrorMes({ ...errorMes, name: '' })
                }
                if (/\d/.test(value)) {
                    setErrorMes({ ...errorMes, name: 'Tên khóa học không được chứa số' })
                }
                if (!value) setErrorMes({ ...errorMes, name: '' })
                break;
            case 'linkMeet':
                // valid link google meet 
                // eslint-disable-next-line no-case-declarations
                const googleMeetRegex = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9_-]+$/
                // Extract the ID from the Google Meet link
                const linkParts = value.split('/');
                const id = linkParts[linkParts.length - 1];

                // Validate the ID format
                const idRegex = /^[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{3}$/i;
                if (!googleMeetRegex.test(value)) {
                    setErrorMes({ ...errorMes, linkMeet: 'Link Google Meet không hợp lệ' })
                } else if (!idRegex.test(id)) {
                    setErrorMes({ ...errorMes, linkMeet: 'ID Google Meet không hợp lệ' })
                } else {
                    setErrorMes({ ...errorMes, linkMeet: '' })
                }
                if (!value) setErrorMes({ ...errorMes, linkMeet: '' })
                break;
        }
    }

    const validateMinMaxStudent = (min, max) => {
        if(min > max) {
            setErrorMes({ ...errorMes, student: { ...errorMes.student, min: 'min không được lớn hơn max' } })
        } else if(min === max) {
            setErrorMes({ ...errorMes, student: { ...errorMes.student, min: 'min không được bằng max' } })
        } else if(min < 1) {
            setErrorMes({ ...errorMes, student: { ...errorMes.student, min: 'min phải lớn hơn 1' } })
        } else if(max < 1) {
            setErrorMes({ ...errorMes, student: { ...errorMes.student, max: 'max phải lớn hơn 1' } })
        } else if(max > 15) {
            setErrorMes({ ...errorMes, student: { ...errorMes.student, max: 'max tối đa là 15' } })
        }else {
            setErrorMes((prev) => {
                return {
                    ...prev, student: {...prev.student, min: ''}
                }
            })
            setErrorMes((prev) => {
                return {
                    ...prev, student: {...prev.student, max: ''}
                }
            })
        }

    }

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);

    };

    const addTags = e => {
        if (e.target.value !== "") {
            setTags([...tags, e.target.value]);
            dispatch({
                type: 'CREATE_TAG',
                payload: {
                    name: e.target.name,
                    value: e.target.value
                }
            })
            e.target.value = "";
        }
    };

    const formatCurrency = (value) => {
        const formattedValue = value.toLocaleString();
        return `${formattedValue}`;
    };

    const handleChange = () => {
        const inputValue = inputRef.current.value;
        const numericValue = parseFloat(inputValue.replace(/[^0-9]/g, ''));
        const formattedValue = isNaN(numericValue) ? '' : formatCurrency(numericValue);
        const cursorPosition = inputRef.current.selectionStart;
        const newValue = formattedValue ? formattedValue + ' VND' : '';
        inputRef.current.value = newValue;
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    };

    const handleKeyDown = (e) => {
        const cursorPosition = inputRef.current.selectionStart;
        if (e.key === 'Backspace' && cursorPosition > 0) {
            e.preventDefault();
            const inputValue = inputRef.current.value;
            const newCursorPosition = cursorPosition - 1;
            const newValue =
                inputValue.slice(0, cursorPosition - 1) +
                inputValue.slice(cursorPosition);

            const newNumericValue = parseFloat(newValue.replace(/[^0-9]/g, ''));
            const newFormattedValue = isNaN(newNumericValue) ? '' : formatCurrency(newNumericValue);

            inputRef.current.value = newFormattedValue ? newFormattedValue + ' VND' : '';
            inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }
    };

    const validateFile = (event) => {
        const fileInput = event.target;
        const fileName = fileInput.value;

        if (fileName.length > 0) {
            let isValid = false;
            for (let i = 0; i < ValidFileExtensions.length; i++) {
                const validExtension = ValidFileExtensions[i];
                if (
                    fileName.substr(fileName.length - validExtension.length, validExtension.length).toLowerCase() === validExtension.toLowerCase()
                ) {
                    isValid = true;
                    break;
                }
            }

            if (!isValid) {
                setErrorMes({ ...errorMes, file: `Sorry, ${fileName} is invalid. Allowed extensions are: ${ValidFileExtensions.join(", ")}` })
                fileInput.value = '';
            } else {
                setErrorMes({ ...errorMes, file: `` })
            }
            if (isValid) {
                dispatch({
                    type: 'CHANGE_FILE', payload: {
                        name: event.target.name,
                        value: event.target.files[0]
                    }
                })
            }
        }
    };

    console.log(errorMes);
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
                            className={`form-control ${errorMes.name ? 'is-invalid' : ''}`}
                            id="courseName"
                            name="name"
                            value={state.name}
                            onChange={hanldeOnchangeValue}
                            required
                        />
                        <div className="invalid-feedback">
                            {errorMes.name}
                        </div>
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
                        <input
                            className="form-control"
                            ref={inputRef}
                            type="text"
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                        />
                    </div>
                    {/* image */}
                    <div className="rounded text-center mb-3" style={{ minHeight: '10rem', border: '1px solid #ddd', }}>
                        <img src={previewImage ? previewImage : cloud} alt="cloud" className='mt-3' style={{ width: '20rem', height: '100%' }} />
                        <hr />
                        <div className="mb-3 text-center d-flex align-items-center justify-content-evenly">
                            <span>Hình ảnh:</span>
                            <div>
                                <input
                                    accept=".png,.jpeg"
                                    className={`form-control ${errorMes.file ? 'is-invalid' : ''}`}
                                    type="file"
                                    id="formFile"
                                    name='image'
                                    onChange={validateFile}
                                    ref={fileInputRef}
                                />
                                <div className="invalid-feedback">
                                    {errorMes.file}
                                </div>
                            </div>
                            <button className='btn text-white fw-bold' style={{ background: 'var(--secondary-color)', width: '8rem' }}>
                                <span
                                    style={{ fontSize: '.7rem' }}
                                    onClick={() => {
                                        setPreviewImage(null)
                                        dispatch({ type: 'CHANGE_FILE', payload: { name: "image", value: null } })
                                        fileInputRef.current.value = null;
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
                            <option value="1" defaultValue>Front-end</option>
                            <option value="2">Back-end</option>
                            <option value="3">Devops</option>
                        </select>
                    </div>
                    {/* learn type */}
                    <div className='mb-3'>
                        <label className="form-label">Hình thức khóa học: </label>
                        <select className="form-select" aria-label="Default select example">
                            <option value="1" defaultValue>Online</option>
                            <option value="2">Offline</option>
                        </select>
                    </div>
                    {/* Link google meet */}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Link Google Meet: </label>
                        <input
                            type="text"
                            name='linkMeet'
                            className={`form-control ${errorMes.linkMeet ? 'is-invalid' : ''}`}
                            id="exampleFormControlInput1"
                            value={state.linkMeet}
                            onChange={hanldeOnchangeValue}
                        />
                        <div className="invalid-feedback">
                            {errorMes.linkMeet}
                        </div>
                    </div>
                    {/* student quantity */}
                    <div className="mb-3">
                        <label className="form-label">Số lượng học viên: </label>
                        <div className="student-quantity d-flex column-gap-4">
                            <div className="min">
                                <div className="d-flex">
                                    <label className="form-label me-2">min: </label>
                                    <input
                                        // min={1}
                                        // max={15}
                                        type="number"
                                        className={`form-control ${errorMes.student.min ? 'is-invalid' : ''}`}
                                        id="exampleFormControlInput1"
                                        style={{ width: '6rem' }}
                                        name='minStudent'
                                        value={state.minStudent}
                                        onChange={hanldeOnchangeValue}
                                    />
                                </div>
                                <span className="invalid-feedback d-inline">
                                    {errorMes.student.min}
                                </span>
                            </div>
                            <div className="max">
                                <div className="d-flex">
                                    <label className="form-label me-2">max: </label>
                                    <input
                                        // min={1}
                                        // max={15}
                                        type="number"
                                        className={`form-control ${errorMes.student.max ? 'is-invalid' : ''}`}
                                        id="exampleFormControlInput1"
                                        style={{ width: '6rem' }}
                                        name='maxStudent'
                                        value={state.maxStudent}
                                        onChange={hanldeOnchangeValue}
                                    />
                                </div>
                                <span className="invalid-feedback d-inline">
                                    {errorMes.student.max}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Tags */}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Tags: </label>
                        <div className="tags-input">
                            <ul id="tags">
                                {tags.map((tag, index) => (
                                    <li key={index} className="tag">
                                        <span className='tag-title'>{tag}</span>
                                        <i className="bi bi-trash ms-2 tag-close-icon" onClick={() => removeTags(index)}></i>
                                    </li>
                                ))}
                            </ul>
                            <input
                                name='tags'
                                type="text"
                                className="form-control"
                                onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                                placeholder="Thêm tag mới"
                            />
                        </div>
                    </div>
                    {/* course description */}
                    <div className="mb-3" >
                        <label htmlFor="exampleFormControlInput1" className="form-label">Mô tả khóa học: </label>
                        <div className='bg-body-tertiary rounded position-relative' style={{ height: '9rem' }}>
                            <textarea
                                style={{ height: '85%', width: '95%', resize: 'none' }}
                                type="text"
                                name='courseDesc'
                                className="form-control p-3 position-absolute top-50 start-50 translate-middle"
                                id="exampleFormControlInput1"
                                value={state.courseDesc}
                                onChange={hanldeOnchangeValue}
                            />
                        </div>
                        <span className='text-end d-block mt-1'>{`${state.courseDesc.length}/200`}</span>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default CourseInfo
