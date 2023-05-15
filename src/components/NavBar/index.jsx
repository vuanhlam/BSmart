
import brandLogo from '../../assets/images/icon-logo.png'
import cartImage from '../../assets/images/icon-shopping-cart.jpg'
import banner from '../../assets/images/banner-2.jpg'
import './NavBar.scss'

const NavBar = () => {
    return (
        <div >
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={brandLogo} alt="brand-logo" className='brand-logo' />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto ">
                            <li className="nav-item fw-bold">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item fw-bold">
                                <a className="nav-link" href="#">Về Chúng Tôi</a>
                            </li>
                            <li className="nav-item fw-bold">
                                <a className="nav-link" href="#">STEM</a>
                            </li>
                            <li className="nav-item fw-bold">
                                <a className="nav-link" href="#">Khóa Học</a>
                            </li>
                            <li className="nav-item fw-bold">
                                <a className="nav-link" href="#">Mentor</a>
                            </li>
                            <li className="nav-item fw-bold">
                                <a className="nav-link" href="#">Nền tảng LMS</a>
                            </li>
                            <li className="nav-item fw-bold">
                                <a className="nav-link" href="#">Blog</a>
                            </li>
                            <li className="nav-item fw-bold fw-bold">
                                <a className="nav-link" href="#">Tuyển dụng</a>
                            </li>
                        </ul>
                    </div>
                    <a className="navbar-cart position-relative" href="/">
                        <img src={cartImage} alt="cart" className='cart-image' />
                        <span className="position-absolute badge rounded-pill">
                            0
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </a>
                </div>
            </nav>
            <section className='banner position-relative'>
                <img src={banner} alt="banner" className='banner__image' />
                <h1 className='position-absolute top-50 start-50 translate-middle'>Tạo khóa học</h1>
            </section>
        </div>
    )
}

export default NavBar