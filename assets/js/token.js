/* 로컬 스토리지에서 액세스 토큰 가져오기 */

export const getAccessToken = () => {
  const accessToken = window.localStorage.getItem('accessToken');

  if (!accessToken) {
    return null;
  };

  return accessToken;
}