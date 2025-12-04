# Focus Place ☕️🧠
집중하기 좋은 공간들을 기록하고 공유하는 아카이빙 서비스 – Focus Place의 프론트엔드 저장소

카공하기 좋은 카페, 조용한 스터디 카페, 도서관, 코워킹 스페이스까지
“언제 어디서 집중 잘 됐는지”를 기록하고, 다른 사람들과 공유할 수 있는 서비스입니다.

순수 HTML/CSS/Vanilla JS로 구현된 웹 애플리케이션으로,  
백엔드 REST API와 통신하여 로그인, 회원가입, 게시글 조회, 작성, 수정, 삭제 등의 기능을 제공합니다.

Sue의 Fullstack 프로젝트입니다.

## 🧰 Tech Stack

- **Language**: HTML, CSS, JavaScript (ES6+)
- **Framework / Library**: 없음 (Vanilla JS)
- **빌드 도구**: 없음
- **API 통신**: `fetch` 기반 REST 호출
- **기타**:
  - 브라우저 Local Storage (JWT Access Token & 유저 정보 저장)
  - 모듈 시스템: ES Modules (`type="module"`)

## 주요 기능
- 회원 가입 / 로그인 / 로그아웃 / 회원정보 수정 / 회원 탈퇴
- 게시물 조회 / 작성 / 수정 / 삭제
- 댓글 작성 / 수정 / 삭제
- 좋아요

## 프로젝트 폴더 구조
```
📦src
 ┣ 📂pages
 ┃ ┣ 📜myPage.html
 ┃ ┣ 📜postDetail.html
 ┃ ┣ 📜postUpdate.html
 ┃ ┣ 📜postWrite.html
 ┃ ┣ 📜posts.html
 ┃ ┣ 📜signup.html
 ┃ ┣ 📜userInfoEdit.html
 ┃ ┗ 📜userPasswordEdit.html
 ┣ 📂styles
 ┃ ┣ 📜login.css
 ┃ ┣ 📜postDetail.css
 ┃ ┣ 📜postUpdate.css
 ┃ ┣ 📜postWrite.css
 ┃ ┣ 📜posts.css
 ┃ ┣ 📜signup.css
 ┃ ┣ 📜userInfoEdit.css
 ┃ ┗ 📜userPasswordEdit.css
 ┗ 📂utils
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜formValidation.js
 ┃ ┃ ┣ 📜loadProfile.js
 ┃ ┃ ┣ 📜login.js
 ┃ ┃ ┗ 📜signup.js
 ┃ ┣ 📂comment
 ┃ ┃ ┣ 📜commentDelete.js
 ┃ ┃ ┣ 📜commentUpdate.js
 ┃ ┃ ┣ 📜commentWrite.js
 ┃ ┃ ┗ 📜loadComments.js
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜likePost.js
 ┃ ┃ ┣ 📜loadMyPostList.js
 ┃ ┃ ┣ 📜postDelete.js
 ┃ ┃ ┣ 📜postListRead.js
 ┃ ┃ ┣ 📜postRead.js
 ┃ ┃ ┣ 📜postUpdate.js
 ┃ ┃ ┣ 📜postWrite.js
 ┃ ┃ ┗ 📜renderPosts.js
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜profileEditModal.js
 ┃ ┃ ┣ 📜userDeleteModal.js
 ┃ ┃ ┣ 📜userInfoEdit.js
 ┃ ┃ ┗ 📜userPasswordEdit.js
 ┃ ┣ 📜backButton.js
 ┃ ┣ 📜commonRequest.js
 ┃ ┗ 📜modal.js

```
