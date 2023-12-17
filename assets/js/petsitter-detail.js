import {
	drawThisMonthAvailableDatesCalendar,
	drawNextMonthAvailableDatesCalendar,
	toActivateAvailableDates,
	toActivateAvailableNextMonthDates
} from '../../assets/js/calendar.js';
import { getAccessToken } from './localstorage.js';

/* 현재 위치에서 펫시터 아이디 구하기 */
export const getPetsitterIdByPath = () => {
	const path = window.location.pathname;

	const petSitterId = path.split('/')[2];
	return petSitterId;
};

const petSitterId = getPetsitterIdByPath();

/* 특정 펫시터의 정보 가져오기 */
const getDetailPetsitterById = async (petSitterId) => {
	try {
		const result = await fetch(`/api/reservation/${petSitterId}`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.catch((err) => err);

		return result.data;
	} catch (err) {
		console.error(err);
	}
};

const petsitter = await getDetailPetsitterById(petSitterId);

if (!petsitter) {
	alert('존재하지 않는 펫시터 입니다.');
	window.location.href = '/';
}

/* 펫시터 정보 HTML로 뿌리기 */
const spreadPetSitterProfile = async (petsitter) => {
	const profileDiv = $('.petsitter-profile-wrab');
	profileDiv.empty();

	const { petSitterId, name, age, selfIntro, availablePet, availableAddress, certificate, score, imagePath } =
		petsitter;

	const profilePath = imagePath // 나중에 순서 바꾸기
		? '../../assets/Img/6.png'
		: `https://nbcamp-bukkit.s3.ap-northeast-2.amazonaws.com/${images_path.split(',')[0]}`;

	const petsitterScore = score === null ? 0 : score; //나중에 추가하기
	let koreaAvailablePet = '';
	if (availablePet === 'Dog') {
		koreaAvailablePet = '강아지';
	} else if (availablePet === 'Cat') {
		koreaAvailablePet = '고양이';
	}
	profileDiv.append(
		`<div class="pet-sitter-img-wrab">
    <img src="${profilePath}" alt="PetSitter-Img" class="petsitter-img" />
  </div>
  <div class="petsitter-info-wrab">
    <div class="petsitter-info-top">
      <div class="petsitter-name">펫시터🐾 ${name}</div>
      <div class="petsitter-address">펫시터 서비스 지역🐾 ${availableAddress}</div>
      <div class="available-pet-wrab">펫시터 케어 애완동물🐾 ${koreaAvailablePet}</div>
    </div>
    <div class="petsitter-info-bottom">
      <div class="petsitter-intro">펫시터 자기소개🐾 ${selfIntro}</div>
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

/* 예약하는 함수 */
const setReservationByPetSitterIdAndDates = async (petSitterId) => {
	try {
		const token = getAccessToken();

		if (!token) {
			alert('로그인 후 이용 가능합니다.');
			window.location.href = '/user-sign-in';
		}

		const inputDates = $('.dates-input').val();

		await fetch(`/api/reservation/contract/${petSitterId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ availableDate: [inputDates] })
		});

		// alert("예약에 성공했습니다.");
	} catch (err) {
		console.error(err);
	}
};

/* 예약하기 버튼 클릭 시 예약 함수 실행 */
$('.dates-btn').on('click', async (event) => {
	event.preventDefault();
	await setReservationByPetSitterIdAndDates(petSitterId);
	location.reload();
});

/* 예약이 가능한 날짜를 가져와서 가져오는 부분 */
const petSitterSchedules = await getAvailableDatesBypetSitterId(petSitterId);
const availableDates = petSitterSchedules.map((schedule) => schedule.availableDate.split('T')[0]);

drawThisMonthAvailableDatesCalendar(availableDates);
toActivateAvailableDates(availableDates);
drawNextMonthAvailableDatesCalendar(availableDates);
toActivateAvailableNextMonthDates(availableDates);
