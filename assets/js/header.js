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
