// stockestic_web\client\src\components\Content.js
import React, { useState, useEffect } from 'react';
import API_URL from '../utils/server-api'
import PerformanceTable from './PerformanceTable'; // 성과 테이블 컴포넌트
import PreviousRecommendations from './PreviousRecommendations'; // 추천 항목 컴포넌트

const Content = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const sendVerificationCode = () => {
    fetch(`${API_URL}/send_verification_code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.message === "인증 코드가 발송되었습니다.") {
          setCodeSent(true);
        }
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  };

  const verifyCode = () => {
    fetch(`${API_URL}/verify_code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, code: code })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setIsVerified(data.verified);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isVerified) {
      fetch(`${API_URL}/add_email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          setEmail('');
          setCode('');
          setIsVerified(false);
          setCodeSent(false);
        })
        .catch(error => {
          console.error('에러 발생:', error);
        });
    } else {
      alert("이메일 인증이 필요합니다.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Stockestic 주식 레터 구독</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', width: '300px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button type="button" onClick={sendVerificationCode} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          인증 코드 발송
        </button>
        <br /><br />
        {codeSent && (
          <>
            <input
              type="text"
              placeholder="인증 코드 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              style={{ padding: '10px', width: '300px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <br />
            <button type="button" onClick={verifyCode} style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}>
              인증 코드 확인
            </button>
          </>
        )}
        <br />
        <button type="submit" disabled={!isVerified} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>
          제출
        </button>
      </form>
      <PerformanceTable /> {/* 성과 테이블을 상단에 배치 */}
      <PreviousRecommendations /> {/* 추천 항목을 하단에 배치 */}
    </div>
  );
};

export default Content;