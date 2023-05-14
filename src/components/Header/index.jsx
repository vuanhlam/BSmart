import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './Header.scss'
import mailImage from '../../assets/images/icon-gmail.png'
import phoneImage from '../../assets/images/icon-phone.png'
import avatarImage from '../../assets/images/avatar-mentor-1.jpg'

const Header = () => {

    const [searchValue, setSearchValue] = useState('');

    const hanldeSearchValue = () => {
        console.log(searchValue);
    }

    return (
        <header className='header'>
            <nav className="navbar navbar-expand-lg navigation">
                <div className="container-fluid">
                    <button 
                        className="navbar-toggler" 
                        type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarScroll" 
                        aria-controls="navbarScroll" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse nav-menu" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll nav-menu__list">
                            <li className="nav-item d-flex align-items-center">
                                <img src={mailImage} alt="gmail" className='mail' />
                                <span className="nav-link active text-white" aria-current="page" href="#">admin@bsmart.edu.vn</span>
                            </li>
                            <li className="nav-item d-flex ms-3 align-items-center">
                                <img src={phoneImage} alt="phone" />
                                <span className="nav-link active text-white" aria-current="page" href="#">02899997939</span>
                            </li>
                        </ul>
                        <label className="d-flex text-white position-relative" role="search">
                            <input 
                                className="form-control me-2 search__course border-0" type="search" 
                                placeholder="Tìm kiếm khóa học" 
                                aria-label="Search" 
                                value={searchValue} 
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <FontAwesomeIcon 
                                icon={faMagnifyingGlass} 
                                className='position-absolute end-0 me-3 my-auto top-50 translate-middle search__icon' 
                                onClick={hanldeSearchValue}
                            />
                        </label>
                        <div className="avatar" type="submit">
                            <img src={avatarImage} alt="avatar" className='rounded-circle w-25 ' />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;