async function signin() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// 서버로 전송할 데이터 생성
	const userInput = {
		email: email,
		password: password
	};

	// 서버로 데이터 전송
	fetch('http://localhost:3000/api/sign-in/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userInput)
	})
		.then((response) => response.json())
		.then((result) => {
			if (result.success) {
				alert(`로그인 성공.`);
				window.location.href = 'main';
			} else {
				alert(`${result.message}`);
			}
		})
		.catch((error) => {
			console.error('로그인 실패:', error);
		});
}
