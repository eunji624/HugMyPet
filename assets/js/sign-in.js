async function signin() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// 서버로 전송할 데이터 생성
	const userInput = {
		email: email,
		password: password
	};

	// 서버로 데이터 전송
	fetch('http://localhost:3000/api/end-users/sign-in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userInput)
	})
		.then((response) => response.json())
		.then((result) => {
			if (result.success) {
				alert(`${result.message}`);
				window.location.href = '/views/main.ejs';
			} else {
				alert(`${result.errorMessage}`);
				window.location.href = '/views/member-sign-up.ejs';
			}
		})
		.catch((error) => {
			console.error('로그인 실패:', error);
		});
}
