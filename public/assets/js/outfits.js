// OUTFITS

// Variables
let outfitsData = [];
let currentOutfitIndex = 0;
let outfitsPerPage = 1;

// Functions
function nextOutfitPage() {
  if (currentOutfitIndex < outfitsData.length-1) {
    currentOutfitIndex++;
    renderOutfitFrames(currentOutfitIndex);
  }
}
function prevOutfitPage() {
  if (currentOutfitIndex > 0) {
    currentOutfitIndex--;
    renderOutfitFrames(currentOutfitIndex);
  }
}
function renderOutfitFrames(index) {
  const container = document.getElementById('outfits-container');
  container.innerHTML =  `
    <div id="outfits-content">
      <div id="outfits-platform" class="pink-metallic circle-platform"></div>
      <img src="${outfitsData[index].tayla}" class="character tayla" loading='lazy'>
      <img src="${outfitsData[index].harsh}" class="character harsh" loading='lazy'>
      <div id="outfits-description-frame" class="pink-metallic outfits-frame">
          <div id="outfits-description-inner-text" class="inner-text outfits-text">
            <h3>${outfitsData[index].title}</h3>
            <p>${outfitsData[index].description}</p>
            <p class='date'>${outfitsData[index].date}</p>
          </div>
      </div>
    </div>
  `;

  const pageSelectContainer = document.getElementById('outfits-page-select-container');
  pageSelectContainer.innerHTML = `
    <button id="outfits-prev-button" class="left toggle-button big-prev-button"></button>
    <button id="outfits-next-button" class="right toggle-button big-next-button"></button>
  `;

  // add click listeners for buttons
  const prevButton = document.getElementById('outfits-prev-button');
  const nextButton = document.getElementById('outfits-next-button');

  prevButton.addEventListener('click', prevOutfitPage);
  nextButton.addEventListener('click', nextOutfitPage);

  // disable buttons for first and last page
  const totalPages = outfitsData.length;

  if (currentOutfitIndex === 0) { prevButton.disabled = true; }
  if (currentOutfitIndex === totalPages-1) { nextButton.disabled = true; }  

  // cache next outfits
  const nextIndex = index + 1;
  if (nextIndex < outfitsData.length) {
    const preloadTayla = new Image();
    preloadTayla.src = outfitsData[nextIndex].tayla;

    const preloadHarsh = new Image();
    preloadHarsh.src = outfitsData[nextIndex].harsh;
  }

  // cache previous outfits
  const prevIndex = index - 1;
  if (prevIndex >= 0) {
    const preloadPrevTayla = new Image();
    preloadPrevTayla.src = outfitsData[prevIndex].tayla;

    const preloadPrevHarsh = new Image();
    preloadPrevHarsh.src = outfitsData[prevIndex].harsh;
  }
  
}