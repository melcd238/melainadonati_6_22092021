/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import Header from './header.js';
import Photographer from '../class/photographer.js';

// Fetch
fetch('data/data.json')
  .then((response) => response.json())
  .then((data) => {
    const photographersArray = data.photographers;
    let tagsArray = photographersArray.map((photographer) => photographer.tags);
    tagsArray = [...new Set([].concat(...tagsArray))];
    console.log(tagsArray);

    // Creation du header avec les tags recupérés dynamiquement.
    const header = document.querySelector('.indexHeader');
    const tagsName = tagsArray;
    const headerContent = new Header(header, tagsName);
    headerContent.createHeader();

    // Affichage des Photographes:
    // recupération du tag via l'url:
    function getTag(paramsUrl, tag) {
      paramsUrl = new URL(document.location).searchParams;
      tag = paramsUrl.get('tag');
      return tag;
    }
    // Si on ne recupère pas de tag, on affiche tous les photographes
    const selectedTag = getTag();
    if (selectedTag == null) {
      photographersArray.forEach((photographer) => {
        const photographersList = new Photographer(photographer);
        photographersList.displayPhotographersList();
      });
    } else {
      photographersArray.forEach((photographer) => {
        // eslint-disable-next-line eqeqeq
        const activeTag = photographer.tags.filter((tag) => tag == selectedTag);
        if (activeTag.length > 0) {
          const photographersList = new Photographer(photographer);
          photographersList.displayPhotographersList();
        }
      });
      const liTags = document.querySelectorAll('.filterTag');
      liTags.forEach((tag) => {
        const value = tag.dataset.filter;
        // eslint-disable-next-line eqeqeq
        if (selectedTag == value) {
          tag.classList.add('active');
        }
      });
    }
  });
