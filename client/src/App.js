// stockestic_web\client\src\App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import Login from './pages/Login';
import Home from './pages/Home'
import './App.css';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    return (
      <Router basename={process.env.PUBLIC_URL}>
            <Header isLoggedIn={isLoggedIn} /> {/* isLoggedIn 전달 */}
            <Routes>
                <Route path= "/" element={<Home/>}/>
                <Route path="/stock" element={<Content />} />
                {/* <Route path="/coin" element={<Content_coin />} /> */}
                <Route
                    path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} />} // 로그인 상태 변경
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
