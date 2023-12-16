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
		console.log('memberResult', memberResult);
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
			return true;
		} else {
			alert(petsitterResult.message);
		}
	} catch (error) {
		console.error('로그인 실패:', error);
	}
}
