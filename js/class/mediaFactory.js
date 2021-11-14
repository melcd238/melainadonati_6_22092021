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
    mediaImageCard.innerHTML = ` <a  class="imageMedia" href = "../images/${this.photographerId}/${this.image}" tabindex="0" title="renvoit l'image dans la lightbox">
      <img  src="../images/${this.photographerId}/${this.image}" alt="${this.title}, closeup view"/>
  </a>
  <div class="titleLikes">
      <h2> ${this.title} </h2>
      <p class="likesBtn"> ${this.likes} <img class="imgLike" src="../images/likes.svg" alt="heart" aria-label="likes" role="button" tabindex="0"></p>
  </div> `;

    sectionMedia.appendChild(mediaImageCard);
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
    mediaVideoCard.innerHTML = `<a  class="imageMedia" href= "../images/${this.photographerId}/${this.video}" tabindex="0"  title="renvoit la video dans la lightbox">
      <video src="../images/${this.photographerId}/${this.video}"  poster type="video/mp4"></video> </a>
    <div class="titleLikes">
        <h2> ${this.title} </h2>
        <p class="likesBtn"> ${this.likes} <img class="imgLike" src="../images/likes.svg" alt="heart" aria-label="likes" role="button" tabindex="0"></p>
    </div> `;
    sectionMedia.appendChild(mediaVideoCard);
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
