/* eslint-disable no-console */

// Fetch
fetch('../data/data.json')
  .then((response) => response.json())
  .then((data) => {
    const searchParams = new URLSearchParams(window.location.search);
    const photographId = searchParams.get('id');
    const photographersArray = data.photographers;
    const mediaArray = data.media;
    console.log(mediaArray);
    // recuperation du photographe concerné
    const photographe = photographersArray.find((photograph) => {
      const photoIdString = photograph.id.toString();
      return photoIdString === photographId;
    });
    console.log(photographe);
    // recuperation du media concerné
  });
const HeaderPhotographer = document.querySelector('.headerPhotographer');
const logo = document.createElement('a');
logo.setAttribute('href', '../index.html');
logo.setAttribute('aria-label', 'retour à la page accueil');
logo.classList.add('logoLinkPhotographer');
const logoImg = document.createElement('img');
logoImg.setAttribute('src', '../images/logo.svg');
logoImg.setAttribute('alt', 'Fisheye Home page');
logo.appendChild(logoImg);
HeaderPhotographer.appendChild(logo);
