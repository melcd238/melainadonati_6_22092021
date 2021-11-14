function createListBox() {
  const containerDropDown = document.querySelector('.containerDropDown');
  containerDropDown.innerHTML = ` <p class="sortBy"> Trier par </p>
  <div class="accordion-item close" role="listbox" tabindex="0" aria-activedescendant="listbox1-1"  aria-label="Trier par filtre">
      <div class="btnPopularite selected" id="listbox1-1"  aria-selected="true" aria-label="Trier par popularité actuellement">
          <button class="btnpop" tabindex="0">Popularité <i class="fas fa-chevron-down"></i></button>
      </div>
      <div class="accordion-item-contenu" id="listbox1-2"  role="option" aria-label="Trier par date" aria-selected="false">
        <button  class="btndate" tabindex="0">Date  <i class="fas fa-chevron-down"></i></button>
      </div>
      <div class="accordion-item-contenu" id="listbox1-3" role="option"  aria-label="Trier par titre" aria-selected="false">
        <button class="btntitre" tabindex="0">Titre <i class="fas fa-chevron-down"></i></button>
      </div>
</div>`;

  const btnPop = document.querySelector('.btnPopularite');
  const chevron = document.querySelector('.fa-chevron-down');
  const btnpop = document.querySelector('.btnpop');
  const btndate = document.querySelector('.btndate');
  const btntitre = document.querySelector('.btntitre');
  function toggleItem() {
    const itemClass = this.parentNode.className;
    if (itemClass === 'accordion-item close') {
      this.parentNode.className = 'accordion-item open';
      chevron.classList.remove('fa-chevron-down');
      chevron.classList.add('fa-chevron-up');
    }
    if (itemClass === 'accordion-item open') {
      this.parentNode.className = 'accordion-item close';
      chevron.classList.remove('fa-chevron-up');
      chevron.classList.add('fa-chevron-down');
    }
  }
  btnPop.addEventListener('click', toggleItem);

  // lecture au clavier
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      if (document.activeElement === btnpop) {
        btndate.focus();
      } else if (document.activeElement === btndate)btntitre.focus();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (document.activeElement === btndate) {
        btnpop.focus();
      } else if (document.activeElement === btntitre)btndate.focus();
    }
  });

  const listbox = document.querySelector('[role="listbox"]');
  const options = [...listbox.children];

  function listBoxOpen() {
    listbox.addEventListener('click', (e) => {
      const btnPopularite = document.querySelector('#listbox1-1');
      const btnTitre = document.querySelector('#listbox1-3');
      const btnDate = document.querySelector('#listbox1-2');
      const selectedOption = e.target.closest('div');
      options.forEach((option) => option.classList.remove('selected'));
      options.forEach((option) => option.removeAttribute('aria-selected', 'false'));
      const btnText = selectedOption.children;
      if (btnText[0].innerText === 'Date ') {
        btnDate.classList.toggle('active');
        if (btnDate.classList.contains('active')) {
          btnPopularite.style.display = 'none';
          btnTitre.style.display = 'none';
        } else {
          btnPopularite.style.display = 'block';
          btnTitre.style.display = 'block';
        }
      }
      if (btnText[0].innerText === 'Titre ') {
        btnTitre.classList.toggle('active');
        if (btnTitre.classList.contains('active')) {
          btnPopularite.style.display = 'none';
          btnDate.style.display = 'none';
        } else {
          btnPopularite.style.display = 'block';
          btnDate.style.display = 'block';
        }
      }
      selectedOption.classList.add('selected');
      selectedOption.setAttribute('aria-selected', 'true');
      const evt = new Event('selectedChanged', (e), { bubbles: true, cancelable: false });
      document.dispatchEvent(evt);
    });
  }
  listBoxOpen();
}

// eslint-disable-next-line import/prefer-default-export
export { createListBox };
