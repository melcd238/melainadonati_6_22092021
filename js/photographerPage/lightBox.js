/* eslint-disable no-console */
/* eslint-disable import/extensions */
import MediaFactory from '../class/mediaFactory.js';

function lightBox() {
  const sectionLightBox = document.querySelector('.lightBox');
  const lightBoxClose = document.querySelector('.lightBoxClose');
  const lightBoxNext = document.querySelector('.lightBoxNext');
  const lightBoxPrev = document.querySelector('.lightBoxPrev');
  const links = Array.from(document.querySelectorAll('.imageMedia'));
  const mediasImg = Array.from(document.querySelectorAll('.mediaImg'));

  console.log(links);
  console.log(mediasImg);

  links.forEach((link) => link.addEventListener('click', (e) => {
    e.preventDefault();
    lightBoxClose.focus();
    sectionLightBox.style.display = 'block';
    sectionLightBox.removeAttribute('aria-hidden', 'true');
    sectionLightBox.setAttribute('aria-hidden', 'false');
    const idmediaLink = link.dataset.id;
    console.log(idmediaLink);
    let media = mediasImg.find((img) => {
      const idmedia = img.id;
      return idmediaLink === idmedia;
    });
    console.log(media);
    media = MediaFactory.getMedia(media);
    media.displayMediaLightBox();
  }));

  lightBoxClose.addEventListener('click', (e) => {
    e.preventDefault();
    sectionLightBox.style.display = 'none';
    sectionLightBox.removeAttribute('aria-hidden', 'false');
    sectionLightBox.setAttribute('aria-hidden', 'true');
  });
}

// eslint-disable-next-line import/prefer-default-export
export { lightBox };
// recupeération de la valeur de l'id de la photo pour l'afficher? avec data-id;
// utilisation de la media factory;
