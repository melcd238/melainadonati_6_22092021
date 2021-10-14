/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
/* eslint-disable default-case */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Photographer from '../class/photographer.js';
import MediaFactory from '../class/mediaFactory.js';
import { createListBox } from './listbox.js';
import { createHeaderPhotographerPage } from './headerPhotographerPage.js';

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

    // affichage du total des likes des media
    const likesArray = [];
    medias.forEach((media) => {
      likesArray.push(media.likes);
      const reducer = (accumulator, curr) => accumulator + curr;
      const totalLikes = likesArray.reduce(reducer);
      const totalLikesparagraphe = document.querySelector('.totalLikes');
      totalLikesparagraphe.innerHTML = `<span> ${totalLikes} </span> <img src="../images/totalLikes.svg" alt="">`;
    });

    // Affichage par popularité des media :
    const sortByLikes = (map, compareFn) => (a, b) => -compareFn(map(a), map(b));
    const byLikesValue = (a, b) => a - b;
    const toLikes = (media) => media.likes;
    const byLikes = sortByLikes(toLikes, byLikesValue);
    const mediasByLikes = [...medias].sort(byLikes);
    console.log(mediasByLikes);
    // Affichage par date :
    const sortByDate = (map, compareFn) => (a, b) => -compareFn(map(a), map(b));
    const byDateValue = (a, b) => a - b;
    const toDate = (media) => new Date(media.date).getTime();
    const byDate = sortByDate(toDate, byDateValue);
    const mediaByDate = [...medias].sort(byDate);
    console.log(mediaByDate);
    // Affichage par titre :
    const mediaByTitre = medias.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    console.log(mediaByTitre);

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
      } else if (optionDate.classList.contains('selected')) {
        mediaByDate.forEach((media) => {
          const mediaList = MediaFactory.getMedia(media);
          mediaList.displayMediaList(data);
        });
      } else if (optionTitre.classList.contains('selected')) {
        mediaByTitre.forEach((media) => {
          const mediaList = MediaFactory.getMedia(media);
          mediaList.displayMediaList(data);
        });
      }
    });
  });

// Création du Header de la page
createHeaderPhotographerPage();
