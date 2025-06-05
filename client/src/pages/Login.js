// stockestic_web\client\src\pages\Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // AWS Amplify를 사용하여 로그인
            // const user = await signIn(email, password);
            // console.log('로그인 성공:', user);

            // 로그인 성공 시 상태 업데이트 및 리다이렉트
            setIsLoggedIn(true);
            navigate('/stock');
        } catch (error) {
            console.error('로그인 실패:', error.message);
            alert('로그인 실패: ' + error.message);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
                />
                <br />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
                />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    로그인
                </button>
            </form>
        </div>
    );
};

export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // useNavigate 사용
// import { loginUser } from '../utils/login-api'; // API 호출 함수

// const Login = ({ setIsLoggedIn }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // useNavigate 훅 사용

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await loginUser({ email, password });
//             if (response.message === "로그인 성공") {
//                 // 로그인 성공 시 상태 업데이트 및 리다이렉트
//                 setIsLoggedIn(true); // 로그인 상태 true로 설정
//                 navigate('/stock'); // 주식 페이지로 리다이렉트
//             } else {
//                 alert(response.detail);
//             }
//         } catch (error) {
//             console.error('로그인 오류:', error);
//             alert('로그인 중 문제가 발생했습니다. 다시 시도해 주세요.');
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <h2>로그인</h2>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="email"
//                     placeholder="이메일"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
//                 />
//                 <br />
//                 <input
//                     type="password"
//                     placeholder="비밀번호"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
//                 />
//                 <br />
//                 <button
//                     type="submit"
//                     style={{
//                         padding: '10px 20px',
//                         backgroundColor: '#4CAF50',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     로그인
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;
