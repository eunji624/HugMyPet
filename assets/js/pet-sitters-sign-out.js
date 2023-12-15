async function signOut() {
	try {
		const password = prompt('비밀번호를 입력하세요');
		if (!password) {
			alert('비밀번호를 입력하세요.');
			return;
		}

		if (password === null) {
			alert('비밀번호 입력이 취소되었습니다.');
			return;
		}

		if (password.trim() === '') {
			alert('비밀번호를 입력하세요.');
			return;
		}

		const accessToken = localStorage.getItem('accessToken');
		const response = await fetch(
			'api/sign-out/pet-sitters',
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ password })
			}
			// (window.location.href = '/'),
			// alert('회원탈퇴 완료'),
			// localStorage.removeItem('accessToken')
		);
		const data = await response.json();

		if (data.success) {
			alert('회원탈퇴 완료');
			localStorage.removeItem('accessToken');
			window.location.href = '/';
			return;
		} else {
			alert('비밀번호가 다릅니다.');
			return;
		}
	} catch (error) {
		console.error(error);
	}
}

const btn = document.querySelector('.sign-out-btn');
btn.addEventListener('click', () => {
	signOut();
});
