async function signIn() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// 서버로 전송할 데이터 생성
	const userInput = {
		email: email,
		password: password
	};

	try {
		const petSitter = await fetch('api/sign-in/pet-sitters', {
			method: 'POST',
			Accept: 'application/json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userInput)
		});

		const petSitterResult = await petSitter.json();
		if (petSitterResult.success) {
			alert(petSitterResult.message);

			const accessToken = petSitterResult.data.accessToken;
			localStorage.setItem('accessToken', accessToken);

			window.location.href = '/';
			return;
		} else {
			alert(memberResult.message);
			return;
		}
	} catch (error) {
		console.error('로그인 실패:', error);
	}
}

const hideBtn = () => {
	document.addEventListener('DOMContentLoaded', () => {
		const signUpButton = document.querySelector('.sign-up-btn');
		const petsitterSignUpButton = document.querySelector('#petsitter-signup-btn');
		const memberMyProfileButton = document.querySelector('.member-my-profile-btn');
		const petsitterMyProfileButton = document.querySelector('.petsitter-my-profile-btn');
		const petsitterSignInButton = document.querySelector('.petsitter-sign-in');
		const memberSignInButton = document.querySelector('.sign-in-btn');
		const logoutButton = document.querySelector('#logout_btn');
		const signOutButton = document.querySelector('.sign-out-btn');

		let accessToken = localStorage.getItem('accessToken');

		if (accessToken) {
			signUpButton.style.display = 'none';
			petsitterSignUpButton.style.display = 'none';
			memberMyProfileButton.style.display = 'block';
			petsitterMyProfileButton.style.display = 'block';
			petsitterSignInButton.style.display = 'none';
			memberSignInButton.style.display = 'none';
			logoutButton.style.display = 'block';
			signOutButton.style.display = 'block';
		} else {
			signUpButton.style.display = 'block';
			petsitterSignUpButton.style.display = 'block';
			memberMyProfileButton.style.display = 'none';
			petsitterMyProfileButton.style.display = 'none';
			petsitterSignInButton.style.display = 'block';
			memberSignInButton.style.display = 'block';
			logoutButton.style.display = 'none';
		}
	});
};

hideBtn();
