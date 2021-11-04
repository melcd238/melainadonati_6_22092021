export default class LightBox {
  static init() {
    const links = Array.from(document.querySelectorAll('a[href$= ".png"],a[href$= ".jpg"], a[href$= ".jpeg"], a[href$= ".mp4"] '));
    const gallery = links.map((link) => link.getAttribute('href'));
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-new
      new LightBox(e.currentTarget.getAttribute('href'), gallery);
    }));
  }

  constructor(url, images) {
    this.elementDom = this.createLightBox(url);
    this.images = images;
    this.loadImage(url);
    const sectionMedia = document.querySelector('.media');
    sectionMedia.appendChild(this.elementDom);
  }

  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.elementDom.querySelector('.lightBoxContainer');
    const loader = document.createElement('div');
    loader.classList.add('lightBoxLoader');
    container.innerHTML = '';
    container.appendChild(loader);
    // on ecoute le chargement de l'image
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
  }

  close(e) {
    e.preventDefault();
    this.elementDom.classList.add('fadeOut');
    window.setTimeout(() => {
      this.elementDom.remove(this.elementDom);
    }, 500);
  }

  lightBoxNext(e) {
    e.preventDefault();
    // eslint-disable-next-line prefer-const
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1]);
  }

  lightBoxPrev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }

  // eslint-disable-next-line class-methods-use-this
  createLightBox() {
    const sectionLightBox = document.createElement('section');
    sectionLightBox.classList.add('lightBox');
    sectionLightBox.innerHTML = `<button class="lightBoxClose">Fermer</button>
    <button class="lightBoxNext">Suivant</button>
    <button class="lightBoxPrev">Précédent</button>
    <div class="lightBoxContainer"></div>`;
    sectionLightBox.querySelector('.lightBoxClose').addEventListener('click', this.close.bind(this));
    sectionLightBox.querySelector('.lightBoxNext').addEventListener('click', this.lightBoxNext.bind(this));
    sectionLightBox.querySelector('.lightBoxPrev').addEventListener('click', this.lightBoxPrev.bind(this));

    return sectionLightBox;
  }
}
