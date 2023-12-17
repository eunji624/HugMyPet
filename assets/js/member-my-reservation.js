import { getAccessToken } from './localstorage.js';

const token = getAccessToken();

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
	console.log('newDate', newData);
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
	}
	const newReservationArr = reservationDateStr.split(', ');

	const reservationCheckData = $('.reservations');
	reservationCheckData.empty();

	newData.forEach((data, i) => {
		const reservationCheckCount = i + 1;
		const createdAt = data.createdAt.slice(0, 10);
		const status = data.status === 'Completed' ? '예약 완료' : '예약 진행중';

		return reservationCheckData.append(`
			<tr>
				<td class="reservationCount">${reservationCheckCount}</td>
				<td class="name">${data.petSitterName}</td>
				<td class="reservationDate">${newReservationArr[i]}</td>
				<td class="status">${status}</td>
				<td class="createDate">${data.createdAt}</td>
				<td id=${data.petSitterId}>
					<button id=${data.reserveId} class="cancelReservation">예약 취소</button>
				</td>
				</tr>
		`);
	});
}

$('body').on('click', '.cancelReservation', async function (e) {
	const reserveId = [parseInt(e.target.id)];
	const petSitterId = e.target.parentElement.id;
	console.log('reserveId', reserveId);

	const response = await fetch(`api/reservation/contract/${petSitterId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ reserveId: reserveId })
	});
	const data = await response.json();
	console.log('response', data);
	// const newData = data.data;

	location.reload();
});
myProfile();
