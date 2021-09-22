export default class Header {
  constructor(selector) {
    this.selector = selector;
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
    const ulNavBar = document.createElement('ul');
    navBar.appendChild(ulNavBar);
    const tagsName = ['Portrait', 'Art', 'Fashion', 'Architecture', 'Travel', 'Sport', 'Animals', 'Events'];
    tagsName.forEach((tagName) => {
      const li = document.createElement('li');
      const text = document.createTextNode(`#${tagName}`);
      li.appendChild(text);
      ulNavBar.appendChild(li);
    });

    // button
    const btnGoToMain = document.createElement('button');
    btnGoToMain.classList.add('btnGoToMain');
    const linkGoToMain = document.createElement('a');
    linkGoToMain.setAttribute('href', '#indexMain');
    linkGoToMain.appendChild(document.createTextNode('Passer au contenu'));

    logo.appendChild(logoImg);
    btnGoToMain.appendChild(linkGoToMain);
    divHeader.append(logo, btnGoToMain, navBar);
    this.selector.appendChild(divHeader);
  }
}
