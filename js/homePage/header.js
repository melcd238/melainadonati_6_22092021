// creation du header avec tags récupérés de manière dynamqiue:
export default class Header {
  constructor(selector, tagList) {
    this.selector = selector;
    this.tagList = tagList;
  }

  createHeader() {
    // div pour englober les 3 éléments du header:
    const divHeader = document.createElement('div');
    divHeader.classList.add('divHeader');

    // logo
    const logo = document.createElement('a');
    logo.setAttribute('href', 'index.html');
    logo.setAttribute('aria-label', 'retour à la page accueil');
    logo.classList.add('logoLink');
    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', 'images/logo.svg');
    logoImg.setAttribute('alt', 'Fisheye Home page');

    // navBar
    const navBar = document.createElement('nav');
    navBar.classList.add('navBar');
    navBar.setAttribute('aria-label', 'categorie des photographes');
    const ulNavBar = document.createElement('ul');
    ulNavBar.setAttribute('aria-label', 'filtrer par tag');
    navBar.appendChild(ulNavBar);
    this.tagList.forEach((tagName) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="../../index.html?tag=${tagName}" class="linkPhotographer"> #${tagName}</a>`;
      li.setAttribute('class', 'filterTag');
      li.setAttribute('data-filter', `${tagName}`);
      ulNavBar.appendChild(li);
    });

    // button
    // const btnGoToMain = document.createElement('button');
    //  btnGoToMain.classList.add('btnGoToMain');
    //  const linkGoToMain = document.createElement('a');
    //  linkGoToMain.setAttribute('href', '#indexMain');
    //  linkGoToMain.appendChild(document.createTextNode('Passer au contenu'));

    // apparition du bouton "passer au contenu" au scroll
    //   window.addEventListener('scroll', () => {
    //   if (window.scrollY > 20) {
    //   btnGoToMain.style.visibility = 'visible';
    //  } else {
    //  btnGoToMain.style.visibility = 'hidden';
    //  }
    //  });

    logo.appendChild(logoImg);
    // btnGoToMain.appendChild(linkGoToMain);
    divHeader.append(logo, navBar); // btnGoToMain
    this.selector.appendChild(divHeader);
  }
}
