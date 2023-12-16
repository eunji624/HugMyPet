async function memberSignIn() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// 서버로 전송할 데이터 생성
	const userInput = {
		email: email,
		password: password
	};

	try {
		const member = await fetch('api/sign-in/users', {
			method: 'POST',
			Accept: 'application/json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userInput)
		});
		const memberResult = await member.json();

		if (memberResult.success) {
			alert(memberResult.message);

			const accessToken = memberResult.data.accessToken;
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('role', 'user');

			window.location.href = '/';
			return true;
		} else {
			alert(memberResult.message);
		}
	} catch (error) {
		console.error('로그인 실패:', error);
	}
}

async function petsitterSignIn() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// 서버로 전송할 데이터 생성
	const userInput = {
		email: email,
		password: password
	};

	try {
		const petsitter = await fetch('api/sign-in/pet-sitters', {
			method: 'POST',
			Accept: 'application/json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userInput)
		});
		const petsitterResult = await petsitter.json();

		if (petsitterResult.success) {
			alert(petsitterResult.message);

			const accessToken = petsitterResult.data.accessToken;
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('role', 'petsitter');

			window.location.href = '/';
			await hideaBtn();
			return true;
		} else {
			alert(petsitterResult.message);
		}
	} catch (error) {
		console.error('로그인 실패:', error);
	}
}

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
