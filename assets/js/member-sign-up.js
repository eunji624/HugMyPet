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

	// 서버로 데이터 전송
	fetch('http://localhost:3000/api/sign-up/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userInfo)
	})
		.then((response) => response.json())
		.then((result) => {
			console.log(result);
			if (result.success) {
				alert(`${result.message}`);
				window.location.href = 'main';
			} else {
				alert(`${result.message}`);
				window.location.href = 'member-sign-up';
			}
		})
		.catch((error) => {
			console.error('회원가입 실패:', error);
		});
}
