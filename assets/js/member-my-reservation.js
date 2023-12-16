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
	const parentElement = document.getElementsByClassName('reservationCheck')[0];
	const status = newData[0].status === 'Completed' ? '예약 완료' : '예약 진행중';
	let reservationDateStr = '';

	if (newData.length > 1) {
		newData.forEach((reservationData, i) => {
			const newDate = reservationData.reservationDate.slice(0, 10);
			if (i === newData.length - 1) {
				reservationDateStr += `${newDate}`;
			} else {
				reservationDateStr += `${newDate}, `;
			}
		});
	} else {
		reservationDateStr = newData[0].reservationDate.slice(0, 10);
	}

	const petSitterName = document.createElement('div');
	petSitterName.setAttribute('style', 'font-size: 20px; margin: 10px;');
	petSitterName.setAttribute('class', 'petSitterName');
	petSitterName.innerText = `예약한 펫 시터 : ${newData[0].petSitterName}`;

	const statusStatus = document.createElement('div');
	statusStatus.setAttribute('style', 'font-size: 20px; margin: 10px;');
	statusStatus.setAttribute('class', 'status');
	statusStatus.innerText = `현재 예약 상태 : ${status}`;

	const reservationDate = document.createElement('div');
	reservationDate.setAttribute('style', 'font-size: 20px; margin: 10px;');
	reservationDate.setAttribute('class', 'reservationDate');
	reservationDate.innerText = `예약 신청 날짜 : ${reservationDateStr}`;

	parentElement.appendChild(petSitterName);
	parentElement.appendChild(statusStatus);
	parentElement.appendChild(reservationDate);
}

myProfile();
