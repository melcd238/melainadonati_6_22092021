import Header from './header.js';

// seclector pour le Header
const header = document.querySelector('.indexHeader');
const headerContent = new Header(header);
headerContent.createHeader();

