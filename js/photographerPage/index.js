/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
/* eslint-disable default-case */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Photographer from '../class/photographer.js';
import MediaFactory from '../class/mediaFactory.js';
import { createListBox } from './listbox.js';
import { totalLikesPhotographer, likes } from './likes.js';
import { createHeaderPhotographerPage } from './headerPhotographerPage.js';
import { createForm } from './form.js';

// Fetch
fetch('../data/data.json')
  .then((response) => response.json())
  .then((data) => {
    const searchParams = new URLSearchParams(window.location.search);
    const photographId = searchParams.get('id');
    const photographersArray = data.photographers;
    const mediaArray = data.media;

    // recuperation du photographe concerné
    let photographe = photographersArray.find((photograph) => {
      const photoIdString = photograph.id.toString();
      return photoIdString === photographId;
    });

    // recuperation du media concerné
    const medias = mediaArray.filter((media) => {
      const mediaIDString = media.photographerId;
      return mediaIDString === photographe.id;
    });

    // Affichage par trie des medias :
    const sortMedia = (map, compareFn) => (a, b) => -compareFn(map(a), map(b));
    const byValue = (a, b) => a - b;
    const toLikes = (media) => media.likes;
    const mediasByLikes = [...medias].sort(sortMedia(toLikes, byValue));
    const toDate = (media) => new Date(media.date).getTime();
    const mediaByDate = [...medias].sort(sortMedia(toDate, byValue));
    const mediaByTitre = medias.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    // Affichage du photographe;
    photographe = new Photographer(photographe);
    photographe.displayOnePhotographer();

    // Affichage des médias:

    // listbox
    createListBox();

    mediasByLikes.forEach((media) => {
      const mediaList = MediaFactory.getMedia(media);
      mediaList.displayMediaList(data);
    });
    totalLikesPhotographer(medias);
    likes();
    // filtrage :
    document.addEventListener('selectedChanged', (e) => {
      console.log(e.target);
      const sectionMedia = document.querySelector('.media');
      sectionMedia.innerHTML = '';
      const optionPopularite = document.querySelector('#listbox1-1');
      const optionDate = document.querySelector('#listbox1-2');
      const optionTitre = document.querySelector('#listbox1-3');
      if (optionPopularite.classList.contains('selected')) {
        mediasByLikes.forEach((media) => {
          const mediaList = MediaFactory.getMedia(media);
          mediaList.displayMediaList(data);
        });
        likes();
      } else if (optionDate.classList.contains('selected')) {
        mediaByDate.forEach((media) => {
          const mediaList = MediaFactory.getMedia(media);
          mediaList.displayMediaList(data);
        });
        likes();
      } else if (optionTitre.classList.contains('selected')) {
        mediaByTitre.forEach((media) => {
          const mediaList = MediaFactory.getMedia(media);
          mediaList.displayMediaList(data);
        });
        likes();
      }
    });
    // lightBox
    function lightBox() {
      const sectionLightBox = document.querySelector('.lightBox');
      const lightBoxClose = document.querySelector('.lightBoxClose');
      const lightBoxNext = document.querySelector('.lightBoxNext');
      const lightBoxPrev = document.querySelector('.lightBoxPrev');
      const links = Array.from(document.querySelectorAll('.imageMedia'));

      links.forEach((link) => link.addEventListener('click', (e) => {
        e.preventDefault();
        lightBoxClose.focus();
        sectionLightBox.style.display = 'block';
        sectionLightBox.removeAttribute('aria-hidden', 'true');
        sectionLightBox.setAttribute('aria-hidden', 'false');
        const idmediaLink = link.dataset.id;
        let mediaBox = mediasByLikes.find((data) => idmediaLink === data.id.toString());
        const indexMedia = mediasByLikes.findIndex((data) => idmediaLink === data.id.toString());
        mediaBox = MediaFactory.getMedia(mediaBox);
        mediaBox.displayMediaLightBox();
        return indexMedia;
      }));

      lightBoxClose.addEventListener('click', (e) => {
        e.preventDefault();
        sectionLightBox.style.display = 'none';
        sectionLightBox.removeAttribute('aria-hidden', 'false');
        sectionLightBox.setAttribute('aria-hidden', 'true');
      });

      lightBoxNext.addEventListener('click', (e) => {
        e.preventDefault();
      });

      lightBoxPrev.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('prev');
      });
    }
    lightBox();

    // Form
    createForm();
  });

// Création du Header de la page
createHeaderPhotographerPage();
