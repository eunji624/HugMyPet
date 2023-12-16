import { getPetsitterIdByPath } from './petsitter-detail.js'

/** 펫시터 아이디 찾기 **/
const petSitterId = getPetsitterIdByPath();

/** 평점 및 리뷰 부분 **/
/* 서버에 평점 요청하여 가져오기 */
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
console.log('reviews: ', reviews);

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

    reviewDiv.append(
      `<li class="comment" id=${reviewId}>
      <div class="id-score">
        <h4 class="comment-user">${name}</h4>
        <div class="comment-score">${score}</div>
      </div>
      <div class="comment-text">${content}</div>
      <div class="comment-date">${createdAt}</div>
    </li>`
    )
  }
  )
}

speadReviews(reviews);
