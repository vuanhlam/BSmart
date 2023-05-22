import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CourseProgress.scss'

const CourseProgress = () => {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className='bg-body-tertiary'>
                <Accordion.Header>Lộ trình khóa học</Accordion.Header>
                <Accordion.Body>
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor); 
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                    <button
                        type="button"
                        className="btn mt-3 d-block"
                        style={{
                            background: "var(--secondary-color)",
                            color: '#ffff',
                            width: '6rem',
                            marginLeft: "auto",
                        }}  
                    >
                        Lưu
                    </button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default CourseProgress
