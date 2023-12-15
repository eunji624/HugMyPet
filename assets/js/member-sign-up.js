async function signup() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirmPassword').value;
	const name = document.getElementById('name').value;
	const age = parseInt(document.getElementById('age').value);
	const imagePath = document.getElementById('imagePath').value;
	const address = document.getElementById('address').value;

	if (password !== confirmPassword) {
		alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
		return;
	}

	// 서버로 전송할 데이터 생성
	const userInfo = {
		name: name,
		email: email,
		password: password,
		confirmPassword: confirmPassword,
		age: age,
		imagePath: imagePath,
		address: address
	};
	try {
		// 서버로 데이터 전송
		const memberSignUp = await fetch('api/sign-up/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
		});

		const memberSignUpResult = await memberSignUp.json();

		if (memberSignUpResult.success) {
			alert(memberSignUpResult.message);

			window.location.href = '/';
			return;
		} else {
			alert(memberSignUpResult.message);
			return;
		}
	} catch (error) {
		console.error('회원가입 실패:', error);
	}
}
