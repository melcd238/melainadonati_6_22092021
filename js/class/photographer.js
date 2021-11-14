/* eslint-disable no-console */
export default class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tags = data.tags;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  // methode pour display la liste des photographe
  displayPhotographersList() {
    const sectionPhotographers = document.querySelector('#indexPage');
    const card = document.createElement('div');
    card.setAttribute('class', 'cardPhotographer');
    card.innerHTML = `   <a href="pages/photographer.html?id=${this.id}" class="linkPhotographer">
          <img src="../images/Portraits/${this.portrait}" alt="portrait du photographe ${this.name}">
          <h2>${this.name}</h2>
     </a>
     <p class="location" tabindex="0"><span>${this.city}</span>,<span>${this.country}</span></p>
    
     <p class="textDesciption" role="text" tabindex="0"> ${this.tagline}</p>
     <p class="price" tabindex="0">  ${this.price}€/jour</p>`;
    const divHastag = document.createElement('div');
    divHastag.setAttribute('class', 'hastag');
    const ulHastag = document.createElement('ul');
    ulHastag.setAttribute('class', 'ulHashList');
    ulHastag.setAttribute('aria-label', 'filtrer par tag');
    divHastag.appendChild(ulHastag);
    const tagsPhotographer = this.tags;
    console.log(tagsPhotographer);
    tagsPhotographer.forEach((tag) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="../../index.html?tag=${tag}" class="linkPhotographer"> #${tag}</a>`;
      li.setAttribute('class', 'filterTag');
      li.setAttribute('data-filter', `${tag}`);
      ulHastag.appendChild(li);
    });
    card.appendChild(divHastag);
    sectionPhotographers.appendChild(card);
  }

  // methode pour afficher un photographe sur la page photographer.html
  displayOnePhotographer() {
    const presentationPhotographer = document.querySelector('.presentation');
    const priceDay = document.querySelector('.priceDay');
    priceDay.innerHTML = `<span tabindex="0">${this.price} €/jour</span>`;
    presentationPhotographer.innerHTML = `<div class="information">
    <h1 tabindex="0">${this.name}</h1>
    <div class="locationText">
        <p tabindex="0"> <span>${this.city},</span> <span>${this.country}</span></p>
        <p class="text" role="text">${this.tagline}</p>
    </div>
    <div class="tags">
    <ul class="ulTags" aria-label="filtrer par tag">
    </ul>
    </div>
</div>
<div class="btnContact">
    <button id="btnContactModal">Contactez-moi</button>
</div>
<div class="portrait">
    <img src="../images/Portraits/${this.portrait}" alt="portrait de ${this.name}">
</div>`;
    const ultags = document.querySelector('.ulTags');
    const tagsPhotographer = this.tags;
    tagsPhotographer.forEach((tag) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="../../index.html?tag=${tag}" class="linkPhotographer"> #${tag}</a>`;
      li.setAttribute('class', 'filterPhotographer');
      li.setAttribute('data-filter', `${tag}`);
      ultags.appendChild(li);
    });
    const nameTitleForm = document.querySelectorAll('.nameTitle');
    nameTitleForm.forEach((nameTitle) => {
      // eslint-disable-next-line no-param-reassign
      nameTitle.textContent = `${this.name}`;
    });
  }
}
