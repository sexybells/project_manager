import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import logo from '../assets/Dota-2-Logo.png'
import { useSelector } from 'react-redux';
const Header = () => {
    const {currentUser} = useSelector(({state}) => ({
        currentUser: state.currentUser,
    }));


    return (
        <header>
            <div className='header container'>
                <div className='header-logo'>
                    <img src={logo} width={150} />
                </div>
                <div className='header-info'>
                    {/* <p>{currentUser.info.name}</p> */}
                    <button className='btn btn-secondary'>Đăng xuất</button>
                </div>
            </div>
            <div className='menu'>
                <nav className='nav container'>
                    <ul>
                        <li>
                            <Link to='/'>Trang chủ</Link>
                        </li>
                        <li>
                            <Link to='/'>Danh sách thành viên</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Danh sách dự án</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )

}

export default Header;
