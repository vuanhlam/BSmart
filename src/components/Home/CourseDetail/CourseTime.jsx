/* eslint-disable no-case-declarations */

import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CourseTime = () => {
    const [courseSchedule, setCourseSchedule] = useState({
        id: uuidv4(),
        timeS: '',
        timeE: '',
        dayInWeek: [],
        slot: '',
        dateOpenClass: new Date().toISOString().split('T')[0]
    })
    const [listSchedule, setListSchedule] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [errorMes, setErrorMes] = useState({
        timeS: '',
        timeE: '',
        dateOpenClass: ''
    })

    const hanldeOnChangeValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value) {
            setCourseSchedule({
                ...courseSchedule, [name]: value
            })
        }
        validateOnChangeValue(name, value);
    }

    const validateOnChangeValue = (name, value) => {
        switch (name) {
            case 'timeS':
                /**
                 *! case select AM time if (selectedTimeAM < 7:00) is wrong
                */
                let selectedTimeAM = value;
                const minTimeAM = '07:00';
                let isError = false;
                if (value.startsWith('00')) {
                    selectedTimeAM = value.split(':')[0].replace('00', `12:${value.split(':')[1]}`);
                }
                if (selectedTimeAM < minTimeAM) {
                    isError = true
                    setErrorMes({ ...errorMes, timeS: 'thời gian bắt đầu phải lớn hơn 7:00' })
                    setCourseSchedule({ ...courseSchedule, timeE: '', timeS: '' })
                } else {
                    setErrorMes({ ...errorMes, timeS: '' })
                }
                /**
                 *! case select PM time if (selectedTimePM time > 17:00) is wrong
                */
                if (value.startsWith('1') || value.startsWith('2') || value.startsWith('12')) {
                    let selectedTimePM = value;
                    if (value.startsWith('12')) {
                        selectedTimePM = value.split(':')[0].replace('12', `24:${value.split(':')[1]}`);
                    }
                    const minTimePM = '17:00';
                    if (selectedTimePM > minTimePM) {
                        isError = true
                        setErrorMes({ ...errorMes, timeS: 'thời gian bắt đầu phải nhỏ hơn hoặc bằng 17:00' })
                        setCourseSchedule({ ...courseSchedule, timeE: '', timeS: '' })
                    } else {
                        setErrorMes({ ...errorMes, timeS: '' })
                    }
                }
                /**
                 *! auto select timeE when choose timeS  
                */
                if (!isError) {
                    const timeEnd = parseInt(selectedTimeAM.split(':')[0]) + 2;
                    let minute = selectedTimeAM.split(':')[1];
                    setCourseSchedule((prev) => {
                        return {
                            ...prev,
                            timeE: timeEnd === 9 ? '0' + timeEnd + `:${minute}` : timeEnd + `:${minute}`
                        }
                    })
                    // reset timeE error messsage when select new timeS
                    setErrorMes((prev) => {
                        return {
                            ...prev,
                            timeE: ''
                        }
                    })
                }
            break;
            case 'timeE':
                const hourE = parseInt(courseSchedule.timeS.split(':')[0]);
                const hourS = parseInt(courseSchedule.timeE.split(':')[0]);
                const minuteS = parseInt(courseSchedule.timeS.split(':')[1]);
                const minuteE = parseInt(courseSchedule.timeE.split(':')[1]);
                if (hourE - hourS < 2 || minuteE - minuteS === 0) {
                    setErrorMes({
                        ...errorMes, timeE: 'giờ kết thúc phải cách giờ bắt đầu 2 tiếng'
                    })
                    setCourseSchedule((prev) => {
                        return {
                            ...prev,
                            timeE: '',
                            timeS: ''
                        }
                    })
                }
            break;
            case 'dateOpenClass':
                const currentDate = new Date().toISOString().split('T')[0];
                if (value < currentDate) {
                    setErrorMes({
                        ...errorMes, dateOpenClass: 'chỉ được chọn ngày hiện tại hoặc ngày tương lai'
                    })
                    // set dateOpenclass to current date if user select previous date with current date
                    setCourseSchedule({
                        ...courseSchedule, dateOpenClass: ""
                    })
                } else {
                    setErrorMes({
                        ...errorMes, dateOpenClass: ''
                    })
                }
            break;
        }
    }
        const handleCreateClass = () => {
            setListSchedule([...listSchedule, courseSchedule])
            setCourseSchedule({
                id: uuidv4(),
                timeS: '',
                timeE: '',
                dayInWeek: [],
                slot: '',
                dateOpenClass: new Date().toISOString().split('T')[0],
            });
        }

        const handleCheckboxChange = (event) => {
            const value = event.target.value;
            const isChecked = event.target.checked;

            // Update the selectedValues array based on the checkbox change
            if (isChecked) {
                setCourseSchedule({
                    ...courseSchedule, dayInWeek: [...courseSchedule.dayInWeek, value]
                });
            } else {
                setCourseSchedule({
                    ...courseSchedule, dayInWeek: courseSchedule.dayInWeek.filter((item) => item !== value)
                });
            }
        };

        const hanldeDeleteCourse = (id) => {
            const newListCourse = listSchedule.reduce((acc, curValue) => {
                return curValue.id !== id ? [...acc, curValue] : acc
            }, [])
            setListSchedule(newListCourse)
        }

        const hanldeEditCourse = (course) => {
            setIsEdit(true);
            setCourseSchedule(course);
        }

        const hanldeUpdateCourse = () => {
            const listScheduleClone = structuredClone(listSchedule);
            const newCourses = listScheduleClone.map((item) => {
                if (item.id === courseSchedule.id) {
                    item = courseSchedule;
                }
                return item
            })
            setListSchedule(newCourses)
            setIsEdit(false);
            setCourseSchedule({
                id: uuidv4(),
                timeS: '',
                timeE: '',
                dayInWeek: [],
                slot: '',
                dateOpenClass: '',
            });
        }

        return (
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className='bg-body-tertiary'>
                    <Accordion.Header>Thời gian lớp học</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Giờ bắt đầu:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name='timeS'
                                            value={courseSchedule.timeS}
                                            onChange={hanldeOnChangeValue}
                                            step="7:00" max="12:00"
                                            className={`${errorMes.timeS ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">
                                            {errorMes.timeS}
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Giờ kết thúc:</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name='timeE'
                                            placeholder="Enter email"
                                            value={courseSchedule.timeE}
                                            onChange={hanldeOnChangeValue}
                                            className={`${errorMes.timeE ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">
                                            {errorMes.timeE}
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className='invisible'>Ngày dự kiến mở lớpasdfa:</Form.Label>
                                        <div className="d-flex">
                                            <div className="form-check d-flex flex-column-reverse ms-2" style={{ width: 'fit-content' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="defaultCheck1"
                                                    value="2"
                                                    onChange={handleCheckboxChange}
                                                    checked={courseSchedule.dayInWeek.includes("2")}
                                                />
                                                <label className="form-check-label date" style={{ marginLeft: '-24px' }} htmlFor="defaultCheck1">
                                                    T2
                                                </label>
                                            </div>
                                            <div className="form-check d-flex flex-column-reverse ms-2" style={{ width: 'fit-content' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="3"
                                                    id="defaultCheck1"
                                                    onChange={handleCheckboxChange}
                                                    checked={courseSchedule.dayInWeek.includes("3")}
                                                />
                                                <label className="form-check-label date" style={{ marginLeft: '-24px' }} htmlFor="defaultCheck1">
                                                    T3
                                                </label>
                                            </div>
                                            <div className="form-check d-flex flex-column-reverse ms-2" style={{ width: 'fit-content' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="4"
                                                    id="defaultCheck1"
                                                    onChange={handleCheckboxChange}
                                                    checked={courseSchedule.dayInWeek.includes("4")}
                                                />
                                                <label className="form-check-label date" style={{ marginLeft: '-24px' }} htmlFor="defaultCheck1">
                                                    T4
                                                </label>
                                            </div>
                                            <div className="form-check d-flex flex-column-reverse ms-2" style={{ width: 'fit-content' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="5"
                                                    id="defaultCheck1"
                                                    onChange={handleCheckboxChange}
                                                    checked={courseSchedule.dayInWeek.includes("5")}
                                                />
                                                <label className="form-check-label date" style={{ marginLeft: '-24px' }} htmlFor="defaultCheck1">
                                                    T5
                                                </label>
                                            </div>
                                            <div className="form-check d-flex flex-column-reverse ms-2" style={{ width: 'fit-content' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="6"
                                                    id="defaultCheck1"
                                                    onChange={handleCheckboxChange}
                                                    checked={courseSchedule.dayInWeek.includes("6")}
                                                />
                                                <label className="form-check-label date" style={{ marginLeft: '-24px' }} htmlFor="defaultCheck1">
                                                    T6
                                                </label>
                                            </div>
                                            <div className="form-check d-flex flex-column-reverse ms-2" style={{ width: 'fit-content' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="7"
                                                    id="defaultCheck1"
                                                    onChange={handleCheckboxChange}
                                                    checked={courseSchedule.dayInWeek.includes("7")}
                                                />
                                                <label className="form-check-label date" style={{ marginLeft: '-24px' }} htmlFor="defaultCheck1">
                                                    T7
                                                </label>
                                            </div>
                                            <div className="form-check d-flex flex-column-reverse ms-2" style={{ width: 'fit-content' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="8"
                                                    id="defaultCheck1"
                                                    onChange={handleCheckboxChange}
                                                    checked={courseSchedule.dayInWeek.includes("8")}
                                                />
                                                <label className="form-check-label date" style={{ marginLeft: '-24px' }} htmlFor="defaultCheck1">
                                                    CN
                                                </label>
                                            </div>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} xl={4}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Slot:</Form.Label>
                                        <Form.Select aria-label="Default select example" name='slot' value={courseSchedule.slot} onChange={hanldeOnChangeValue}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} xl={4}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Ngày dự kiến mở lớp:</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            name='dateOpenClass' 
                                            value={courseSchedule.dateOpenClass} 
                                            onChange={hanldeOnChangeValue} 
                                            className={`${errorMes.dateOpenClass ? 'is-invalid' : ''}`}
                                        />
                                        <div className="invalid-feedback">
                                            {errorMes.dateOpenClass}
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col xl={4}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className='invisible'>Nút khởi tạo:</Form.Label>
                                        <Button
                                            variant="primary"
                                            className='mb-3 ms-5'
                                            style={{ background: 'var(--secondary-color)', border: 'none' }}
                                            onClick={isEdit ? hanldeUpdateCourse : handleCreateClass}
                                        >
                                            {
                                                isEdit ? `Lưu Thay Đổi` : `Tạo Lớp Mới`
                                            }
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th style={{ fontSize: '0.8rem' }} className='text-center'>Giờ bắt đầu</th>
                                    <th style={{ fontSize: '0.8rem' }} className='text-center'>Giờ kết thúc</th>
                                    <th style={{ fontSize: '0.8rem' }} className='text-center'>Thứ</th>
                                    <th style={{ fontSize: '0.8rem' }} className='text-center'>Slot</th>
                                    <th style={{ fontSize: '0.8rem' }} className='text-center'>Ngày dự kiến mở lớp</th>
                                    <th style={{ fontSize: '0.8rem' }} className='text-center'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listSchedule && listSchedule.length > 0 &&
                                    listSchedule.map((course, index) => {
                                        return (
                                            <tr key={`couse-${index}`}>
                                                <td className='text-center'>
                                                    {
                                                        course.timeS
                                                    }
                                                </td>
                                                <td className='text-center'>
                                                    {
                                                        course.timeE
                                                    }
                                                </td>
                                                <td className='text-center'>
                                                    {
                                                        course.dayInWeek
                                                    }
                                                </td>
                                                <td className='text-center'>
                                                    {
                                                        course.slot
                                                    }
                                                </td>
                                                <td className='text-center'>
                                                    {
                                                        course.dateOpenClass
                                                    }
                                                </td>
                                                <td className='text-center'>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => hanldeDeleteCourse(course.id)}
                                                    >
                                                        Xóa
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => hanldeEditCourse(course)}
                                                    >
                                                        Sửa
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }

    export default CourseTime
