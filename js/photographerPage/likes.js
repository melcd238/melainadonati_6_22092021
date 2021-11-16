/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
function totalLikesPhotographer(data) {
  const likesArray = [];
  data.forEach((media) => {
    likesArray.push(media.likes);
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalLikes = likesArray.reduce(reducer);
    const totalLikesparagraphe = document.querySelector('.totalLikes');
    totalLikesparagraphe.innerHTML = `<span class='totalCounterLikes'> ${totalLikes} </span> <img src="../images/totalLikes.svg" alt="coeur noir">`;
  });
}

function likes() {
  const likesBtn = document.querySelectorAll('.likesBtn');
  const totalLikesCounter = document.querySelector('.totalCounterLikes');
  likesBtn.forEach((like) => like.addEventListener('click', () => {
    like.classList.toggle('selected');
    let likeAdd = parseInt(like.textContent, 10);
    let totalLikes = parseInt(totalLikesCounter.textContent, 10);
    if (like.classList.contains('selected')) {
      likeAdd++;
      like.innerHTML = ` <p class="likesBtn"> ${likeAdd} <img src="../images/likes.svg" alt="coeur rouge"></p>`;
      totalLikes++;
      totalLikesCounter.textContent = `${totalLikes}`;
    } else {
      likeAdd--;
      like.innerHTML = ` <p class="likesBtn"> ${likeAdd} <img src="../images/likes.svg" alt="coeur rouge"></p>`;
      totalLikes--;
      totalLikesCounter.textContent = `${totalLikes}`;
    }
  }));
  // ajouter ou supprimer un like avec le clavier:
  likesBtn.forEach((like) => like.addEventListener('keydown', (e) => {
    let likeAdd = parseInt(like.textContent, 10);
    let totalLikes = parseInt(totalLikesCounter.textContent, 10);
    if (e.key === 'Enter') {
      if (like.classList.contains('selected')) {
        likeAdd--;
        totalLikes--;
      } else {
        likeAdd++;

        totalLikes++;
      }
      like.classList.toggle('selected');
      like.innerHTML = `<p class="likesBtn"> ${likeAdd} <img class="imgLike" src="../images/likes.svg" alt="like la photo" aria-label="likes" role="button" tabindex="0"></p> `;
      totalLikesCounter.textContent = `${totalLikes}`;
    }
  }));
}

// eslint-disable-next-line import/prefer-default-export
export { totalLikesPhotographer, likes };
