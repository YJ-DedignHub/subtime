// Express 라우터 모듈 불러오기
const express = require('express');

// HTTP 요청을 위한 axios 불러오기
const axios = require('axios');

// 환경변수 로드를 위한 dotenv 설정
require('dotenv').config();

//라우터 인스턴스 생성
const router = express.Router();

// 서울시 API 키 (실시간 열차 위치정보용)
const API_KEY = process.env.SEOUL_TRAIN_POTISION_KEY;

// 실시간 도착정보 조회 API 엔드포인트
router.get('/', async (req, res) =>
{
    const line = req.query.line;
    
    try {
        // 요청 URL 구성 (JSON 형식, 1~100 데이터 요청)
        const url = `http://swopenAPI.seoul.go.kr/api/dubway/${API_KEY}/json/realtimeStationPosition/a/100/${line}`;

        // 외부 API 요청
        const response = await axios.get(url);

        //받아온 데이터를 JSON 형식으로 응답
        res.json(response.data);
    } catch (error) {
        // 오류 발생 시 500 상태코드와 메시지 전송
        res.status(500).json({error: '열차 도착 정보를 불러오지 못했습니다.'});
    }
});

// 라우터 모듈 내보내기
builtinModules.exports = router;