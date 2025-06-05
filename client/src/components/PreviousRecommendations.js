// stockestic_web\client\src\components\PreviousRecommendations.js
import React, { useState, useEffect } from 'react';
import API_URL from '../utils/server-api';

function PreviousRecommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [visibleRecommendations, setVisibleRecommendations] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      fetch(`${API_URL}/get_recommendation_files`, {
        credentials: 'include',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('서버 응답이 올바르지 않습니다.');
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data.recommendations)) {
            console.log(data)
            const sortedRecommendations = data.recommendations.sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            });
            setRecommendations(sortedRecommendations);
          } else {
            throw new Error('올바른 형식의 데이터가 아닙니다.');
          }
        })
        .catch(error => {
          console.error('추천 목록 가져오기 오류:', error);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);
  
    const handleRecommendationClick = (filename) => {
      window.open(`${API_URL}/get_recommendation/${filename}`, '_blank');
    };
  
    const loadMore = () => {
      setVisibleRecommendations(prevVisible => prevVisible + 5);
    };
  
    if (isLoading) {
      return <p>로딩 중...</p>;
    }
  
    if (error) {
      return <p>오류 발생: {error}</p>;
    }
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '20px' }}>
        <h2>이전 Stockestic 주식 레터</h2>
        {recommendations.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, width: '100%', maxWidth: '850px' }}>
            {recommendations.slice(0, visibleRecommendations).map((rec, index) => (
              <li key={index} style={{
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'stretch',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: '#f9f9f9'
              }}>
                <div
                  onClick={() => handleRecommendationClick(rec.file)}
                  style={{
                    marginRight: '10px',
                    marginTop: '5px',
                    backgroundColor: '#e0e0e0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '100px',
                    maxWidth: '250px',
                    flexShrink: 0,
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={rec.thumbnail || 'default-thumbnail.jpg'}
                    alt={rec.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#f0f0f0'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleRecommendationClick(rec.file); }}
                    style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', marginBottom: '10px' }}
                  >
                    {rec.title}
                  </a>
                  <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>{rec.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>추천 목록이 없습니다.</p>
        )}
        {visibleRecommendations < recommendations.length && (
          <button onClick={loadMore} style={{ width: '10%', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px' }}>
            더보기
          </button>
        )}
      </div>
    );
}

export default PreviousRecommendations;
