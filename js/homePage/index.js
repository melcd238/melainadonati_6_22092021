/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
// import Header from './header.js';
import Photographer from '../class/photographer.js';

// Fetch
fetch('data/data.json')
  .then((response) => response.json())
  .then((data) => {
    const photographersArray = data.photographers;
    let tagsArray = photographersArray.map((photographer) => photographer.tags);
    tagsArray = [...new Set([].concat(...tagsArray))];
    console.log(tagsArray);

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
          li.innerHTML = `<a href="../../index.html?tag=${tagName}" class="linkPhotographer"> #${tagName}</a>`;
          li.setAttribute('class', 'filterTag');
          li.setAttribute('data-filter', `${tagName}`);
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
    // recupération du tag via l'url:
    function getTag(paramsUrl, tag) {
      paramsUrl = new URL(document.location).searchParams;
      tag = paramsUrl.get('tag');
      return tag;
    }
    // Si on ne recupère pas de tag, on affiche tous les photographes
    if (getTag() == null) {
      photographersArray.forEach((photographer) => {
        const photographersList = new Photographer(photographer);
        photographersList.displayPhotographersList();
      });
    } else {
      photographersArray.forEach((photographer) => {
        // eslint-disable-next-line eqeqeq
        const activeTag = photographer.tags.filter((tag) => tag == getTag());
        const liTags = document.querySelectorAll('.filterTag');
        liTags.forEach((tag) => {
          const value = tag.dataset.filter;
          if (getTag() == value) {
            console.log(value);
            tag.classList.add('active');
          }
        });
        if (activeTag.length > 0) {
          const photographersList = new Photographer(photographer);
          photographersList.displayPhotographersList();
        }
      });
    }
  });
