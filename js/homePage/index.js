/* eslint-disable no-console */
/* eslint-disable import/extensions */
import Header from './header.js';

// selector pour le Header
const header = document.querySelector('.indexHeader');
const headerContent = new Header(header);
headerContent.createHeader();

// Fetch
fetch('data/data.json')
  .then((response) => response.json())
  .then((data) => {
    const photographersArray = data.photographers;
    const mediaArray = data.media;
    let tagsArray = photographersArray.map((photographer) => photographer.tags);
    tagsArray = [...new Set([].concat(...tagsArray))];
    console.log(tagsArray);
    console.log(mediaArray);

    const sectionPhotographers = document.querySelector('#indexPage');

    photographersArray.forEach((photographer) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'cardPhotographer');
      card.innerHTML = `   <a href="pages/photographer.html?id=${photographer.id}" class="linkPhotographer">
            <img src="images/Portraits/${photographer.portrait}">
            <h2>${photographer.name}</h2>
       </a>
       <p class="location"><span>${photographer.city}</span>, <span>${photographer.country}</span></p>
      
       <p class="textDesciption" role="text"> ${photographer.tagline}</p>
       <p class="price">  ${photographer.price}€/jour</p>`;
      const divHastag = document.createElement('div');
      divHastag.setAttribute('class', 'hastag');
      const ulHastag = document.createElement('ul');
      ulHastag.setAttribute('class', 'ulHashList');
      divHastag.appendChild(ulHastag);
      const tagsPhotographer = photographer.tags;
      tagsPhotographer.forEach((tag) => {
        const li = document.createElement('li');
        const text = document.createTextNode(`#${tag}`);
        li.appendChild(text);
        ulHastag.appendChild(li);
      });
      card.appendChild(divHastag);

      sectionPhotographers.appendChild(card);
    });
  });
