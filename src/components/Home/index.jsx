
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons'

import backgroundImage from '../../assets/images/overlay-bg.jpg'
import avatar from '../../assets/images/avatar-mentor-1.jpg'
import './Mentor.scss'

import "bootstrap-icons/font/bootstrap-icons.css";

const HomePage = () => {
  return (
    <main className="container-lg main-content mt-3  mb-3">
      <div className="row d-flex">
        <section className="mentor col-4 pt-4 px-4">
          <figure className='position-relative'>
            <img src={backgroundImage} alt="background" className='mentor__bg' />
            <img src={avatar} alt="avatar" className='position-absolute start-50 translate-middle mentor__avatar' />
          </figure>
          <h2 className="mentor__name text-center fw-bold">Mentor Cường</h2>
          <span className='text-center d-block'>Mentor</span>
          <div className="mentor__social d-flex mx-auto column-gap-3 mt-4 text-white">
            <div className="box position-relative">
              <i className="bi bi-facebook position-absolute top-50 start-50 translate-middle "></i>
            </div>
            <div className="box position-relative">
              <i className="bi bi-youtube position-absolute top-50 start-50 translate-middle"></i>
            </div>
            <div className="box position-relative">
              <i className="bi bi-linkedin position-absolute top-50 start-50 translate-middle"></i>
            </div>
          </div>
          <figure className='text-center mt-4'>
            <i className="bi bi-person-fill faUser"></i>
          </figure>
          <span className="mentor__birthday text-center d-block">27/01/2001</span>
          <div className="mentor__contact">
            <div className="mentor__contact-address text-center mt-3">
              <i className="bi bi-send-fill me-1 mentor__contact-address-icon"></i>
              <span>Tân Bình, Tp.Hồ Chí Minh</span>
            </div>
            <div className="mentor__contact-gmail text-center mt-3">
              <i className="bi bi-envelope-fill me-1 mentor__contact-gmail-icon"></i>
              <span>mentor@gmail.com</span>
            </div>
            <div className="mentor__contact-phone text-center mt-3">
              <FontAwesomeIcon icon={faPhoneFlip} className='me-1 mentor__contact-phone-icon'/>
              <span>0946005077</span>
            </div>
          </div>
          <div className="mentor__withdraw text-center mt-3">
            <span>Số dư hiện tại: </span>
            <span className='mentor__withdraw-number'>300,000 BS</span>
          </div>
          <ul className="mentor__tool text-white ps-0 mt-4 pb-4">
            <li className="mentor__tool-item fw-bold">
              CHỈNH SỬA THÔNG TIN
            </li>
            <li className="mentor__tool-item fw-bold">
              QUẢN LÝ VÍ TIỀN
            </li>
            <li className="mentor__tool-item fw-bold">
              RÚT TIỀN
            </li>
            <li className="mentor__tool-item fw-bold">
              DANH SÁCH KHÓA HỌC
            </li>
          </ul>
        </section>
        <section className="main-content__course col-8">

        </section>
      </div>
    </main>
  )
}

export default HomePage