# 하프플라워 기업제휴 랜딩 페이지

기업 경조사·직원 복지 꽃 배송 제휴 안내 페이지입니다.

- `index.html` — 페이지 전체. 이미지 5장이 base64로 내장된 단일 파일이라 이 파일 하나만 있으면 그대로 열립니다.
- `halfflower-form.gs` — 상담 신청을 구글 스프레드시트로 받는 Apps Script. 설정 순서는 파일 위쪽 주석에 있습니다.

## 사양

- 가로 1400px 고정, 비반응형 (폭 기준 미디어쿼리 없음)
- 본문 Pretendard, 화환 리본만 나눔명조 800
- 한글 줄바꿈은 `word-break: keep-all`로 어절 단위 처리
- `noindex, nofollow` 적용 — 검색엔진에 노출되지 않습니다. 영업용으로 공개하려면 `index.html`의 robots 메타 한 줄을 지우세요.

## 아직 남은 작업

- `index.html` 아래쪽 `var ENDPOINT = ""` 에 Apps Script 배포 URL을 넣어야 상담 신청이 접수됩니다.
- "제안서 내려받기 (PDF)" 버튼과 개인정보 "자세히 보기" 링크가 빈 링크(`href="#"`)입니다.
