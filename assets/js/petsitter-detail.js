import { drawThisMonthAvailableDatesCalendar, drawNextMonthAvailableDatesCalendar } from '../../assets/js/calendar.js'

/* 현재 위치에서 펫시터 아이디 구하기 */
const getPetsitterIdByPath = () => {
  const path = window.location.pathname;

  const petSitterId = path.split('/')[2];
  return petSitterId
}

const petSitterId = getPetsitterIdByPath();

/* 특정 펫시터의 정보 가져오기 */
const getDetailPetsitterById = async (petSitterId) => {
  try {
    const result = await fetch(`/api/reservation/${petSitterId}`, {
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

const petsitter = await getDetailPetsitterById(petSitterId);

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

const petSitterSchedules = await getAvailableDatesBypetSitterId(petSitterId)
const availableDates = petSitterSchedules.map(schedule => schedule.availableDate.split("T")[0]);


drawThisMonthAvailableDatesCalendar(availableDates);
drawNextMonthAvailableDatesCalendar(availableDates);

