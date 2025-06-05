// stockestic_web\client\src\pages\Home.js
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Home.css';

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 1200, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero-section" data-aos="fade-in">
                <div className="hero-content">
                    <h1 data-aos="zoom-in">
                        <span className="highlight">Top 3</span> 주식과 코인,
                        <br />
                        지금 바로 만나보세요.
                    </h1>
                    <p data-aos="fade-up">
                        매일 신뢰할 수 있는 추천으로 당신의 투자 결정을
                        스마트하게.
                    </p>
                    <button className="cta-button" data-aos="flip-up">
                        무료 체험 시작하기
                    </button>
                </div>
                <div
                    className="hero-background"
                    data-aos="fade-in"
                    data-aos-delay="300"
                ></div>
            </section>

            {/* 서비스 소개 */}
            <section
                className="services-section"
                data-aos="fade-up"
                data-aos-delay="200"
            >
                <h2 data-aos="fade-down">왜 Stockestic인가?</h2>
                <div className="service-cards">
                    <div
                        className="service-card"
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >
                        <img
                            src="/assets/stock-icon.PNG"
                            alt="주식 추천"
                            className="service-icon"
                        />
                        <h3>Top 3 주식 추천</h3>
                        <p>
                            매일 아침, 가장 유망한 종목을 엄선하여 제공합니다.
                        </p>
                    </div>
                    <div
                        className="service-card"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <img
                            src="/assets/coin-icon.PNG"
                            alt="코인 추천"
                            className="service-icon"
                        />
                        <h3>Top 3 코인 추천</h3>
                        <p>
                            신뢰할 수 있는 데이터 기반 코인 추천.
                        </p>
                    </div>
                    <div
                        className="service-card"
                        data-aos="fade-left"
                        data-aos-delay="500"
                    >
                        <img
                            src="/assets/email-icon.PNG"
                            alt="이메일 알림"
                            className="service-icon"
                        />
                        <h3>이메일로 간편 전송</h3>
                        <p>
                            간편하게 이메일로 매일 최신 정보를 확인하세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 추천 성과 */}
            <section
                className="performance-section"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                <div className="performance-content">
                    <h2 data-aos="zoom-in">지난달 추천 성과</h2>
                    <p data-aos="fade-up">Stockestic의 추천으로 투자 성과를 확인하세요.</p>
                    <div
                        className="performance-graph"
                        data-aos="zoom-out-up"
                        data-aos-delay="200"
                    >
                        {/* 그래프 라이브러리 사용 가능 */}
                        <span>그래프 공간</span>
                    </div>
                    <ul
                        className="performance-stats"
                        data-aos="fade-right"
                        data-aos-delay="600"
                    >
                        <li>
                            <strong>주식</strong>: 평균 수익률 +12%
                        </li>
                        <li>
                            <strong>코인</strong>: 평균 수익률 +8%
                        </li>
                    </ul>
                </div>
            </section>

            {/* 사용자 리뷰 */}
            <section
                className="reviews-section"
                data-aos="fade-up"
                data-aos-delay="200"
            >
                <h2 data-aos="fade-down">사용자 리뷰</h2>
                <div className="reviews">
                    <div
                        className="review-card"
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >
                        <blockquote>
                            "Stockestic의 추천으로 투자 수익이 크게 늘었습니다.
                            간편하고 믿을 수 있는 서비스!"
                        </blockquote>
                        <span>- 사용자 A</span>
                    </div>
                    <div
                        className="review-card"
                        data-aos="fade-left"
                        data-aos-delay="400"
                    >
                        <blockquote>
                            "매일 신뢰할 수 있는 정보를 받을 수 있어 정말
                            유용합니다!"
                        </blockquote>
                        <span>- 사용자 B</span>
                    </div>
                </div>
            </section>

            {/* 구독 플랜 */}
            <section
                className="plans-section"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                <h2 data-aos="zoom-in">구독 플랜</h2>
                <div className="plans">
                    <div
                        className="plan-card"
                        data-aos="flip-right"
                        data-aos-delay="200"
                    >
                        <h3>무료 체험</h3>
                        <p>7일 동안 모든 기능을 무료로 체험하세요.</p>
                        <button>시작하기</button>
                    </div>
                    <div
                        className="plan-card"
                        data-aos="flip-up"
                        data-aos-delay="400"
                    >
                        <h3>월간 플랜</h3>
                        <p>₩20,000 / 월</p>
                        <button>구독하기</button>
                    </div>
                    <div
                        className="plan-card"
                        data-aos="flip-left"
                        data-aos-delay="600"
                    >
                        <h3>연간 플랜</h3>
                        <p>₩200,000 / 년 (2개월 무료)</p>
                        <button>구독하기</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
