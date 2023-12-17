const button = document.getElementById('logout_btn');

document.addEventListener('DOMContentLoaded', () => {
	button.addEventListener('click', async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: 'application/json'
				}
			});

			const data = await response.json();
			if (data.success) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('role');
				alert('로그아웃 완료');
				window.location.href = '/';
			} else {
				alert('로그인이 된 계정이 없습니다.');
				window.location.href = 'sign-in';
			}
		} catch (error) {
			console.error(error);
		}
	});
});
