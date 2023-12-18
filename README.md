# HugMyPet _ 펫시터 예약 서비스
내일배움캠프 백오피스 팀프로젝트
</br>
 - http://mallish.store/

</br>
</br>

## 팀원 

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/eunji624"><img src="https://avatars.githubusercontent.com/u/130081021?v=4" width="100px;" alt=""/><br /><sub><b> 팀장 : 유은지 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/kimminjae981002"><img src="https://avatars.githubusercontent.com/u/145568228?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 김민재 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/Geniusjun6"><img src="https://avatars.githubusercontent.com/u/146689742?v=4" width="100px;" alt=""/><br /><sub><b> 팀원 : 문준식 </b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

</br>
</br>

## 팀원 별 맡은 역할
  - 팀장: 유은지

  - 김민재
    - 펫시터 회원 데이터 crd 기능 및 프론트 구현
    - 유저  회원 데이터 crd 기능 및 프론트 구현
    - 현재 유저의 종류에 따라 프론트 버튼 보여주는 기능 구현
    - 인증 미들웨어 구현
    

  - 문준식
    - 펫시터의 스케줄 crud 기능 구현 
    - 펫시터의 내정보 보기 페이지 프론트 구현
        (예약달력을 통한 스케줄 추가, 삭제)
        (리뷰 작성 및 조회)
    - 메인페이지 프론트 구현
  
  - 유은지 
    - 일반유저의 펫시터 예약부분 crud 기능 구현
    - 일반유저의 리뷰 crud 기능 구현
    - 일반 유저 내정보 보기 페이지 프론트 구현
      (예약 조회 및 삭제)
    - 전체적인 에러처리 미들웨어 구현
    - Joi 유효성 검사 미들웨어 구현


  

## 주요 기능

- **펫시터 예약 서비스**
</br>

- **일반유저/펫시터 별 서비스 제공**
    일반유저는 펫시터를 예약하고, 리뷰를 남길 수 있으며, 
    펫시터는 예약스케줄을 관리하고 펫을 원하는 날에 돌볼 수 있습니다. 
    </br>
- **리뷰 crud**
    사용자가 리뷰를 남길때, 실제 이용한 후에만 해당 펫시터에게 리뷰를 남길 수 있도록 처리가 되어 있으며, 
    리뷰작성시 평점이 입력되면 이것의 처리와 함께 펫시터의 평균 평점도 처리가 됩니다. 
   </br>
- **예약 CRUD**
    일반 유저는 펫시터가 허용한 스케줄만 예약 가능하며, 예약 완료 후 예약 정보를 조회할 수 있습니다.
    펫시터 유저도 현재 예약된 목록을 조회할 수 있으며, 자신이 가능한 날을 자유롭게 오픈하여 예약을 받을 수 있습니다.    
    </br>
</br>
</br>
</br>

### 기술 스텍 
<div>
<img src="https://img.shields.io/badge/javaScript-F7DF1E?style=for-the-badge&logo=javaScript&logoColor=black">

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">

<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">

<img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">

<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white">

<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=black">

<img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white">
</div>
</br>
</br>

### 폴더 구조

📦assets
 ┣ 📂Img
 ┣ 📂css
 ┗ 📂js
📦prisma
📦src
 ┣ 📂controller
 ┣ 📂middlewares
 ┣ 📂repository
 ┣ 📂routers
 ┣ 📂service
 ┣ 📂utils
 ┃ ┗ 📂prisma
 ┃ ┃ ┗ 📜index.js
 ┣ 📂views
 ┗ 📜app.js

</br>
</br>