/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Photographer from '../class/photographer.js';

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
    let photographe = photographersArray.find((photograph) => {
      const photoIdString = photograph.id.toString();
      return photoIdString === photographId;
    });
    console.log(photographe);
    // recuperation du media concerné

    // Affichage du photographe;
    photographe = new Photographer(photographe);
    photographe.displayOnePhotographer();
  });
// Création du Header de la page
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

// listBox
const btnListBox = document.querySelector('#btnListbox');
const list = document.querySelector('.listBox');
btnListBox.addEventListener('click', () => {
  btnListBox.classList.toggle('hidden');
  list.classList.toggle('show');
});
list.addEventListener('click', () => {
  btnListBox.classList.toggle('hidden');
  list.classList.toggle('show');
});
