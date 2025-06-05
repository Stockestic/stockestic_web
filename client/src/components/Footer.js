// stockestic_web\client\src\components\Footer.js
import React from 'react';
import './Footer.css'; // 스타일을 위한 CSS 파일 (선택 사항)

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            textAlign: 'center',
            padding: '10px 0',
            position: 'relative',
            bottom: '0',
            width: '100%',
            boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
        }}>
            <p style={{ color: 'white', margin: 0 }}>© 2023 Stockestic. 모든 권리 보유.</p>
            <div>
                <a href="/privacy-policy" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>개인정보 처리방침</a>
                <a href="/terms-of-service" style={{ color: 'white', textDecoration: 'none' }}>이용약관</a>
            </div>
        </footer>
    );
};

export default Footer;