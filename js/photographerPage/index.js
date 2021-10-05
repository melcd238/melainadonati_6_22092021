/* eslint-disable camelcase */
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

    // Affichage des médias:
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

// Affichage listBox
const dropdown = document.querySelector('.dropdown');
const dropdown_btn = document.querySelector('.dropdown-btn');
const dropdown_content = document.querySelector('.dropdown-content');
const dropdown_item = document.querySelectorAll('.dropdown-item');
const arrow = document.querySelector('.fas');

document.addEventListener('click', (e) => {
  if (e.target === dropdown_btn) {
    return;
  // eslint-disable-next-line no-else-return
  } else if (dropdown_content.classList.contains('active')) {
    dropdown_content.classList.remove('active');
    dropdown_btn.classList.remove('active');
    dropdown_btn.classList.remove('active');
    arrow.classList.remove('fa-chevron-up');
  }
});

dropdown.addEventListener('click', function () {
  this.classList.toggle('active');
  dropdown_content.classList.toggle('active');
  dropdown_btn.classList.toggle('active');
  arrow.classList.toggle('fa-chevron-up');
});

for (let i = 0; i < dropdown_item.length; i++) {
  dropdown_item[i].addEventListener('click', function () {
    dropdown_btn.getElementsByTagName('p')[0].textContent = this.textContent;
    console.log(this.dataset.value);
  });
}
