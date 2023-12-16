import { getPetsitterIdByPath } from './petsitter-detail.js'
import { getAccessToken } from './token.js';

/** 펫시터 아이디 찾기 **/
const petSitterId = getPetsitterIdByPath();

/* 날짜 포맷팅 하는 함수 */
function formatDateTime(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/* 로그인 한 사람 정보 가져오는 함수 */
const getLogInUserId = async () => {
  try {
    const token = getAccessToken();

    const result = await fetch('/api/my-profile/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .catch(err => err);

    return result.message.user.memberId;
  } catch (err) {
    console.error(err)
  }
}

const currentMemberId = await getLogInUserId();



/** 평점 및 리뷰 부분 **/
/* 서버에 평점 및 리뷰 요청하여 가져오기 */
const getReviewsByPetSitterId = async (petSitterId) => {
  try {
    const result = await fetch(`/api/pet-sitters/reviews?petSitterId=${petSitterId}`,
      {
        method: 'GET'
      })
      .then(res => res.json())
      .catch(err => err)

    return result.data
  } catch (err) {
    console.error(err);
  };
};

const reviews = await getReviewsByPetSitterId(petSitterId);

/* 가져온 평점 및 리뷰를 HTML 로 뿌려주기 */
const speadReviews = async (reviews) => {
  const reviewDiv = $('.detail-comments-lists');
  reviewDiv.empty();

  reviews.forEach(review => {
    const {
      reviewId,
      petSitterId,
      memberId,
      content,
      score,
      createdAt,
      updatedAt,
      name
    } = review;

    const formattedCreatedAt = formatDateTime(createdAt);
    const formattedUpdatedAt = formatDateTime(updatedAt);

    reviewDiv.append(
      `<li class="comment" data-review-id=${reviewId}>
      <div class="id-score">
        <h4 class="comment-user data-user-id=${memberId}">${name}</h4>
        <div class="comment-score">${score}</div>
      </div>
      <div class ="comment-contents-box">
      <div class="comment-text">${content}</div>
      ${formattedCreatedAt === formattedUpdatedAt
        ? `<div class="comment-create-at">${formattedCreatedAt}</div>`
        : `<div class="comment-create-at">${formattedUpdatedAt} 수정됨</div>`
      }
      </div>
    </li>`
    )
  }
  )
}

speadReviews(reviews);




/* 리뷰 및 평점 등록하기 */
const createReview = async (petSitterId) => {
  try {
    const token = getAccessToken();

    if (!token) {
      alert('로그인 후 이용 가능합니다.');
      window.location.href = "/user-sign-in";
    };

    const inputComment = $('.comment-input').val();
    const inputScore = $('#score-select').val();

    await fetch(`/api/pet-sitters/reviews?petSitterId=${petSitterId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        content: inputComment,
        score: inputScore
      })
    });

    const reviews = await getReviewsByPetSitterId(petSitterId);
    await speadReviews(reviews);

  } catch (err) {
    console.error(err)
  }
}

/* 버튼 클릭 시 리뷰 생성하기 */
$('.comment-btn').on('click', async (event) => {
  event.preventDefault()
  createReview(petSitterId)
});
