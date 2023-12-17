async function petsittersignOut() {
	try {
		const password = prompt('비밀번호를 입력하세요');

		if (password === null) {
			alert('비밀번호 입력이 취소되었습니다.');
			return;
		}

		const accessToken = localStorage.getItem('accessToken');
		const response = await fetch('/api/sign-out/pet-sitters', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		});
		const data = await response.json();

		if (data.success) {
			alert('회원탈퇴 완료');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('role');
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

async function membersignOut() {
	try {
		const password = prompt('비밀번호를 입력하세요');

		if (password === null) {
			alert('비밀번호 입력이 취소되었습니다.');
			return;
		}

		const accessToken = localStorage.getItem('accessToken');
		const response = await fetch('/api/sign-out/users', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		});

		const data = await response.json();

		if (data.success) {
			alert('회원탈퇴 완료');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('role');
			window.location.href = '/';
		} else {
			alert('비밀번호가 다릅니다.');
			return;
		}
	} catch (error) {
		console.error(error);
	}
}

const memberSignOutbtn = document.querySelector('.member-sign-out-btn');

memberSignOutbtn.addEventListener('click', () => {
	membersignOut();
});

const petsitterSignOutbtn = document.querySelector('.petsitter-sign-out-btn');

petsitterSignOutbtn.addEventListener('click', () => {
	petsittersignOut();
});
