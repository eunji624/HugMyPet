document.addEventListener('DOMContentLoaded', () => {
	const button = document.getElementById('signOut_btn');

	button.addEventListener('click', async () => {
		try {
			const password = document.getElementById('password').value;
			console.log(password);
			// const password = prompt('비밀번호를 입력하세요');
			// console.log(password);
			// if (!password) {
			// 	alert('비밀번호를 입력하세요.');
			// 	return;
			// }

			// if (password === null) {
			// 	alert('비밀번호 입력이 취소되었습니다.');
			// 	return;
			// }

			// if (password.trim() === '') {
			// 	alert('비밀번호를 입력하세요.');
			// 	return;
			// }

			const accessToken = localStorage.getItem('accessToken');
			const response = await fetch('http://localhost:3000/api/sign-out', {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: { 'Content-Type': 'application/json' }
				},
				body: JSON.stringify({ password })
			});
			const data = await response.json();
			console.log(data);
			if (data.success) {
				alert('회원탈퇴 완료');
				// window.location.href = 'sign-in';
			} else {
				alert('비밀번호가 다릅니다.');
				// window.location.href = 'sign-in';
			}
		} catch (error) {
			console.error(error);
		}
	});
});
