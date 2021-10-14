function createListBox() {
  const containerDropDown = document.querySelector('.containerDropDown');
  containerDropDown.innerHTML = ` <p class="sortBy"> Trier par </p>
  <div class="accordion-item close" role="listbox" tabindex="0" aria-activedescendant="listbox1-1">
      <div class="btnPopularite selected" id="listbox1-1"  aria-selected="true">
          <button>Popularité <i class="fas fa-chevron-down"></i></button>
      </div>
      <div class="accordion-item-contenu" id="listbox1-2" role="option" aria-selected="false">
        <button >Date</button>
      </div>
      <div class="accordion-item-contenu" id="listbox1-3" role="option" aria-selected="false">
        <button>Titre</button>
      </div>
</div>`;

  const btnPop = document.querySelector('.btnPopularite');
  const chevron = document.querySelector('.fa-chevron-down');
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

  const listbox = document.querySelector('[role="listbox"]');
  const options = [...listbox.children];

  listbox.addEventListener('click', (e) => {
    const selectedOption = e.target.closest('div');
    options.forEach((option) => option.classList.remove('selected'));
    options.forEach((option) => option.removeAttribute('aria-selected', 'false'));
    selectedOption.classList.add('selected');
    selectedOption.setAttribute('aria-selected', 'true');
    const evt = new Event('selectedChanged', (e), { bubbles: true, cancelable: false });
    document.dispatchEvent(evt);
  });
}

// eslint-disable-next-line import/prefer-default-export
export { createListBox };
