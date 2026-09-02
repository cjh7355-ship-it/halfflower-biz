# 하프플라워 기업제휴 랜딩 페이지

기업 경조사·직원 복지 꽃 배송 제휴 안내 페이지입니다.

## 파일

| 파일 | 용도 |
|---|---|
| `index.html` | 랜딩 페이지 본체. 자체 폼 → 구글 폼 전달. 이미지 base64 내장 |
| `index-embed.html` | 같은 디자인이되 스크립트 없음. 폼은 구글 폼 iframe. 스크립트를 지우는 CMS 페이지 편집기용 |
| `blog.html` | 티스토리·다음 카페 등 에디터 붙여넣기용. 신청은 링크 버튼 |
| `blog-iframe.html` | 위와 같으나 구글 폼을 iframe으로 embed. **src 값을 채워야 동작합니다** |
| `page-1400.html` | 인라인 스타일 + 표 배치, 가로 1400px 고정. 붙여넣기용 |
| `halfflower-proposal.pdf` | 기업제휴 제안서 A4 5페이지. 히어로의 내려받기 버튼이 가리킵니다 |
| `proposal-source.html` | 위 PDF의 원본 HTML. 고칠 때 이 파일을 A4로 인쇄하면 됩니다 |
| `img/01~05.jpg` | 상황별 상품 이미지. 블로그 버전이 URL로 참조합니다 |

## 상담 신청

응답은 구글 폼(https://forms.gle/nujcdbRUTJp31zVW9)에 연결된
구글 스프레드시트로 모입니다. 경로가 파일마다 다릅니다.

- `index.html` — 페이지의 자체 폼에 입력하면 **값만 구글 폼으로 넘어갑니다.**
  방문자는 구글 폼 화면을 보지 않습니다. `index.html` 아래쪽 script의
  `FORM_ID`와 `ENTRY`를 채워야 동작합니다. 비어 있으면 신청 버튼이
  구글 폼을 새 창으로 여는 방식으로 안전하게 대체됩니다.
- `index-embed.html` — 구글 폼을 페이지 안에 iframe으로 embed. 스크립트가
  전혀 없어서 스크립트를 지우는 편집기에서도 폼이 살아 있습니다.
- `blog.html` — 구글 폼으로 가는 링크 버튼. 에디터가 스크립트를 지우므로
  값 전달 방식은 쓸 수 없습니다.
- `blog-iframe.html` — 구글 폼을 글 안에 embed. `src` 값을 채워야 합니다.

### FORM_ID와 ENTRY 얻는 법

구글 폼 → 우상단 ⋮ → **미리 채워진 링크 가져오기** → 각 칸에 아무 값이나
넣고 [링크 생성]. 나오는 주소가 아래 형태이고, 여기에 둘 다 들어 있습니다.

    https://docs.google.com/forms/d/e/<FORM_ID>/viewform?usp=pp_url
      &entry.1111111=회사명값&entry.2222222=담당자값&...

### iframe src 얻는 법

구글 폼 → [보내기] → `< >` 아이콘. 나오는 코드의 `src` 값을 씁니다.
forms.gle 단축주소는 iframe에서 동작하지 않습니다.

## 사양

- `index.html`은 가로 1400px 고정, 비반응형 (폭 기준 미디어쿼리 없음)
- 본문 Pretendard, 화환 리본만 나눔명조 800
- 한글 줄바꿈은 `word-break: keep-all`로 어절 단위 처리
- `blog.html` 계열은 스타일을 전부 인라인, 스크립트 없음, 가변 폭

## 제안서 PDF 다시 만들기

`proposal-source.html`을 브라우저에서 열고 A4·여백 없음·배경 그래픽 켜기로
인쇄하면 됩니다. 한글은 Noto Sans KR 기준이며, 페이지마다 297mm에 맞춰
잘리지 않도록 짜여 있으니 내용을 늘릴 때는 넘침을 확인하세요.

## 남은 작업

- `noindex, nofollow`가 걸려 있습니다. 검색 노출을 원하면 `index.html`의 robots 메타 한 줄을 지우세요.
- `page-1400.html`과 `blog*.html`에는 제안서 내려받기 버튼이 없습니다.
