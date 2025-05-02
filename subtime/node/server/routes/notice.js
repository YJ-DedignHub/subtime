// Express 라우터 모듈 불러오기
const fs = require('express');

// 파일 시스템 모듈 불러오기
const fs = require('fs');

// 경로 처리 모듈 불러오기
const path = require('path');

//라우터 인스턴스 생성
const router = express.Router();

// '/api/notices' 경로에 GET 요청 시 실행될 라우터 정의
router.get('/', (_req, res) => {
    // JSON 파일 경로 지정
    const filePath = path.join(__dirname, '..', 'data', 'notices.json');

    // JSON 파일 읽기
    fs.readFile(filePath, 'utf8', (err, data) => {
        // 파일 읽기 중 에러 발생 시
        if (err) {
            // 에러 응답
            res.status(500).json({ error: '파일 읽기 오류' });
            return;
        }

        // 읽은 데이터를 JSON 형식으로 변환
        const notices = JSON.parse(data);

        // 변환한 데이터를 JSON 형식으로 반환
        res.json(notices);
    });
});

// 라우터 모듈 내보내기
module.exports = router;