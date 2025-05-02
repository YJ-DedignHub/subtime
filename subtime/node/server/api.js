// Express 모듈 불러오기
const express = require('express');

// 앱 객체 생성
const app  = express();

// 도착 정보 API 라우터 불러오기
const arrivalRoute = require('./routes/arrival');

// 열차 위치 정보 API 라우터 불러오기
const positionRoute = require('/routes/position');

// 도착 정보 라우터 연결 (예:/api/train/arrival)
app.use('api/train/arrival', arrivalRoute)

// 열차위치 정보 라우터 연결 (예:/api/train/poaition)
app.use('/api/train/position', positionRoute);

// 모듈 외부에서 사용할 수 있도록 app 객체 내보내기
module.exports = app;

// HTTP 요청을 보내기 위한 axios 모듈 불러오기 
const axios = require('axios');

// .env 환경변수 파일을 로드하기 위한 dotenv 설정
require('dotenv').config();

// 서버가 수신 대기할 포트 번호 설정 (.env 값이 있으면 그걸 사용)
const PORT = process.env.PORT || 4000;

// 열차 위치 정보 API
// 서울시 지하철 열차의 현재 위치를 반환합니다
app.get('/api/train/position', async (req, res) => {
    const apiKey = process.env.API_KEY_TRAIN_POS;
    const url = `https://openapi.seoul.go.kr:8088/${apiKey}/json/realtimePosition/1/100/`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        console.error('열차 위치정보 요청 실패:', err.message);
        res.status(500).json({error: '열차 위치정보 요청 실패' });
    }
});

// 도착정보 API
// 서울시 지하철 각 역의 실시간 도착 정보를 반환합니다
app.get('api/train/arrival', async (req, res) => {
    const apikey = process.env.API_KEY_ARRIVAL;
    const url = `https://openapi.seoul.go.kr:8088/${apiKey}/json/realtimeStationArrival/1/100/`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        console.error('도착정보 요청 실패:', err.message);
        res.status(500).json({ error: '도착정보 요청 실패' });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`API 서버 실행중: http://localhost:${PORT}`);
});