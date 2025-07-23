// GALLERY

// Variables
let galleryData = [];
let galleryViewGrid = true;
let currentGalleryIndex = 0;
let currentGalleryPage = 1;
let galleryItemsPerPage = 19;

// Functions
function nextGalleryGridPage() {
  galleryLength = galleryData.length;
  itemsOnNextPage = galleryLength - (currentGalleryPage * galleryItemsPerPage);
  if (itemsOnNextPage > 0) {
    currentGalleryPage++;
    currentGalleryIndex += galleryItemsPerPage;
    renderGalleryFrames(currentGalleryPage, 'grid');
  }
}
function prevGalleryGridPage() {
  if (currentGalleryPage > 1) {
    currentGalleryPage--;
    currentGalleryIndex -= galleryItemsPerPage;
    renderGalleryFrames(currentGalleryPage, 'grid');
  }
}
function nextGalleryBigPage() {
  if (currentGalleryIndex < galleryData.length - 1) {
    currentGalleryIndex++;
    currentGalleryPage = Math.floor(currentGalleryIndex / galleryItemsPerPage) + 1;
    renderGalleryFrames(currentGalleryIndex, 'big');
  }
}
function prevGalleryBigPage() {
  if (currentGalleryIndex > 0) {
    currentGalleryIndex--;
    currentGalleryPage = Math.floor(currentGalleryIndex / galleryItemsPerPage) + 1;
    renderGalleryFrames(currentGalleryIndex, 'big');
  }
}
function setupGalleryButtons() {
  const gridGalleryButton = document.getElementById('grid-gallery-button');
  const bigGalleryButton = document.getElementById('big-gallery-button');
  if (gridGalleryButton && bigGalleryButton) {
    gridGalleryButton.removeEventListener('click', galleryGridViewToggle);
    bigGalleryButton.removeEventListener('click', galleryBigViewToggle);

    gridGalleryButton.addEventListener('click', galleryGridViewToggle);
    bigGalleryButton.addEventListener('click', galleryBigViewToggle);
  }
}
function galleryGridViewToggle() {
  if (!galleryViewGrid) {
    galleryViewGrid = true;
    renderGalleryFrames(currentGalleryPage, 'grid'); 
  }
}
function galleryBigViewToggle() {
  if (galleryViewGrid) {
    galleryViewGrid = false;
    renderGalleryFrames(currentGalleryIndex, 'big');
  }
}
function renderGalleryFrames(content, view) {
  const container = document.getElementById('gallery-container');
  container.innerHTML = '';

  const pageSelectContainer = document.getElementById('gallery-page-select-container');
  pageSelectContainer.innerHTML = '';

  // if grid view, the current page, which has <= 15 images, is passed as content
  if (view === 'grid') {
    document.getElementById('grid-gallery-button').disabled = true;
    document.getElementById('big-gallery-button').disabled = false;

    container.className = 'gallery-container-grid';

    const start = (content - 1) * galleryItemsPerPage;
    const end = content * galleryItemsPerPage;
    const pageItems = galleryData.slice(start, end);
    currentGalleryIndex = start;

    pageItems.forEach((image, index) => {
      const globalIndex = start + index;

      const frame = document.createElement('div');
      frame.className = 'pink-metallic gallery-frame-small';
      frame.innerHTML = `
        <img class="gallery-image" src="${image.path}">
      `;
      frame.dataset.index = globalIndex;

      // Add click listener to switch to big view
      frame.addEventListener('click', () => {
        currentGalleryIndex = globalIndex;
        galleryBigViewToggle();
      });

      container.appendChild(frame);
    });

    // add page select buttons
    pageSelectContainer.innerHTML = `
      <button id="gallery-grid-prev-button" class="left toggle-button grid-prev-button"></button>
      <button id="gallery-grid-next-button" class="right toggle-button grid-next-button"></button>
    `;

    // add click listeners for buttons
    const prevButton = document.getElementById('gallery-grid-prev-button');
    const nextButton = document.getElementById('gallery-grid-next-button');

    prevButton.addEventListener('click', prevGalleryGridPage);
    nextButton.addEventListener('click', nextGalleryGridPage);

    const totalPages = Math.ceil(galleryData.length / galleryItemsPerPage);

    if (currentGalleryPage === 1) { prevButton.disabled = true; }
    if (currentGalleryPage === totalPages) { nextButton.disabled = true; }

    // cache next page
    const nextPage = content + 1;
    
    if (nextPage <= totalPages) {
      const preloadStart = (nextPage - 1) * galleryItemsPerPage;
      const preloadEnd = nextPage * galleryItemsPerPage;
      const preloadItems = galleryData.slice(preloadStart, preloadEnd);

      preloadItems.forEach(item => {
        const img = new Image();
        img.src = item.path;
      });
    }

    // cache previous page
    const prevPage = content - 1;

    if (prevPage >= 1) {
      const preloadStart = (prevPage - 1) * galleryItemsPerPage;
      const preloadEnd = prevPage * galleryItemsPerPage;
      const preloadItems = galleryData.slice(preloadStart, preloadEnd);

      preloadItems.forEach(item => {
        const img = new Image();
        img.src = item.path;
      });
    }

  // if big view, the current index is passed as content
  } else {
    document.getElementById('grid-gallery-button').disabled = false;
    document.getElementById('big-gallery-button').disabled = true;

    container.className = 'gallery-container-big';
    
    const image = galleryData[content];

    const frame = document.createElement('div');
    frame.className = 'pink-metallic gallery-frame-big';
    frame.innerHTML = `
      <img class="gallery-image" src="${image.path}">
      <div class='inner-text gallery-description'>
        ${image.description}
        <div class='date'>${image.date}</div>
      </div>
    `;

    container.appendChild(frame);

    // add page select buttons
    pageSelectContainer.innerHTML = `
      <button id="gallery-big-prev-button" class="left toggle-button big-prev-button"></button>
      <button id="gallery-big-next-button" class="right toggle-button big-next-button"></button>
    `;

    // add click listeners for buttons
    const prevButton = document.getElementById('gallery-big-prev-button');
    const nextButton = document.getElementById('gallery-big-next-button');

    prevButton.addEventListener('click', prevGalleryBigPage);
    nextButton.addEventListener('click', nextGalleryBigPage);

    if (currentGalleryIndex === 0) { prevButton.disabled = true; }
    if (currentGalleryIndex === galleryData.length - 1) { nextButton.disabled = true; }
  }
}
