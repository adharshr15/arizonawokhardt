// SCRAPBOOK

// Variables
let scrapbookData = [];
let scrapbookViewGrid = true;
let currentScrapbookIndex = 0;
let currentScrapbookPage = 1;
let scrapbookItemsPerPage = 16;

// Functions
function nextScrapbookGridPage() {
  scrapbookLength = scrapbookData.length;
  itemsOnNextPage = scrapbookLength - (currentScrapbookPage * scrapbookItemsPerPage);
  if (itemsOnNextPage > 0) {
    currentScrapbookPage++;
    currentScrapbookIndex += scrapbookItemsPerPage;
    renderScrapbookFrames(currentScrapbookPage, 'grid');
  }
}
function prevScrapbookGridPage() {
  if (currentScrapbookPage > 1) {
    currentScrapbookPage--;
    currentScrapbookIndex -= scrapbookItemsPerPage;
    renderScrapbookFrames(currentScrapbookPage, 'grid');
  }
}
function nextScrapbookBigPage() {
  if (currentScrapbookIndex < scrapbookData.length - 1) {
    currentScrapbookIndex++;
    currentScrapbookPage = Math.floor(currentScrapbookIndex / scrapbookItemsPerPage) + 1;
    renderScrapbookFrames(currentScrapbookIndex, 'big');
  }
}
function prevScrapbookBigPage() {
  if (currentScrapbookIndex > 0) {
    currentScrapbookIndex--;
    currentScrapbookPage = Math.floor(currentScrapbookIndex / scrapbookItemsPerPage) + 1;
    renderScrapbookFrames(currentScrapbookIndex, 'big');
  }
}
function setupScrapbookButtons() {
  const gridScrapbookButton = document.getElementById('grid-scrapbook-button');
  const bigScrapbookButton = document.getElementById('big-scrapbook-button');
  if (gridScrapbookButton && bigScrapbookButton) {
    gridScrapbookButton.removeEventListener('click', scrapbookGridViewToggle);
    bigScrapbookButton.removeEventListener('click', scrapbookBigViewToggle);

    gridScrapbookButton.addEventListener('click', scrapbookGridViewToggle);
    bigScrapbookButton.addEventListener('click', scrapbookBigViewToggle);
  }
}
function scrapbookGridViewToggle() {
  if (!scrapbookViewGrid) {
    scrapbookViewGrid = true;
    renderScrapbookFrames(currentScrapbookPage, 'grid');
    
  }
}
function scrapbookBigViewToggle() {
  if (scrapbookViewGrid) {
    scrapbookViewGrid = false;
    renderScrapbookFrames(currentScrapbookIndex, 'big');
  }
}
function renderScrapbookFrames(content, view) {
  const container = document.getElementById('scrapbook-container');
  container.innerHTML = '';

  const pageSelectContainer = document.getElementById('scrapbook-page-select-container');
  pageSelectContainer.innerHTML = '';

  // if grid view, the current page, which has <= 15 images, is passed as content
  if (view === 'grid') {
    document.getElementById('grid-scrapbook-button').disabled = true;
    document.getElementById('big-scrapbook-button').disabled = false;

    container.className = 'scrapbook-container-grid';

    const start = (content - 1) * scrapbookItemsPerPage;
    const end = content * scrapbookItemsPerPage;
    const pageItems = scrapbookData.slice(start, end);
    currentScrapbookIndex = start;

    pageItems.forEach((item, index) => {
      const globalIndex = start + index;

      const frame = document.createElement('div');
      frame.className = 'scrapbook-frame-small';
      frame.innerHTML = `
        <img class="scrapbook-image" src="${item.path}">
      `;
      frame.dataset.index = globalIndex;

      // Add click listener to switch to big view
      frame.addEventListener('click', () => {
        currentScrapbookIndex = globalIndex;
        scrapbookBigViewToggle();
      });

      container.appendChild(frame);
    });

    // add page select buttons
    pageSelectContainer.innerHTML = `
      <button id="scrapbook-grid-prev-button" class="left toggle-button grid-prev-button"></button>
      <button id="scrapbook-grid-next-button" class="right toggle-button grid-next-button"></button>
    `;

    // add click listeners for buttons
    const prevButton = document.getElementById('scrapbook-grid-prev-button');
    const nextButton = document.getElementById('scrapbook-grid-next-button');

    prevButton.addEventListener('click', prevScrapbookGridPage);
    nextButton.addEventListener('click', nextScrapbookGridPage);

    const totalPages = Math.ceil(scrapbookData.length / scrapbookItemsPerPage);

    if (currentScrapbookPage === 1) { prevButton.disabled = true; }
    if (currentScrapbookPage === totalPages) { nextButton.disabled = true; }

  // if big view, the current index is passed as content
  } else {
    document.getElementById('grid-scrapbook-button').disabled = false;
    document.getElementById('big-scrapbook-button').disabled = true;

    container.className = 'scrapbook-container-big';
    
    const item = scrapbookData[content];

    const frame = document.createElement('div');
    frame.className = 'pink-metallic scrapbook-frame-big';
    frame.innerHTML = `
      <div class='inner-text scrapbook-description'>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;

    const image = document.createElement('div');
    image.className = 'scrapbook-image-big';
    image.innerHTML = `<img class="scrapbook-image-big" src="${item.path}">`;

    container.appendChild(image);
    container.appendChild(frame);
    

    // add page select buttons
    pageSelectContainer.innerHTML = `
      <button id="scrapbook-big-prev-button" class="left toggle-button big-prev-button"></button>
      <button id="scrapbook-big-next-button" class="right toggle-button big-next-button"></button>
    `;

    // add click listeners for buttons
    const prevButton = document.getElementById('scrapbook-big-prev-button');
    const nextButton = document.getElementById('scrapbook-big-next-button');

    prevButton.addEventListener('click', prevScrapbookBigPage);
    nextButton.addEventListener('click', nextScrapbookBigPage);

    if (currentScrapbookIndex === 0) { prevButton.disabled = true; }
    if (currentScrapbookIndex === scrapbookData.length - 1) { nextButton.disabled = true; }
  }
}
