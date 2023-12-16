import {
	drawThisMonthAvailableDatesCalendar,
	drawNextMonthAvailableDatesCalendar,
	toActivateAddThisMonthDates,
	toActivateAddNextMonthDates,
	drawThisMontDelteDatesCalendar,
	toActivateDeleteDates,
	drawNextMonthDeleteDatesCalendar,
	toActivateDeleteNextMonthDates
} from '../../assets/js/calendar.js';
import { getAccessToken } from './token.js';

const token = getAccessToken();

/* 특정 펫시터의 정보 가져오기 */
const getDetailPetsitterByToken = async (token) => {
	try {
		const result = await fetch(`/api/my-profile/pet-sitters`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((res) => res.json())
			.catch((err) => err);
		console.log(result);

		return result.data;
	} catch (err) {
		console.error(err);
	}
};

const petsitter = await getDetailPetsitterByToken(token);

if (!petsitter) {
	alert('존재하지 않는 펫시터 입니다.');
	window.location.href = '/';
}

/* 펫시터 정보 HTML로 뿌리기 */
const spreadPetSitterProfile = async (petsitter) => {
	console.log('petsitter: ', petsitter);
	const profileDiv = $('.petsitter-profile-wrab');
	profileDiv.empty();

	const { petSitterId, name, age, selfIntro, availablePet, availableAddress, certificate, score, imagePath } =
		petsitter;

	const profilePath = imagePath // 나중에 순서 바꾸기
		? '../../assets/Img/6.png'
		: `https://nbcamp-bukkit.s3.ap-northeast-2.amazonaws.com/${images_path.split(',')[0]}`;

	const petsitterScore = score === null ? 0 : score; //나중에 추가하기

	profileDiv.append(
		`<div class="pet-sitter-img-wrab">
    <img src="${profilePath}" alt="PetSitter-Img" class="petsitter-img" />
  </div>
  <div class="petsitter-info-wrab">
    <div class="petsitter-info-top">
      <div class="petsitter-name">${name}</div>
      <div class="petsitter-address">${availableAddress}</div>
      <div class="available-pet-wrab">${availablePet}</div>
    </div>
    <div class="petsitter-info-bottom">
      <div class="petsitter-intro">${selfIntro}</div>
    </div>
  </div>`
	);
};

spreadPetSitterProfile(petsitter);

/* 예약이 가능한 날짜를 가져오는 부분 */
const getAvailableDatesBypetSitterId = async (petSitterId) => {
	try {
		const result = await fetch(`/api/schedule/${petSitterId}`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.catch((err) => err);
		console.log(result);

		return result.data;
	} catch (err) {
		console.error(err);
	}
};

/* 스케쥴 추가하기 달력 관련 함수 */
const petSitterSchedules = await getAvailableDatesBypetSitterId(petsitter.petSitterId);
console.log('petSitterSchedules: ', petSitterSchedules);

const availableDates = petSitterSchedules.map((schedule) => schedule.availableDate.split('T')[0]);

// 수정용 이번달 달력 그려주기
drawThisMonthAvailableDatesCalendar();
// 이번달 달력에서 추가 가능한 날 표기하고, 클릭 시 인풋에 넣기 (수정)
toActivateAddThisMonthDates(availableDates);

// 수정용 다음달 달력 그려주기
drawNextMonthAvailableDatesCalendar();
// 다음달 달력에서 추가 가능한 날 표기하고, 클릭 시 인풋에 넣기 (수정)
toActivateAddNextMonthDates(availableDates);

/* 스케쥴 추가하기 */
const addReservationSchedule = async () => {
	try {
		const token = getAccessToken();
		if (!token) {
			alert('로그인 후 이용 가능합니다.');
			window.location.href = '/petsitter-sign-in';
		}

		const inputDates = $('.dates-input.add-dates').val();

		await fetch('/api/schedule', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ dates: inputDates })
		});
	} catch (err) {
		console.error(err);
	}
};

/* 추가하기 버튼 클릭 시 스케쥴 추가 함수 실행 */
$('.dates-add-btn').on('click', async (event) => {
	event.preventDefault();
	await addReservationSchedule();
	location.reload();
});

// 삭제용 이번달 달력 그려주기
drawThisMontDelteDatesCalendar();
toActivateDeleteDates(petSitterSchedules);

// 삭제용 다음달 달력 그려주기
drawNextMonthDeleteDatesCalendar();
toActivateDeleteNextMonthDates(petSitterSchedules);

/* 선택한 날짜의 id 값을 찾는 함수 */
const selectedScheduleIds = []; // 선택한 날짜의 scheduleId를 저장할 배열

$('._delete').on('click', function () {
	const scheduleId = $(this).data('schedule-id');

	// 이미 선택된 날짜인지 확인
	const isSelected = selectedScheduleIds.includes(scheduleId);

	if (isSelected) {
		// 이미 선택된 날짜를 다시 클릭하여 해제할 경우 배열에서 제거
		const index = selectedScheduleIds.indexOf(scheduleId);
		if (index !== -1) {
			selectedScheduleIds.splice(index, 1);
		}
	} else {
		// 선택되지 않은 날짜를 클릭하여 선택할 경우 배열에 추가
		selectedScheduleIds.push(scheduleId);
	}
	console.log('selectedScheduleIds: ', selectedScheduleIds);
});

/* 스케쥴 삭제하기 */
const deleteReservationSchedule = async (selectedScheduleIds) => {
	console.log('프론트에서 이거 넘겨줍니다. ', selectedScheduleIds);
	try {
		const token = getAccessToken();
		if (!token) {
			alert('로그인 후 이용 가능합니다.');
			window.location.href = '/petsitter-sign-in';
		}

		await fetch('/api/schedule', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ scheduleIds: selectedScheduleIds })
		});
	} catch (err) {
		console.error(err);
	}
};

/* 삭제하기 버튼 클릭 시 스케쥴 추가 함수 실행 */
$('.dates-btn.delete').on('click', async (event) => {
	event.preventDefault();
	await deleteReservationSchedule(selectedScheduleIds);
	location.reload();
});
