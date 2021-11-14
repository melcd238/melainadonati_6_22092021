/* eslint-disable prefer-const */
/* eslint-disable no-console */
export default class LightBox {
  static init() {
    const links = Array.from(document.querySelectorAll('a[href$= ".jpg"], a[href$= ".mp4"] '));
    const gallery = links.map((link) => link.getAttribute('href'));
    console.log(gallery);
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-new
      new LightBox(e.currentTarget.getAttribute('href'), gallery);
    }));
  }

  constructor(url, imagesOrVideo) {
    this.elementDom = this.createLightBox(url);
    this.imagesOrVideo = imagesOrVideo;
    this.loadImageOrVideo(url);
    this.onKeyDown = this.onKeyDown.bind(this);
    const sectionMedia = document.querySelector('.media');
    sectionMedia.appendChild(this.elementDom);
    document.addEventListener('keydown', this.onKeyDown);
  }

  loadImageOrVideo(url) {
    this.url = null;
    const image = document.createElement('img');
    const video = document.createElement('video');
    video.setAttribute('type', 'video/mp4');
    video.setAttribute('controls', '');
    const description = document.createElement('h3');
    description.setAttribute('class', 'titleImgLightBox');
    const container = this.elementDom.querySelector('.lightBoxContainer');
    this.elementDom.removeAttribute('aria-hidden', 'true');
    this.elementDom.setAttribute('aria-hidden', 'false');
    const loader = document.createElement('div');
    loader.classList.add('lightBoxLoader');
    container.innerHTML = '';
    container.appendChild(loader);
    // Mettre la condition si c'est une image : container.appendChild(image)
    // si c'est une video  container.appendChild(video);
    if (url.match(/\.(jpg)$/) != null) {
      image.onload = () => {
        container.removeChild(loader);
        container.appendChild(image);
        this.url = url;
        let title = '';
        let index = url.lastIndexOf('/');
        let titleArray = url.substring(index + 1).replace('.jpg', '').split('_');
        titleArray.forEach((word) => {
          title += `${word} `;
        });
        console.log(title);
        description.textContent = title;
        container.appendChild(description);
      };
      image.src = url;
    } else if (url.match(/\.(mp4)$/) != null) {
      container.removeChild(loader);
      container.appendChild(video);
      this.url = url;
      video.src = url;
      let title = '';
      let index = url.lastIndexOf('/');
      let titleArray = url.substring(index + 1).replace('.mp4', '').split('_');
      titleArray.forEach((word) => {
        title += `${word} `;
      });
      console.log(title);
      description.textContent = title;
      container.appendChild(description);
    }
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowRight') {
      this.lightBoxNext(e);
    } else if (e.key === 'ArrowLeft') {
      this.lightBoxPrev(e);
    }
  }

  close(e) {
    e.preventDefault();
    this.elementDom.classList.add('fadeOut');
    this.elementDom.removeAttribute('aria-hidden', 'false');
    this.elementDom.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => {
      this.elementDom.remove(this.elementDom);
    }, 500);
    document.removeEventListener('keydown', this.onKeyDown);
  }

  lightBoxNext(e) {
    e.preventDefault();
    // eslint-disable-next-line prefer-const
    let i = this.imagesOrVideo.findIndex((image) => image === this.url);
    if (i === this.imagesOrVideo.length - 1) {
      i = -1;
    }
    this.loadImageOrVideo(this.imagesOrVideo[i + 1]);
  }

  lightBoxPrev(e) {
    e.preventDefault();
    let i = this.imagesOrVideo.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.imagesOrVideo.length;
    }
    this.loadImageOrVideo(this.imagesOrVideo[i - 1]);
  }

  // eslint-disable-next-line class-methods-use-this
  createLightBox() {
    const sectionLightBox = document.createElement('section');
    sectionLightBox.classList.add('lightBox');
    sectionLightBox.setAttribute('aria-hidden', 'true');
    sectionLightBox.innerHTML = `<button class="lightBoxClose" title="fermer la lightBox">Fermer</button>
    <button class="lightBoxNext" title="image suivante">Suivant</button>
    <button class="lightBoxPrev" title="image précédente">Précédent</button>
    <div class="lightBoxContainer"></div>`;
    sectionLightBox.querySelector('.lightBoxClose').addEventListener('click', this.close.bind(this));
    sectionLightBox.querySelector('.lightBoxNext').addEventListener('click', this.lightBoxNext.bind(this));
    sectionLightBox.querySelector('.lightBoxPrev').addEventListener('click', this.lightBoxPrev.bind(this));

    return sectionLightBox;
  }
}
