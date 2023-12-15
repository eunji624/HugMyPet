async function myProfile() {
	const accessToken = localStorage.getItem('accessToken');
	const response = await fetch(`api/my-profile/pet-sitters`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: 'application/json'
		}
	});
	const data = await response.json();
	document.getElementById('email').innerText = `이메일: ${data.message.user.email}`;
	document.getElementById('name').innerText = `이름: ${data.message.user.name}`;
	document.getElementById('selfIntro').innerText = `자기소개: ${data.message.user.selfIntro}`;
	document.getElementById('certificate').innerText = `자격증: ${data.message.user.certificate}`;
	document.getElementById('availableAddress').innerText = `가능 주소: ${data.message.user.availableAddress}`;
}

myProfile();
