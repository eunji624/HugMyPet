import { drawThisMonthAvailableDatesCalendar, drawNextMonthAvailableDatesCalendar } from '../../assets/js/calendar.js'
import { getAccessToken } from './token.js';

const token = getAccessToken();

/* 특정 펫시터의 정보 가져오기 */
const getDetailPetsitterByToken = async (token) => {
	try {
		const result = await fetch(`api/my-profile/pet-sitters`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.catch(err => err)
		console.log(result);

		return result.data;

	} catch (err) {
		console.error(err);
	};
};

const petsitter = await getDetailPetsitterByToken(token);

if (!petsitter) {
	alert("존재하지 않는 펫시터 입니다.");
	window.location.href = "/";
};

/* 펫시터 정보 HTML로 뿌리기 */
const spreadPetSitterProfile = async (petsitter) => {
	const profileDiv = $(".petsitter-profile-wrab");
	profileDiv.empty();

	const {
		petSitterId,
		name,
		age,
		selfIntro,
		availablePet,
		availableAddress,
		certificate,
		score,
		imagePath
	} = petsitter;

	const profilePath = imagePath // 나중에 순서 바꾸기
		? '../../assets/Img/6.png' : `https://nbcamp-bukkit.s3.ap-northeast-2.amazonaws.com/${images_path.split(',')[0]}`

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
			.then(res => res.json())
			.catch(err => err)
		console.log(result);

		return result.data;

	} catch (err) {
		console.error(err);
	};
};


/* 예약하는 함수 */
const setReservationByPetSitterIdAndDates = async (petSitterId) => {
	try {

		const token = getAccessToken();
		console.log('token: ', token);
		if (!token) {
			return alert('로그인 후 이용 가능합니다.');
		};

		const inputDates = $('.dates-input').val();
		console.log('inputDates: ', inputDates);

		await fetch(`/api/reservation/contract/${petSitterId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ availableDate: [inputDates] })
		});

		alert("예약에 성공했습니다.");

	} catch (err) {
		console.error(err)

	}
}

/* 예약하기 버튼 클릭 시 예약 함수 실행 */
$('.dates-btn').on('click', async (event) => {
	event.preventDefault();
	await setReservationByPetSitterIdAndDates(petSitterId);
	location.reload();
});



const petSitterSchedules = await getAvailableDatesBypetSitterId(petSitterId)
const availableDates = petSitterSchedules.map(schedule => schedule.availableDate.split("T")[0]);

drawThisMonthAvailableDatesCalendar(availableDates);
drawNextMonthAvailableDatesCalendar(availableDates);