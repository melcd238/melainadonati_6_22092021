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

  displayMediaList() {
    const sectionMedia = document.querySelector('.media');
    const mediaVideoCard = document.createElement('div');
    mediaVideoCard.setAttribute('class', 'mediaView');
    mediaVideoCard.classList.add(`${this.tags}`);
    mediaVideoCard.setAttribute('id', `${this.id}`);
    mediaVideoCard.innerHTML = `<div id="openLightbox" class="imageMedia">
      <video src="../images/${this.photographerId}/${this.video}"  poster type="video/mp4" ></video> </div>
    <div class="titleLikes">
        <h3> ${this.title} </h3>
        <p class="likes"> ${this.likes} <img src="../images/likes.svg" alt=""></p>
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
