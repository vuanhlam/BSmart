import brandLogo from '../../assets/images/icon-logo.png'
import cartImage from '../../assets/images/icon-shopping-cart.jpg'
import banner from '../../assets/images/banner-2.jpg'
import './NavBar.scss'
import mailImage from '../../assets/images/icon-gmail.png'
import phoneImage from '../../assets/images/icon-phone.png'


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    return (
        <>
            <Navbar expand="lg">
                <Container className='container-sm'>
                    <Navbar.Brand href="/" className="navbar-brand">
                        <img src={brandLogo} alt="brand-logo" className='brand-logo' />
                    </Navbar.Brand>
                    <label className="d-flex text-white position-relative search d-none d-lg-none mx-auto d-sm-none d-md-block" role="search">
                        <input
                            className="form-control me-2 search__course " type="search"
                            placeholder="Tìm kiếm khóa học"
                            aria-label="Search"
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className='position-absolute end-0 me-3 my-auto top-50 translate-middle search__icon'
                            style={{ color: 'black' }}
                        />
                    </label>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='ms-auto me-4' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <label className="d-flex text-white position-relative search-sm d-lg-none mx-auto d-sm-none d-md-none" role="search">
                                <input
                                    className="form-control me-2 search__course " type="search"
                                    placeholder="Tìm kiếm khóa học"
                                    aria-label="Search"
                                />
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className='position-absolute end-0 me-3 my-auto top-50 translate-middle search__icon'
                                    style={{ color: 'black' }}
                                />
                            </label>
                            <Nav.Link href="#home" className="nav-link nav-item fw-bold" >Trang Chủ</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold">Về Chúng Tôi</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold">STEM</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold">Khóa Học</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold">Mentor</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold">Nền tảng LMS</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold">Blog</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold">Tuyển dụng</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold d-flex d-lg-none">
                                <img src={mailImage} alt="gmail" className='mail' />
                                <span className="nav-link" >admin@bsmart.edu.vn</span>
                            </Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-item fw-bold d-flex d-lg-none">
                                <img src={phoneImage} alt="phone" className='phone' />
                                <span className="nav-link" aria-current="page" >02899997939</span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <a className="navbar-cart position-relative" href="/">
                    <img src={cartImage} alt="cart" className='cart-image d-sm-none d-none d-lg-block' />
                    <span className="position-absolute badge rounded-pill d-none d-lg-block">
                        0
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </a>
            </Navbar>
            <section className='banner position-relative'>
                <img src={banner} alt="banner" className='banner__image' />
                <h1 className='position-absolute top-50 start-50 translate-middle'>Tạo khóa học</h1>
            </section>
        </>
    )
}

export default NavBar