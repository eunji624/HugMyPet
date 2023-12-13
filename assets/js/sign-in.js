async function signIn() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// 서버로 전송할 데이터 생성
	const userInput = {
		email: email,
		password: password
	};

	// 서버로 데이터 전송
	try {
		const member = await fetch('http://localhost:3000/api/sign-in/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInput)
		});
		const memberResult = await member.json();
		if (memberResult.success) {
			alert(memberResult.message);
			window.location.href = 'main';
			return;
		} else {
			try {
				const petSitter = await fetch('http://localhost:3000/api/sign-in/pet-sitters', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(userInput)
				});
				const petSitterResult = await petSitter.json();
				if (petSitterResult.success) {
					alert(petSitterResult.message);
					window.location.href = 'main';
					return;
				} else {
					alert(memberResult.message);
					return;
				}
			} catch (error) {
				console.error('로그인 실패:', error);
			}
		}
	} catch (error) {
		console.error('로그인 실패:', error);
	}
}
