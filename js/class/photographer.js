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
     <p class="location"><span>${this.city}</span>,<span>${this.country}</span></p>
    
     <p class="textDesciption" role="text"> ${this.tagline}</p>
     <p class="price">  ${this.price}€/jour</p>`;
    const divHastag = document.createElement('div');
    divHastag.setAttribute('class', 'hastag');
    const ulHastag = document.createElement('ul');
    ulHastag.setAttribute('class', 'ulHashList');
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
    priceDay.innerHTML = `<span>${this.price} €/jour</span>`;
    presentationPhotographer.innerHTML = `<div class="information">
    <h1>${this.name}</h1>
    <div class="locationText">
        <p> <span>${this.city},</span> <span>${this.country}</span></p>
        <p class="text">${this.tagline}</p>
    </div>
    <div class="tags">
    <ul class="ulTags">
    </ul>
    </div>
</div>
<div class="btnContact">
    <button id="btnContactModal">Contactez-moi</button>
</div>
<div class="portrait">
    <img src="../images/Portraits/${this.portrait}">
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
