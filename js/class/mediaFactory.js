/* eslint-disable max-classes-per-file */
class Media {
  constructor(data) {
    this.title = data.title;
    this.date = data.date;
    this.id = data.id;
    this.likes = data.likes;
    this.price = data.price;
    this.tags = data.tags;
    this.photographerId = data.photographerId;
    this.altText = data.altText;
  }
}
class Image extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }

  displayMediaList() {
    const sectionMedia = document.querySelector('.media');
    const mediaImageCard = document.createElement('div');
    mediaImageCard.setAttribute('class', 'mediaView');
    mediaImageCard.setAttribute('id', `${this.id}`);
    mediaImageCard.innerHTML = ` <a  class="imageMedia" href = "/images/${this.photographerId}/${this.image}" tabindex="0" title="${this.altText}">
      <img  src="/images/${this.photographerId}/${this.image}" alt="${this.altText}"/>
  </a>
  <div class="titleLikes">
      <h2> ${this.title} </h2>
      <p class="likesBtn"> ${this.likes} <img class="imgLike" src="/images/likes.svg" alt="like la photo" aria-label="likes" role="button" tabindex="0"></p>
  </div> `;

    sectionMedia.appendChild(mediaImageCard);
  }

  displayMediaLightBox() {
    const lightBoxContainer = document.querySelector('.lightBoxContainer');
    lightBoxContainer.innerHTML = `  <img  src="/images/${this.photographerId}/${this.image}" alt="${this.altText}"/>
    <h1 class="titleImgLightBox">${this.title}</h1>`;
  }
}
class Video extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
  }

  displayMediaList() {
    const sectionMedia = document.querySelector('.media');
    const mediaVideoCard = document.createElement('div');
    mediaVideoCard.setAttribute('class', 'mediaView');
    mediaVideoCard.setAttribute('id', `${this.id}`);
    mediaVideoCard.innerHTML = `<a  class="imageMedia" href= "/images/${this.photographerId}/${this.video}" tabindex="0"  title="${this.altText}">
      <video src="/images/${this.photographerId}/${this.video}" role="button" poster type="video/mp4" title="${this.title}"></video> </a>
    <div class="titleLikes">
        <h2> ${this.title} </h2>
        <p class="likesBtn"> ${this.likes} <img class="imgLike" src="/images/likes.svg" alt="like la photo" aria-label="likes" role="button" tabindex="0"></p>
    </div> `;
    sectionMedia.appendChild(mediaVideoCard);
  }

  displayMediaLightBox() {
    const lightBoxContainer = document.querySelector('.lightBoxContainer');
    lightBoxContainer.innerHTML = `  <video  src="/images/${this.photographerId}/${this.image}" title="${this.altText}" type="video/mp4" controls
    <p>Votre navigateur ne prend pas en charge les vidéos HTML5.</p> 
    </video>
    <h1 class="titleImgLightBox">${this.title}</h1>`;
  }
}

export default class MediaFactory {
  // eslint-disable-next-line no-shadow
  static getMedia(data) {
    if (data.image) {
      return new Image(data);
    } if (data.video) {
      return new Video(data);
    }
    return new Error('Wrong media chosen');
  }
}
