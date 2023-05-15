
import './Footer.scss'
import logoFooter from '../../assets/images/icon-logo-footer.png'
import iconLocation from '../../assets/images/icon-location.png'
import iconMail from '../../assets/images/icon-gmail.png'
import iconPhone from '../../assets/images/icon-phone.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-lg" style={{width: '1160px'}}>
                {/* Block address */}
                <section className="footer__address">
                    <h3 className="footer__address-city fw-bold">TP.Hồ Chí Minh</h3>
                    <ul className="footer__address-list d-flex justify-content-between">
                        <li className="address-item text-white">
                            <h3 className="address-item__office fw-bold ">Trụ sở 2: 177 Tân Cảng, Bình Thạnh</h3>
                            <div className='text-secondary'>
                                <span className="address-item__phone d-block">Hotline: 096.105.1014</span>
                                <span className="address-item__place">Address: 177 Tân Cảng, Bình Thạnh, TPHCM</span>
                            </div>
                        </li>
                        <li className="address-item text-white">
                            <h3 className="address-item__office fw-bold ">Trụ sở 2: 177 Tân Cảng, Bình Thạnh</h3>
                            <div className='text-secondary'>
                                <span className="address-item__phone d-block">Hotline: 096.105.1014</span>
                                <span className="address-item__place">Address: 177 Tân Cảng, Bình Thạnh, TPHCM</span>
                            </div>
                        </li>
                        <li className="address-item text-white">
                            <h3 className="address-item__office fw-bold ">Trụ sở 2: 177 Tân Cảng, Bình Thạnh</h3>
                            <div className='text-secondary'>
                                <span className="address-item__phone d-block">Hotline: 096.105.1014</span>
                                <span className="address-item__place">Address: 177 Tân Cảng, Bình Thạnh, TPHCM</span>
                            </div>
                        </li>
                    </ul>
                </section>
                <hr style={{ color: '#ffff' }} />
                {/* Block information*/}
                <section className='footer__info'>
                    <ul className="footer__info--list d-flex justify-content-between text-white">
                        <li className="info-item">
                            <img src={logoFooter} alt="logo" className="info-item__logo ms-4" />
                            <p className="info-item__about">chúng tôi cung cấp các khóa học chất lượng cao để cải thiện các kỹ năng lập trình của các bạn.
                                Tất cả các giảng viên của chúng tôi đều có nhiều kinh nghiệm trong thực tế và giảng dạy.
                            </p>
                            <h4 className='ingo-item__follow fw-bold'>Theo dõi chúng tôi tại:</h4>
                        </li>
                        <li className="info-item">
                            <h4 className='info-item__header fw-bold'>Menu</h4>
                            <ul className="menu mt-3">
                                <li className="menu__item">Trang chủ</li>
                                <li className="menu__item">Về chúng tôi</li>
                                <li className="menu__item">Khóa học</li>
                                <li className="menu__item">Mentor</li>
                                <li className="menu__item">Nền tảng LMS</li>
                                <li className="menu__item">Blog</li>
                            </ul>
                        </li>
                        <li className="info-item">
                            <h4 className='info-item__header fw-bold'>Điều khoản</h4>
                            <ul className="menu mt-3">
                                <li className="menu__item">Điều khoản và dịch vụ</li>
                                <li className="menu__item">Chính sách bảo mật</li>
                                <li className="menu__item">
                                    <strong>Cộng tác viên</strong>
                                </li>
                                <li className="menu__item">Chính sách cộng tác viên</li>
                            </ul>
                        </li>
                        <li className="info-item">
                        <h4 className='info-item__header fw-bold'>Liên hệ với chúng tôi</h4>
                            <ul className="menu mt-3">
                                <li className="menu__item d-flex">
                                    <img src={iconLocation} alt="location" className='menu__item-icon'/>
                                    <span>Tòa S9.02A, Vinhome Grand Park, Quận 9</span>
                                </li>
                                <li className="menu__item mt-2">
                                    <img src={iconMail} alt="mail" className='menu__item-gmailIcon'/>
                                    <span>admin@bsmart.edu.vn</span>
                                </li>
                                <li className="menu__item mt-2">
                                    <img src={iconPhone} alt="phone" className='menu__item-phoneIcon'/>
                                    <span>028 9999 79 39</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>

        </footer>
    )
}

export default Footer