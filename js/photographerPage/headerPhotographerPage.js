function createHeaderPhotographerPage() {
  const HeaderPhotographer = document.querySelector('.headerPhotographer');
  const logo = document.createElement('a');
  logo.setAttribute('href', '../index.html');
  logo.setAttribute('aria-label', 'retour à la page accueil');
  logo.classList.add('logoLinkPhotographer');
  const logoImg = document.createElement('img');
  logoImg.setAttribute('src', '../images/logo.svg');
  logoImg.setAttribute('alt', 'Fisheye Home page');
  logoImg.setAttribute('aria-label', 'logo');
  logo.appendChild(logoImg);
  HeaderPhotographer.appendChild(logo);
}

// eslint-disable-next-line import/prefer-default-export
export { createHeaderPhotographerPage };
