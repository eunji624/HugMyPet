import { getPetsitterIdByPath } from './petsitter-detail.js'

/** 펫시터 아이디 찾기 **/
const petSitterId = getPetsitterIdByPath();

/** 평점 및 리뷰 부분 **/
/* 서버에 평점 요청하여 가져오기 */
const getReviewsByPetSitterId = async (petSitterId) => {
  try {
    const result = await fetch(`api/pet-sitters/reviews?petSitterId=${petSitterId}`,
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

const reviews = getReviewsByPetSitterId(petSitterId);

/* 가져온 평점 및 리뷰를 HTML 로 뿌려주기 */
