// stockestic_web\client\src\components\PerformanceTable.js
import React, { useState, useEffect } from 'react';
import API_URL from '../utils/server-api';

function PerformanceTable() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // 오늘로부터 30일 전 날짜 계산

      fetch(`${API_URL}/historical_performance`)
        .then(response => {
          if (!response.ok) {
            throw new Error('서버 응답이 올바르지 않습니다.');
          }
          return response.json();
        })
        .then(data => {
          // 30일 전 날짜 이후의 데이터만 필터링
          const filteredData = data.filter(item => new Date(item.date) >= startDate);
          const uniqueData = Array.from(new Map(filteredData.map(item => [item.date, item])).values());
          // 날짜를 기준으로 최신 순으로 정렬
          const sortedData = uniqueData.sort((a, b) => new Date(b.date) - new Date(a.date));
          setData(sortedData); // 정렬된 데이터를 상태에 저장
        })
        .catch(error => {
          console.error('데이터 가져오기 오류:', error);
          alert('데이터를 가져오는 중 오류가 발생했습니다: ' + error.message);
        });
    }, []);
  
    // 평균 계산 함수
    console.log(data)
    const calculateAverages = () => {
      let totalMaxReturn = 0;
      let totalMinReturn = 0;
      let totalCurrentReturn = 0;
      let count = 0;
  
      data.forEach(item => {
        item.returns.forEach(returnItem => {
          totalMaxReturn += returnItem.max_return;
          totalMinReturn += returnItem.min_return;
          totalCurrentReturn += returnItem.current_return;
          count++;
        });
      });
  
      return {
        averageMaxReturn: count > 0 ? (totalMaxReturn / count).toFixed(2) : 0,
        averageMinReturn: count > 0 ? (totalMinReturn / count).toFixed(2) : 0,
        averageCurrentReturn: count > 0 ? (totalCurrentReturn / count).toFixed(2) : 0,
      };
    };
  
    const { averageMaxReturn, averageMinReturn, averageCurrentReturn } = calculateAverages();
  
    return (
      <div style={{ margin: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', color: '#333', fontFamily: 'Arial, sans-serif' }}>이전 추천 항목 성과</h2>
        <table style={{ width: 'calc(100% - 27px)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', color: '#333', fontWeight: 'bold' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '7%' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '7%' }}>Exchange</th>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '10%' }}>Ticker</th>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '9%' }}>Stockestic <br/>score<br/>(0~57)</th>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '9%' }}>Kelly <br/>score<br/>(%)</th>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '9%' }}>Success <br/>probability<br/>(0~1)</th>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '15%' }}>Current Return</th>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '15%' }}>Max Return</th>
              <th style={{ border: '1px solid #ddd', padding: '12px 0', textAlign: 'center', width: '15%' }}>Min Return</th>              
            </tr>
          </thead>
        </table>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
                    {data.map((item) => (
                        item.returns.map((returnItem, index) => (
                            <tr key={`${item.date}-${returnItem.ticker}`} style={{ transition: 'background-color 0.3s', '&:hover': { backgroundColor: '#f1f1f1' } }}>
                                {index === 0 && ( // 첫 번째 항목에만 날짜와 거래소 표시
                                    <>
                                        <td rowSpan={item.returns.length} style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '7%' }}>{item.date}</td>
                                        <td rowSpan={item.returns.length} style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '7%' }}>{item.exchange}</td>
                                    </>
                                )}
                                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '10%' }}><strong>{returnItem.ticker}</strong></td>
                                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '9%' }}>{returnItem.score.toFixed(2)}</td>
                                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '9%' }}>{returnItem.kelly_bet.toFixed(2)}%</td>
                                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '9%' }}>{returnItem.success_prob.toFixed(2)}</td>
                                <td style={{
                                    border: '1px solid #ddd',
                                    padding: '12px',
                                    textAlign: 'center',
                                    color: returnItem.current_return > 5 ? 'red' : 'black',
                                    fontWeight: returnItem.current_return > 5 ? 'bold' : 'normal',
                                    width: '15%'
                                }}>
                                    {returnItem.current_return > 0 ? `+${returnItem.current_return.toFixed(2)}` : returnItem.current_return.toFixed(2)}% {/* + 기호 추가 */}
                                </td>
                                <td style={{
                                    border: '1px solid #ddd',
                                    padding: '12px',
                                    textAlign: 'center',
                                    color: returnItem.max_return > 5 ? 'red' : 'black',
                                    fontWeight: returnItem.max_return > 5 ? 'bold' : 'normal',
                                    width: '15%'
                                }}>
                                    {returnItem.max_return > 0 ? `+${returnItem.max_return.toFixed(2)}` : returnItem.max_return.toFixed(2)}% {/* + 기호 추가 */}
                                </td>
                                <td style={{
                                    border: '1px solid #ddd',
                                    padding: '12px',
                                    textAlign: 'center',
                                    color: returnItem.min_return < -5 ? 'blue' : 'black',
                                    fontWeight: returnItem.min_return < -5 ? 'bold' : 'normal',
                                    width: '15%'
                                }}>
                                    {returnItem.min_return.toFixed(2)}%
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
          </table>
        </div>
        <table style={{ width: 'calc(100% - 27px)', borderCollapse: 'collapse' }}>
            <tbody>
          <tr style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>
            <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '51%' }}>Monthly Average</td>
            <td style={{ 
              border: '1px solid #ddd', 
              padding: '12px', 
              textAlign: 'center', 
              width: '15%', 
              color: averageCurrentReturn > 5 ? 'red' : 'black', // 조건부 색상 설정
              fontWeight: averageCurrentReturn > 5 ? 'bold' : 'normal' // 조건부 글자 두께 설정
            }}>
              {averageCurrentReturn > 0 ? `+${averageCurrentReturn}` : averageCurrentReturn}% {/* + 기호 추가 */}
            </td>
            <td style={{ 
              border: '1px solid #ddd', 
              padding: '12px', 
              textAlign: 'center', 
              width: '15%', 
              color: averageMaxReturn > 5 ? 'red' : 'black', // 조건부 색상 설정
              fontWeight: averageMaxReturn > 5 ? 'bold' : 'normal' // 조건부 글자 두께 설정
            }}>
              {averageMaxReturn > 0 ? `+${averageMaxReturn}` : averageMaxReturn}% {/* + 기호 추가 */}
            </td>
            <td style={{ 
              border: '1px solid #ddd', 
              padding: '12px', 
              textAlign: 'center', 
              width: '15%', 
              color: averageMinReturn < -5 ? 'blue' : 'black', // 조건부 색상 설정
              fontWeight: averageMinReturn < -5 ? 'bold' : 'normal' // 조건부 글자 두께 설정
            }}>
              {averageMinReturn}%
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
}

export default PerformanceTable;
