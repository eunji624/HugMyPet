import { getPetsitterIdByPath } from './petsitter-detail.js';
import { getAccessToken, getLogInUserRole } from './localstorage.js';
import { formatDateTime } from './calendar.js';

/** 펫시터 아이디 찾기 **/
const petSitterId = getPetsitterIdByPath();

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
			.then((res) => res.json())
			.catch((err) => err);

		return result.message.user.memberId;
	} catch (err) {
		console.error(err);
	}
};

const currentMemberId = await getLogInUserId();
const currentMemberRole = await getLogInUserRole();

/** 평점 및 리뷰 부분 **/
/* 서버에 평점 및 리뷰 요청하여 가져오기 */
const getReviewsByPetSitterId = async (petSitterId) => {
	try {
		const result = await fetch(`/api/pet-sitters/reviews?petSitterId=${petSitterId}`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.catch((err) => err);

		return result.data;
	} catch (err) {
		console.error(err);
	}
};

const reviews = await getReviewsByPetSitterId(petSitterId);

/* 가져온 평점 및 리뷰를 HTML 로 뿌려주기 */
const speadReviews = async (reviews, currentMemberId, role) => {
	const reviewDiv = $('.detail-comments-lists');
	reviewDiv.empty();

	reviews.forEach((review) => {
		const { reviewId, petSitterId, memberId, content, score, createdAt, updatedAt, name } = review;

		const formattedCreatedAt = formatDateTime(createdAt);
		const formattedUpdatedAt = formatDateTime(updatedAt);

		const commentElement = $(`
    <li class="comment" data-comment-id="${reviewId}" data-updated-at="${formattedUpdatedAt}">
    <div class="id-score">
    <h4 class="comment-user data-user-id=${memberId}">${name}</h4>
    <div class="comment-score">${score}</div>
  </div>
      <div class="comment-box">
        <div class="comment-contents-box">
          <div class="comment-text">${content}</div>
          ${
						formattedCreatedAt === formattedUpdatedAt
							? `<div class="comment-create-at">${formattedCreatedAt}</div>`
							: `<div class="comment-create-at">${formattedUpdatedAt} 수정됨</div>`
					}
        </div>
        ${
					role === 'user' && memberId === currentMemberId
						? `<div class="comment-btns-box">
         <button class="edit-comment-btn">수정</button>
         <button class="delete-comment-btn">삭제</button>`
						: ''
				}
        </div>
      </div>        
    </li>
  `);

		// 수정 버튼 클릭 시 수정 입력란을 보여주는 이벤트 추가
		commentElement.find('.edit-comment-btn').on('click', function () {
			editComment(commentElement, reviewId, currentMemberRole);
		});

		// 삭제 버튼 클릭 시 댓글 삭제하는 이벤트 추가
		commentElement.find('.delete-comment-btn').on('click', function () {
			deleteComment(reviewId, commentElement, currentMemberRole);
		});

		reviewDiv.append(commentElement);
	});
};

speadReviews(reviews, currentMemberId, currentMemberRole);

/* 리뷰 및 평점 등록하기 */
const createReview = async (petSitterId, role) => {
	try {
		const token = getAccessToken();

		if (!token) {
			alert('로그인 후 이용 가능합니다.');
			return (window.location.href = '/user-sign-in');
		}

		if (role !== 'user') {
			console.log('role: ', role);
			return alert('리뷰는 유저만 남길 수 있습니다.');
		}

		const inputComment = $('.comment-input').val();
		const inputScore = $('#score-select').val();

		const review = await fetch(`/api/pet-sitters/reviews?petSitterId=${petSitterId}`, {
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
		const reviewResult = await review.json();
		console.log('reviewResult', reviewResult);
		if (!reviewResult.success) {
			return alert(reviewResult.message);
		}

		$('.comment-input').val(''); // 댓글 입력 폼 초기화
		$('#score-select').val('5'); // 평점 선택 초기화

		const reviews = await getReviewsByPetSitterId(petSitterId);
		await speadReviews(reviews, currentMemberId, currentMemberRole);
	} catch (err) {
		console.error(err);
	}
};

/* 버튼 클릭 시 리뷰 생성하기 */
$('.comment-btn').on('click', async (event) => {
	event.preventDefault();
	createReview(petSitterId, currentMemberRole);
});

/* 리뷰 수정하기 */
export const editComment = async (commentElement, reviewId, currentMemberRole) => {
	if (currentMemberRole !== 'user') {
		alert('리뷰 수정은 작성한 유저 본인만 가능합니다.');
		return;
	}

	const commentText = commentElement.find('.comment-text').text();

	// 기존의 수정, 삭제 버튼 숨기기
	commentElement.find('.edit-comment-btn, .delete-comment-btn').hide();

	const editInput = $('<input type="text" class="edit-comment-input" value="' + commentText + '">');
	const confirmBtn = $('<button class="confirm-edit-btn">확인</button>');
	const cancelBtn = $('<button class="cancel-edit-btn">취소</button>');

	commentElement.find('.comment-text').replaceWith(editInput);

	const editBtnsDiv = $('<div class="edit-btns"></div>');
	editBtnsDiv.append(confirmBtn);
	editBtnsDiv.append(cancelBtn);

	commentElement.find('.comment-box').append(editBtnsDiv);

	editInput.on('keydown', async function (event) {
		if (event.key === 'Enter') {
			// event.preventDefault();
			confirmBtn.trigger('click');
		}
	});

	confirmBtn.on('click', async function () {
		const editedText = editInput.val();

		const result = await fetch(`/api/pet-sitters/reviews/${reviewId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getAccessToken()}`
			},
			body: JSON.stringify({ content: editedText })
		});

		const { data } = await result.json();

		const updatedAt = data.updatedAt;

		// 수정 입력란 및 확인 버튼을 다시 댓글 내용으로 교체
		commentElement.find('.edit-comment-input').replaceWith(`<div class="comment-text">${editedText}</div>`);
		commentElement
			.find('.comment-create-at')
			.replaceWith(`<div class="comment-updated-at">${formatDateTime(updatedAt)} 수정됨</div>`);
		editBtnsDiv.remove();

		// 수정, 삭제 버튼 다시 보이게 하기
		commentElement.find('.edit-comment-btn, .delete-comment-btn').show();
	});

	// 수정 취소 시에 입력된 내용이 아니라 원래의 댓글 내용으로 복원
	cancelBtn.on('click', function () {
		commentElement.find('.edit-comment-input').replaceWith(`<div class="comment-text">${commentText}</div>`);
		editBtnsDiv.remove();

		commentElement.find('.edit-comment-btn, .delete-comment-btn').show();
	});
};

// 댓글 삭제하는 함수
export const deleteComment = async function (reviewId, commentElement, currentMemberRole) {
	if (currentMemberRole !== 'user') {
		alert('댓글 삭제는 작성한 유저 본인만 가능합니다.');
		return;
	}

	try {
		await fetch(`/api/pet-sitters/reviews/${reviewId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		});
		commentElement.remove(); // 댓글 삭제 후 화면에서도 제거
	} catch (error) {
		console.error(error);
	}
};
