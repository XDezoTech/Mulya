export async function getProfileImage(jwt) {
  if (!jwt) {
    return null;
  }
  const response = await fetch('/api/bidder/profileImage', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  // console.log(response);

  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }

  const blob = await response.blob();
  // console.log(URL.createObjectURL(blob));
  return URL.createObjectURL(blob); // return URL to directly display
}
