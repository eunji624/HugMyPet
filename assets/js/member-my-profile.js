async function myProfile() {
	const accessToken = localStorage.getItem('accessToken');
	const response = await fetch(`api/my-profile/users`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: 'application/json'
		}
	});
	const data = await response.json();

	document.getElementById('email').innerText = `이메일: ${data.message.user.email}`;
	document.getElementById('name').innerText = `이름: ${data.message.user.name}`;

	console.log('data==>', data);
}

myProfile();
