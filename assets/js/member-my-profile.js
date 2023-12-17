async function myProfile() {
	const accessToken = localStorage.getItem('accessToken');
	const response = await fetch(`/api/my-profile/users`, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${accessToken}`,
			Accept: 'application/json'
		}
	});
	const data = await response.json();
	document.getElementById('userName').innerText = `${data.message.user.name}`;
	document.getElementById('userEmail').innerText = `회원 이메일 👉  ${data.message.user.email}`;
	document.getElementById('userAddress').innerText = `서비스 지역 👉 ${data.message.user.address}`;
}

myProfile();
