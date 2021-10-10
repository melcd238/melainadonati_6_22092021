/* eslint-disable no-console */
/* eslint-disable import/extensions */
// import Header from './header.js';
import Photographer from '../class/photographer.js';

// Fetch
fetch('data/data.json')
  .then((response) => response.json())
  .then((data) => {
    const photographersArray = data.photographers;
    const mediaArray = data.media;
    let tagsArray = photographersArray.map((photographer) => photographer.tags);
    tagsArray = [...new Set([].concat(...tagsArray))];
    console.log(tagsArray);
    console.log(mediaArray);

    // creation du header avec tags récupérés de manière dynamqiue:
    class Header {
      constructor(selector) {
        this.selector = selector;
      }

      createHeader() {
        // div pour englober les 3 éléments du header:
        const divHeader = document.createElement('div');
        divHeader.classList.add('divHeader');

        // logo
        const logo = document.createElement('a');
        logo.setAttribute('href', 'index.html');
        logo.setAttribute('aria-label', 'retour à la page accueil');
        logo.classList.add('logoLink');
        const logoImg = document.createElement('img');
        logoImg.setAttribute('src', 'images/logo.svg');
        logoImg.setAttribute('alt', 'Fisheye Home page');

        // navBar
        const navBar = document.createElement('nav');
        navBar.classList.add('navBar');
        const ulNavBar = document.createElement('ul');
        navBar.appendChild(ulNavBar);
        const tagsName = tagsArray;
        tagsName.forEach((tagName) => {
          const li = document.createElement('li');
          li.setAttribute('class', 'filter');
          li.setAttribute('data-filter', `${tagName}`);
          const text = document.createTextNode(`#${tagName}`);
          li.appendChild(text);
          ulNavBar.appendChild(li);
        });

        // button
        const btnGoToMain = document.createElement('button');
        btnGoToMain.classList.add('btnGoToMain');
        const linkGoToMain = document.createElement('a');
        linkGoToMain.setAttribute('href', '#indexMain');
        linkGoToMain.appendChild(document.createTextNode('Passer au contenu'));

        // apparition du bouton "passer au contenu" au scroll
        window.addEventListener('scroll', () => {
          if (window.scrollY > 20) {
            btnGoToMain.style.visibility = 'visible';
          } else {
            btnGoToMain.style.visibility = 'hidden';
          }
        });

        logo.appendChild(logoImg);
        btnGoToMain.appendChild(linkGoToMain);
        divHeader.append(logo, btnGoToMain, navBar);
        this.selector.appendChild(divHeader);
      }
    }

    const header = document.querySelector('.indexHeader');
    const headerContent = new Header(header);
    headerContent.createHeader();

    // Affichage des Photographes:

    photographersArray.forEach((photographer) => {
      const photographersList = new Photographer(photographer);
      console.log(photographersList);
      photographersList.displayPhotographersList();
    });
    // filtrer au click sur un # de la nav:
    const liTags = document.querySelectorAll('.filter');
    const cards = document.querySelectorAll('.cardPhotographer');
    liTags.forEach((tag) => tag.addEventListener('click', () => {
      // on recup la valeur du filtre
      const value = tag.dataset.filter;
      console.log(value);
      tag.classList.toggle('active');
      cards.forEach((card) => {
        if (!card.classList.contains(value)) {
          // eslint-disable-next-line no-param-reassign
          card.style.display = 'none';
        }
        if (!tag.classList.contains('active')) {
          // eslint-disable-next-line no-param-reassign
          card.style.display = 'block';
        }
      });
    }));
  });
