export default class LightBox {
  static init() {
    const links = Array.from(document.querySelectorAll('a[href$= ".png"],a[href$= ".jpg"], a[href$= ".jpeg"], a[href$= ".mp4"] '));
    console.log(links);
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-new
      new LightBox(e.currentTarget.getAttribute('href'));
    }));
  }

  constructor(url) {
    this.elementDom = this.createLightBox(url);
    this.loadImage(url);
    const sectionMedia = document.querySelector('.media');
    sectionMedia.appendChild(this.elementDom);
  }

  loadImage(url) {
    const image = new Image();
    const container = this.elementDom.querySelector('.lightBoxContainer');
    const loader = document.createElement('div');
    loader.classList.add('lightBoxLoader');
    container.appendChild(loader);
    // on ecoute le chargement de l'image
    // eslint-disable-next-line func-names
    image.onload = function () {
      container.removeChild(loader);
      container.appendChild(image);
    };
    image.src = url;
  }

  close(e) {
    e.preventDefault();
    this.elementDom.classList.add('fadeOut');
    window.setTimeout(() => {
      this.elementDom.remove(this.elementDom);
    }, 300);
  }

  lightBoxNext(e) {
    e.preventDefault();
  }

  lightBoxPrev(e) {
    e.preventDefault();
  }

  // eslint-disable-next-line class-methods-use-this
  createLightBox(url) {
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
