/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
/* eslint-disable default-case */
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
    const likesArray = [];

    // recuperation du photographe concerné
    let photographe = photographersArray.find((photograph) => {
      const photoIdString = photograph.id.toString();
      return photoIdString === photographId;
    });
    console.log(photographe);
    // recuperation du media concerné
    const medias = mediaArray.filter((media) => {
      const mediaIDString = media.photographerId;
      return mediaIDString === photographe.id;
    });
    console.log(medias);
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
    const MEDIA_TYPE = {
      IMAGE: 'image',
      VIDEO: 'video',
    };
    class Media {
      constructor(data) {
        this.title = data.title;
        this.date = data.date;
        this.id = data.id;
        this.likes = data.likes;
        this.price = data.price;
        this.tags = data.tags;
        this.photographerId = data.photographerId;
      }
    }
    class Image extends Media {
      constructor(data) {
        super(data);
        this.image = data.image;
      }

      displayMediaImageList() {
        const sectionMedia = document.querySelector('.media');
        const mediaImageCard = document.createElement('div');
        mediaImageCard.setAttribute('class', 'mediaView');
        mediaImageCard.classList.add(`${this.tags}`);
        mediaImageCard.setAttribute('id', `${this.id}`);
        mediaImageCard.innerHTML = ` <div id="openLightbox" class="imageMedia">
        <img src="../images/${this.photographerId}/${this.image}" alt="">
    </div>
    <div class="titleLikes">
        <h3> ${this.title} </h3>
        <p class="likes"> ${this.likes} <img src="../images/likes.svg" alt=""></p>
    </div> `;
        sectionMedia.appendChild(mediaImageCard);
      }
    }
    class Video extends Media {
      constructor(data) {
        super(data);
        this.video = data.video;
      }

      displayMediaVideoList() {
        const sectionMedia = document.querySelector('.media');
        const mediaVideoCard = document.createElement('div');
        mediaVideoCard.setAttribute('class', 'mediaView');
        mediaVideoCard.classList.add(`${this.tags}`);
        mediaVideoCard.setAttribute('id', `${this.id}`);
        mediaVideoCard.innerHTML = `<div id="openLightbox" class="imageMedia">
          <video controls>
          <source src="../images/${this.photographerId}/${this.video}" type="video/mp4" alt="">
      </video> </div>
      <div class="titleLikes">
          <h3> ${this.title} </h3>
          <p class="likes"> ${this.likes} <img src="../images/likes.svg" alt=""></p>
      </div> `;
        sectionMedia.appendChild(mediaVideoCard);
      }
    }
    class MediaFactory {
      // eslint-disable-next-line no-shadow
      static getMedia(type, data) {
        switch (type) {
          case MEDIA_TYPE.IMAGE:
            return new Image(data);
          case MEDIA_TYPE.VIDEO:
            return new Video(data);
          default:
            throw new Error('Wrong media chosen');
        }
      }
    }
    // filtrage :
    const btnPopularite = document.querySelector('.btnPopularite');
    const dropDownContent = document.querySelector('.dropDownContent');
    const liPopularite = document.querySelector('.popularite');
    const liDate = document.querySelector('.date');
    const liTitre = document.querySelector('.titre');
    // AU click sur le btn Pupularité, on fait disparaître de btn et apparaître la listBox.
    btnPopularite.addEventListener('click', () => {
      btnPopularite.style.display = 'none';
      dropDownContent.style.display = 'block';
    });
    liPopularite.addEventListener('click', () => {
      btnPopularite.style.display = 'block';
      dropDownContent.style.display = 'none';
    });
    // L'affichage de la page se fait selon la popularité par défaut:
    mediasByLikes.forEach((media) => {
      if (media.image) {
        const mediaImageList = MediaFactory.getMedia(MEDIA_TYPE.IMAGE, media);
        mediaImageList.displayMediaImageList(data);
      } else if (media.video) {
        const mediaVideoList = MediaFactory.getMedia(MEDIA_TYPE.VIDEO, media);
        mediaVideoList.displayMediaVideoList(data);
      }
      // on recuppère les likes de tous les média dans un tableau
      likesArray.push(media.likes);
    });
    // eslint-disable-next-line max-len
    // On additionne les valeurs contenues dans le tableau pour l'affichage du total de likes et du prix par jour :
    const reducer = (accumulator, curr) => accumulator + curr;
    const totalLikes = likesArray.reduce(reducer);
    const divTotalLikesPrice = document.querySelector('.priceLikes');
    divTotalLikesPrice.innerHTML = ` <p class="totalLikes"> ${totalLikes} <img src="../images/totalLikes.svg" alt=""> </p>
    <p class="priceDay"> ${photographe.price}€/jour</p>`;

    // filtrage par tags:
    const liPhotographerTags = document.querySelectorAll('.filterMedia');
    const cardsMedia = document.querySelectorAll('.mediaView');
    liPhotographerTags.forEach((tag) => tag.addEventListener('click', () => {
      const value = tag.dataset.filter;
      console.log(value);
      tag.classList.toggle('active');
      cardsMedia.forEach((cardMedia) => {
        if (!cardMedia.classList.contains(value)) {
          // eslint-disable-next-line no-param-reassign
          cardMedia.style.display = 'none';
        }
        if (!tag.classList.contains('active')) {
          // eslint-disable-next-line no-param-reassign
          cardMedia.style.display = 'block';
        }
      });
    }));
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
