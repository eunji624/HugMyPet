async function myProfile() {
	const memberMyProfile = async () => {
		const accessToken = localStorage.getItem('accessToken');
		const response = await fetch(`http://localhost:3000/api/my-profile/users`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json'
			}
		});
		const responseData = await response.json();
		return responseData;
	};

	const displayProfile = async () => {
		const profile = await memberMyProfile();

		if (profile.success) {
			// 가져온 프로필 정보를 화면에 표시
			document.getElementById('email').innerText = `이메일: ${profile.message.user.email}`;
			document.getElementById('name').innerText = `이름: ${profile.message.user.name}`;
		} else {
			console.error('프로필 정보를 불러오지 못 했다.');
		}
	};

	displayProfile();
}

myProfile();
