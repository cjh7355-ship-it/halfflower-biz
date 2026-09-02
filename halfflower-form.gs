/**
 * 하프플라워 기업제휴 — 상담 신청 수집 (Google Apps Script)
 * halfflower-biz.html 의 신청 폼이 이 웹앱으로 POST 합니다.
 *
 * ── 설정 순서 ────────────────────────────────────────────────
 * 1. 구글 스프레드시트를 새로 만듭니다.
 * 2. 확장 프로그램 → Apps Script 를 열고, 이 파일 내용을 전부 붙여넣습니다.
 * 3. 아래 NOTIFY_EMAIL 에 신규 신청 알림을 받을 주소를 넣습니다. (비우면 발송 안 함)
 *    SHEET_ID 는 스프레드시트에 붙인 스크립트라면 비워두면 됩니다.
 * 4. 배포 → 새 배포 → 유형 "웹 앱"
 *      실행 계정 : 나
 *      액세스 권한 : 모든 사용자          ← 이게 아니면 폼에서 접수되지 않습니다
 * 5. 배포 후 나오는 URL(.../exec)을 복사해
 *    halfflower-biz.html 맨 아래 <script> 의 ENDPOINT 값에 붙여넣습니다.
 *
 * ※ "액세스 권한: 모든 사용자"는 이 URL을 아는 누구나 POST 할 수 있다는 뜻입니다.
 *   폼에 허니팟(website 칸)을 넣어 단순 봇은 걸러지지만, 스팸이 쌓이면
 *   reCAPTCHA 추가나 URL 교체(재배포)를 고려하세요.
 */

const SHEET_ID     = '';          // 별도 스프레드시트에 쓸 때만 입력 (URL의 /d/ 와 /edit 사이)
const SHEET_NAME   = '제휴상담';
const NOTIFY_EMAIL = '';          // 예: 'yyc888@halfflower.co.kr'

const HEADERS = ['접수일시', '회사명', '담당자명', '연락처', '이메일',
                 '상담 유형', '월 예상 물량', '상담 내용', '유입 페이지'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    // 허니팟: 사람에게는 보이지 않는 칸이 채워져 있으면 봇이므로 조용히 버림
    if (d.website) return respond_({ ok: true });

    getSheet_().appendRow([
      new Date(), d.company || '', d.name || '', d.tel || '', d.email || '',
      d.type || '', d.volume || '', d.memo || '', d.page || ''
    ]);

    if (NOTIFY_EMAIL) notify_(d);
    return respond_({ ok: true });

  } catch (err) {
    console.error(err);
    return respond_({ ok: false, error: String(err) });
  }
}

/** 배포가 살아 있는지 브라우저로 확인할 때 씁니다. */
function doGet() {
  return respond_({ ok: true, msg: 'halfflower 제휴상담 접수 endpoint' });
}

function getSheet_() {
  const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID)
                      : SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150);   // 접수일시
    sheet.setColumnWidth(8, 380);   // 상담 내용
  }
  return sheet;
}

function notify_(d) {
  const body =
    '새 제휴 상담 신청이 들어왔습니다.\n\n' +
    '회사명      : ' + (d.company || '') + '\n' +
    '담당자명    : ' + (d.name    || '') + '\n' +
    '연락처      : ' + (d.tel     || '') + '\n' +
    '이메일      : ' + (d.email   || '') + '\n' +
    '상담 유형   : ' + (d.type    || '') + '\n' +
    '월 예상 물량: ' + (d.volume  || '') + '\n\n' +
    '상담 내용\n' + (d.memo || '(없음)') + '\n';

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '[제휴 상담] ' + (d.company || '회사명 미기재') + ' / ' + (d.name || ''),
    body: body,
    replyTo: d.email || undefined
  });
}

function respond_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
