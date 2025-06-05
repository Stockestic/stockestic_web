// stockestic_web\client\src\components\Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <NavLink to="/" className="header-logo-link">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Stockestic 로고" className="header-logo" />
                </NavLink>
                <NavLink to="/" className="header-title-link">
                    <h1 className="header-title">Stockestic</h1>
                </NavLink>
                <nav className="header-nav">
                    <ul className="header-menu">
                        <li>
                            <NavLink
                                to="/stock"
                                className={({ isActive }) =>
                                    isActive ? 'header-link active' : 'header-link'
                                }
                            >
                                <span className="menu-highlight">Stock</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coin"
                                className={({ isActive }) =>
                                    isActive ? 'header-link active' : 'header-link'
                                }
                            >
                                <span className="menu-highlight">Coin</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? 'header-link active' : 'header-link'
                                }
                            >
                                로그인
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive ? 'header-link active' : 'header-link'
                                }
                            >
                                회원가입
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/reset-password"
                                className={({ isActive }) =>
                                    isActive ? 'header-link active' : 'header-link'
                                }
                            >
                                비밀번호 재설정
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
