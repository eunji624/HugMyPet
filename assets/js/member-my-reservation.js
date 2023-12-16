async function myProfile() {
	const accessToken = localStorage.getItem('accessToken');
	const response = await fetch('api/reservation/contract/check', {
		method: 'GET',
		headers: {
			authorization: `Bearer ${accessToken}`,
			Accept: 'application/json'
		}
	});
	const data = await response.json();
	const newData = data.data;
	// console.log('newData=>', newData);
	newData.forEach((reservationData) => {
		const newDate = reservationData.reservationDate.slice(0, 10);
		const status = reservationData.status === 'Completed' ? '예약 완료' : '예약 진행중';
		console.log('status', status);
		document.getElementById('petSitterName').innerText = `예약한 펫 시터 : ${reservationData.petSitterName}`;
		document.getElementById('reservationDate').innerText = `예약 신청 날짜 : ${newDate}`;
		document.getElementById('status').innerText = `현재 예약 상태 : ${status}`;
	});
}

myProfile();
