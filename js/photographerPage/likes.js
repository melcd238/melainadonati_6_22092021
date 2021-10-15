function totalLikesPhotographer(data) {
  const likesArray = [];
  data.forEach((media) => {
    likesArray.push(media.likes);
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalLikes = likesArray.reduce(reducer);
    const totalLikesparagraphe = document.querySelector('.totalLikes');
    totalLikesparagraphe.innerHTML = `<span> ${totalLikes} </span> <img src="../images/totalLikes.svg" alt="">`;
  });
}
// eslint-disable-next-line import/prefer-default-export
export { totalLikesPhotographer };
