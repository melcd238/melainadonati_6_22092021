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
       <p class="price">  ${photographer.price}€/jour</p>
      
       <div class="hastag">
           <ul>
               <li>#portrait</li>
               <li>#events</li>
               <li>#animal</li>
           </ul>
       </div>`;
      sectionPhotographers.appendChild(card);
    });
  });
