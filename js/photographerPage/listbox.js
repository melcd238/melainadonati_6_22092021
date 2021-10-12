function createListBox() {
  const containerDropDown = document.querySelector('.containerDropDown');
  containerDropDown.innerHTML = ` <p class="sortBy"> Trier par </p>
  <div class="accordion-item close" role="listbox" tabindex="0" aria-activedescendant="listbox1-1">
      <div class="btnPopularite">
          <button id="listbox1-1" class="selected" aria-selected="true">Popularité <i class="fas fa-chevron-down"></i></button>
      </div>
      <div class="accordion-item-contenu">
        <button id="listbox1-2" role="option">Date</button>
      </div>
      <div class="accordion-item-contenu">
        <button id="listbox1-3" role="option">Titre</button>
      </div>
</div>`;
  const btnPop = document.querySelector('.btnPopularite');

  function toggleItem() {
    const itemClass = this.parentNode.className;
    if (itemClass === 'accordion-item close') {
      this.parentNode.className = 'accordion-item open';
    }
    if (itemClass === 'accordion-item open') {
      this.parentNode.className = 'accordion-item close';
    }
  }

  btnPop.addEventListener('click', toggleItem, false);
}

// eslint-disable-next-line import/prefer-default-export
export { createListBox };
