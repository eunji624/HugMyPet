// // console.log('헤더 실행');

// import { getAccessToken, setAccessToken } from '/js/localStorage.js';

// function loginHeader() {
//   const accessToken = getAccessToken();

//   drawHeaderRight(accessToken);
// }
// // '내 정보 보기','프로젝트 등록'
// function drawHeaderRight(login) {
//   const isLogin = login ? true : false;
//   const isOk = [
//     {
//       name: '내 정보 보기',
//       url: '/profile',
//     },
//     {
//       name: '프로젝트 등록',
//       url: '/project-regist',
//     },
//   ];
//   const isNot = [
//     {
//       name: 'Log in',
//       url: '/login',
//     },
//     {
//       name: 'Sign-up',
//       url: '/sign-up',
//     },
//   ];

//   $('header #header .h-right').attr('data-login', isLogin);
//   $('header #header .h-right').empty();
//   $('header #header .h-right').append(`
//     <div class="l-btn">
//       <a href="${isLogin ? isOk[0].url : isNot[0].url}">
//         <button>
//             ${isLogin ? isOk[0].name : isNot[0].name}
//         </button>
//       </a>
//     </div>
//     <div class="r-btn">
//         <a href="${isLogin ? isOk[1].url : isNot[1].url}">
//           <button>
//             ${isLogin ? isOk[1].name : isNot[1].name}
//           </button>
//         </a>

//     </div>
//   `);
// }

// loginHeader();

const hideBtn = async () => {
	const signUpButton = document.querySelector('.sign-up-btn');
	const petsitterSignUpButton = document.querySelector('#petsitter-signup-btn');
	const memberMyProfileButton = document.querySelector('.member-my-profile-btn');
	const petsitterMyProfileButton = document.querySelector('.petsitter-my-profile-btn');
	const petsitterSignInButton = document.querySelector('.petsitter-sign-in');
	const memberSignInButton = document.querySelector('.sign-in-btn');
	const logoutButton = document.querySelector('#logout_btn');
	const memberSignOutButton = document.querySelector('.member-sign-out-btn');
	const petsitterSignOutButton = document.querySelector('.petsitter-sign-out-btn');

	let accessToken = localStorage.getItem('accessToken');
	let role = localStorage.getItem('role');

	if (accessToken && role === 'user') {
		signUpButton.style.display = 'none';
		petsitterSignUpButton.style.display = 'none';
		memberMyProfileButton.style.display = 'block';
		petsitterMyProfileButton.style.display = 'none';
		petsitterSignInButton.style.display = 'none';
		memberSignInButton.style.display = 'none';
		logoutButton.style.display = 'block';
		memberSignOutButton.style.display = 'block';
		petsitterSignOutButton.style.display = 'none';
	} else if (accessToken && role === 'petsitter') {
		signUpButton.style.display = 'none';
		petsitterSignUpButton.style.display = 'none';
		memberMyProfileButton.style.display = 'none';
		petsitterMyProfileButton.style.display = 'block';
		petsitterSignInButton.style.display = 'none';
		memberSignInButton.style.display = 'none';
		logoutButton.style.display = 'block';
		memberSignOutButton.style.display = 'none';
		petsitterSignOutButton.style.display = 'block';
	} else {
		signUpButton.style.display = 'block';
		petsitterSignUpButton.style.display = 'block';
		memberMyProfileButton.style.display = 'none';
		petsitterSignInButton.style.display = 'block';
		memberSignInButton.style.display = 'block';
		logoutButton.style.display = 'none';
	}
};

hideBtn();
