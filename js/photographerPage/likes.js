/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
function totalLikesPhotographer(data) {
  const likesArray = [];
  data.forEach((media) => {
    likesArray.push(media.likes);
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalLikes = likesArray.reduce(reducer);
    const totalLikesparagraphe = document.querySelector('.totalLikes');
    totalLikesparagraphe.innerHTML = `<span class='totalCounterLikes'> ${totalLikes} </span> <img src="../images/totalLikes.svg" alt="">`;
  });
}

function likes() {
  const likesBtn = document.querySelectorAll('.likesBtn');
  likesBtn.forEach((like) => like.addEventListener('click', () => {
    like.classList.toggle('selected');
    const totalLikesCounter = document.querySelector('.totalCounterLikes');
    let likeAdd = parseInt(like.textContent, 10);
    let totalLikes = parseInt(totalLikesCounter.textContent, 10);
    if (like.classList.contains('selected')) {
      likeAdd++;
      like.innerHTML = ` <p class="likesBtn"> ${likeAdd} <img src="../images/likes.svg" alt=""></p>`;
      totalLikes++;
      totalLikesCounter.textContent = `${totalLikes}`;
    } else {
      likeAdd--;
      like.innerHTML = ` <p class="likesBtn"> ${likeAdd} <img src="../images/likes.svg" alt=""></p>`;
      totalLikes--;
      totalLikesCounter.textContent = `${totalLikes}`;
    }
  }));
}

// eslint-disable-next-line import/prefer-default-export
export { totalLikesPhotographer, likes };
