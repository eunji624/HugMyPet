async function signup() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirmPassword').value;
	const name = document.getElementById('name').value;
	const age = parseInt(document.getElementById('age').value);
	const imagePath = document.getElementById('imagePath').value;
	const availableAddress = document.getElementById('availableAddress').value;
	const selfIntro = document.getElementById('selfIntro').value;
	const certificate = document.getElementById('certificate').value;
	const availablePet = document.getElementById('availablePet').value;

	if (password !== confirmPassword) {
		alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
		return;
	}
	console.log('haha');
	// 서버로 전송할 데이터 생성
	const petsitterInfo = {
		name: name,
		email: email,
		password: password,
		confirmPassword: confirmPassword,
		age: age,
		imagePath: imagePath,
		availableAddress: availableAddress,
		availablePet: availablePet,
		selfIntro: selfIntro,
		certificate: certificate
	};
	try {
		// 서버로 데이터 전송
		const petsitterSignUp = await fetch('api/sign-up/pet-sitters', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(petsitterInfo)
		});

		const petsitterSignUpResult = await petsitterSignUp.json();

		if (petsitterSignUpResult.success) {
			alert(petsitterSignUpResult.message);

			window.location.href = '/';
			return;
		} else {
			alert(petsitterSignUpResult.message);
			return;
		}
	} catch (error) {
		console.error('회원가입 실패:', error);
	}
}
