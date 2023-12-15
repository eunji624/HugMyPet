/* 달력을 그려주는 함수 */
export function drawThisMonthAvailableDatesCalendar(availableDates) {

  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
  const currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월

  // 이전 달의 마지막 날 날짜와 요일 구하기
  const startDay = new Date(currentYear, currentMonth, 1);
  startDay.setDate(startDay.getDate() - 1);
  const prevDate = startDay.getDate();
  const prevDay = startDay.getDay();

  // 이번 달의 마지막날 날짜와 요일 구하기
  const endDay = new Date(currentYear, currentMonth + 1, 0);
  const nextDate = endDay.getDate();
  const nextDay = endDay.getDay();

  // console.log(prevDate, prevDay, nextDate, nextDay);

  // 현재 월 표기
  $('.year-month').text(currentYear + '.' + (currentMonth + 1));

  // 렌더링 html 요소 생성
  const calendar = $('.dates')
  calendar.html('');

  // 지난달
  for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
    calendar.append('<div class="day prev disable">' + i + '</div>');
  }
  // 이번달
  for (let i = 1; i <= nextDate; i++) {
    let newDate = i < 10 ? `0${i}` : i;
    calendar.append(`<div class="day current" id=${currentYear}-${currentMonth + 1}-${newDate}>` + i + '</div>');
  }
  // 다음달
  for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
    calendar.append('<div class="day next disable">' + i + '</div>');
  }


  /* 예약 가능 날짜 활성화 하기 */
  availableDates.forEach(date => {
    $(`#${date}`).addClass('_active');
  })

  $('.day.current._active').on('click', function () {
    $(this).toggleClass('_on');
    getSummitDates()
  })
};






/* 다음 달 달력을 그려주는 함수 */
export function drawNextMonthAvailableDatesCalendar(availableDates) {
  const today = new Date();
  console.log('today: ', today);

  const nextMonthYear = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
  const nextMonth = ((today.getMonth() + 1) % 12) + 1;
  const newNextMonth = nextMonth < 10 ? `0${nextMonth}` : nextMonth;


  // 이전 달의 마지막 날 날짜와 요일 구하기
  const startDay = new Date(nextMonthYear, newNextMonth, 1);
  startDay.setDate(startDay.getDate() - 1);
  const prevDate = startDay.getDate();
  const prevDay = startDay.getDay();

  // 이번 달의 마지막날 날짜와 요일 구하기
  const endDay = new Date(nextMonthYear, newNextMonth, 0);
  const nextDate = endDay.getDate();
  const nextDay = endDay.getDay();

  // console.log(prevDate, prevDay, nextDate, nextDay);

  // 현재 월 표기
  $('.next-year-month').text(nextMonthYear + '.' + (newNextMonth));

  // 렌더링 html 요소 생성
  const calendar = $('.next-dates')
  calendar.html('');

  // 지난달
  for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
    calendar.append('<div class="nextmonth day prev disable">' + i + '</div>');
  }
  // 이번달
  for (let i = 1; i <= nextDate; i++) {
    let newDate = i < 10 ? `0${i}` : i;
    calendar.append(`<div class="nextmonth day current" id=${nextMonthYear}-${newNextMonth}-${newDate}>` + i + '</div>');
  }
  // 다음달
  for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
    calendar.append('<div class="nextmonth day next disable">' + i + '</div>');
  }

  /* 예약 가능 날짜 활성화 하기 */
  availableDates.forEach(date => {
    $(`#${date}`).addClass('_active');
  })

  $('.nextmonth.day.current._active').on('click', function () {
    $(this).toggleClass('_on');
    getSummitDates()
  })
};


/* 활성화 된 날짜 클릭 시 Input에 날짜들 올리기 */
export const getSummitDates = async () => {
  // 기존 입력란의 값을 가져오기
  let currentInputValue = $('.dates-input').val();

  // _on 클래스를 가진 요소의 ID 값 가져오기
  let chosenDateElement = $('._on');

  // 선택된 날짜가 있는지 확인
  if (chosenDateElement.length > 0) {
    let chosenDate = chosenDateElement.attr('id');

    // 이미 선택된 날짜인지 확인
    let isAlreadySelected = currentInputValue && currentInputValue.includes(chosenDate);

    // 이미 선택된 날짜라면 제거, 아니라면 추가
    let newInputValue = isAlreadySelected
      ? currentInputValue.replace(chosenDate, '').replace(/\s*,\s*$/, '').replace(/^\s*,\s*/, '')
      : currentInputValue
        ? `${currentInputValue}, ${chosenDate}`
        : chosenDate;

    // 입력란에 누적된 값을 설정
    $('.dates-input').val(newInputValue);

    // _on 클래스를 토글하여 선택 상태 해제
    chosenDateElement.toggleClass('_on');

    // 선택된 날짜에 대한 배경색 변경
    chosenDateElement.css('background-color', isAlreadySelected ? '' : '#93e1ff');
  };
};
