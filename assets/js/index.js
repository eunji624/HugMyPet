/* 펫시터 정보들 가져오는 함수 */
const getTotalPetSitters = async () => {
	try {
		const result = await fetch('/api/pet-sitters', {
			method: 'GET'
		})
			.then((res) => res.json())
			.catch((err) => err);

		return result.data;
	} catch (err) {
		console.error(err);
	}
};

/* pet-sitter 정의하기 */
const petSitters = await getTotalPetSitters();

/* 가져온 펫시터 정보를 카드 형태로 뿌려주는 함수 */
const spreadPetSittersCard = async (petSitters) => {
	const cardListDiv = $('#petsitter-cards-list');
	cardListDiv.empty(); // 카드를 뿌리기 전 초기화
	petSitters.forEach((petSitter) => {
		const { petSitterId, name, availablePet, availableAddress, score, imagePath } = petSitter;

		const thumbnailPath = imagePath // 나중에 순서 바꾸기
			? '../../assets/Img/6.png'
			: `https://nbcamp-bukkit.s3.ap-northeast-2.amazonaws.com/${images_path.split(',')[0]}`;

		const petsitterScore = score === null ? 0 : score;

		cardListDiv.append(
			`<li class="community-card">
        <div class="card-thumbnail">
          <a href="/pet-sitter/${petSitterId}">
            <img
              src="${thumbnailPath}"
            />
          </a>
        </div>
        <div class="card-description">
          <div class="card-title">
            <a href="/pet-sitter/${petSitterId}"> ${name} </a>
          </div>
          <div class="card-overview">펫시터 소개 부분 추가해주세요 은지님 !!!! </div>
          <div class="card-footer">
            <div class="card-score">${petsitterScore}</div>
            <div class="card-info"></div>
          </div>
        </div>
      </li>`
		);
	});
};

spreadPetSittersCard(petSitters);
