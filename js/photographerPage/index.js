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
import { totalLikesPhotographer } from './likes.js';
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
    totalLikesPhotographer(medias);

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
    // modal du formulaire
    const btnContact = document.querySelector('#btnContactModal');
    const modalForm = document.querySelector('.modalForm');
    const bground = document.querySelector('.bground');
    const bgValidation = document.querySelector('.bgroundValidation');
    const crossClose = document.querySelector('.crossClose');
    btnContact.addEventListener('click', () => {
      modalForm.style.display = 'block';
      bground.style.display = 'block';
    });
    crossClose.addEventListener('click', () => {
      modalForm.style.display = 'none';
      bground.style.display = 'none';
    });
    // validation du formulaire :
    // eslint-disable-next-line no-unused-vars
    let formIsValid = false;
    // Dom éléments pour la validation du formulaire
    const inputFirst = document.querySelector('#firstName');
    const inputLast = document.querySelector('#lastName');
    const inputEmail = document.querySelector('#email');
    const inputMessage = document.querySelector('#message');
    const formDatas = document.querySelectorAll('.formData');
    const validationForm = document.querySelector('#validation');
    const modalValidation = document.querySelector('.modalValidation');

    function checkValidityInput() {
      const hasError = [];
      const regexFirstLast = /^([a-zA-Z-\s]){2,30}$/;
      const regexMessage = /^([a-zA-Z-\s]){10,100}$/;
      const regexMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      // inputFirst validity:
      if (!inputFirst.value || regexFirstLast.test(inputFirst.value) === false) {
        formDatas[0].dataset.errorVisible = 'true';
        hasError.push(true);
      } else {
        formDatas[0].dataset.errorVisible = 'false';
      }

      // inputLast validity:
      if (!inputLast.value || regexFirstLast.test(inputLast.value) === false) {
        formDatas[1].dataset.errorVisible = 'true';
        hasError.push(true);
      } else {
        formDatas[1].dataset.errorVisible = 'false';
      }

      // Validation inputEmail:
      if (!inputEmail.value || regexMail.test(inputEmail.value) === false) {
        formDatas[2].dataset.errorVisible = 'true';
        hasError.push(true);
      } else {
        formDatas[2].dataset.errorVisible = 'false';
      }

      // Validation inputMessage:
      if (!inputMessage.value || regexMessage.test(inputMessage.value) === false) {
        formDatas[3].dataset.errorVisible = 'true';
        hasError.push(true);
      } else {
        formDatas[3].dataset.errorVisible = 'false';
      }

      if (hasError.length > 0) {
        return formIsValid = false;
      }
      return formIsValid = true;
    }
    validationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkValidityInput();
      if (formIsValid) {
        modalForm.style.display = 'none';
        bground.style.display = 'none';
        modalValidation.style.display = 'block';
        bgValidation.style.display = 'block';
        const formInput = {
          firstName: inputFirst.value,
          lastName: inputLast.value,
          email: inputEmail.value,
          message: inputMessage.value,
        };
        console.log(formInput);
      }
    });
    // fermeture de la modal de confirmation:
    const btnCloseConfirm = document.querySelector('.crossCloseValidation');
    btnCloseConfirm.addEventListener('click', () => {
      modalValidation.style.display = 'none';
      bgValidation.style.display = 'none';
    });
  });

// Création du Header de la page
createHeaderPhotographerPage();
