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
	const reservationCheckData = $('.reservations');
	reservationCheckData.empty();

	newData.forEach((data, i) => {
		const newReservationArr = reservationDateStr.split(', ');
		const reservationCheckCount = i + 1;
		const createdAt = data.createdAt.slice(0, 10);
		const status = data.status === 'Completed' ? '예약 완료' : '예약 진행중';

		return reservationCheckData.append(`
			<tr>
				<td class="reservationCount">${reservationCheckCount}</td>
				<td class="name">${data.petSitterName}</td>
				<td class="reservationDate">${newReservationArr[i]}</td>
				<td class="status">${status}</td>
				<td class="createDate">${createdAt}</td>
			</tr>
		`);
	});
}

myProfile();
