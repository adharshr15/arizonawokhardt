// MUSIC

// Variables
let musicData = [];
let currentMusicPage = 1;
let currentMusicIndex = 1;
let musicItemsPerPage = 10;

// Functions
function nextMusicPage() {
  const musicLength = musicData.length;
  const itemsOnNextPage = musicLength - (currentMusicPage * musicItemsPerPage); 
  if (itemsOnNextPage > 0) {
    currentMusicPage++;
    renderMusicFrames(currentMusicPage); 
  }
}
function prevMusicPage() {
  if (currentMusicPage > 1) {
    currentMusicPage--; 
    renderMusicFrames(currentMusicPage);
  }
}
function playMusicFromFrame(index) {
  // Change to Music Playlist, setting song index to currentMusicIndex
  const selected = "Music";
  playlistSelect.value = selected;
  track_list = playlists[selected];
  track_index = index;
  songTitle.textContent = track_list[index].name;
  loadTrack(track_index);
  currentSong.play();
  playPauseTrackButton.innerHTML = '<img src="/assets/images/pause.png">';
  isPlaying = true;
}

function renderMusicFrames(page) {
    const container = document.getElementById('music-container');
    container.innerHTML = '';

    const pageSelectContainer = document.getElementById('music-page-select-container');
    pageSelectContainer.innerHTML = '';

    const start = (page - 1) * musicItemsPerPage;
    const end = page * musicItemsPerPage;
    const pageItems = musicData.slice(start, end);

    // create the <=10 frames for the current page
    pageItems.forEach((track, index) => {
        const globalIndex = start + index;

        const frame = document.createElement('div');
        frame.className = 'pink-metallic';

        // if track index is even, make left frame
        if (globalIndex % 2 == 0) {
          frame.className += ' music-frame-left';
            frame.innerHTML = `
                <a onClick='playMusicFromFrame(${globalIndex})' target="_blank" rel="noopener noreferrer"><img class='cover-art-left' src="${track.art}" style="cursor: pointer;"></a>
                <div id='inner-right' class="inner-text inner-right">
                    <h3>${track.song}</h3>
                    <p class='date'>${track.date}</p>
                    <p class='description'>${track.description}</p>
                </div>
            `;
        } else {
          frame.className += ' music-frame-right';
            frame.innerHTML = `
                <div id='inner-left' class="inner-text inner-left">
                    <h3>${track.song}</h3>
                    <p class='description'>${track.description}</p>
                    <p class='date'>${track.date}</p>
                </div>
                <a onClick='playMusicFromFrame(${globalIndex})' target="_blank" rel="noopener noreferrer"><img class='cover-art-right' src="${track.art}" style="cursor: pointer;"></a>
            `;
        }

        container.appendChild(frame);
    });

    // add page select buttons
    pageSelectContainer.innerHTML = `
      <button id="music-prev-button" class="left toggle-button grid-prev-button"></button>
      <button id="music-next-button" class="right toggle-button grid-next-button"></button>
    `;

    // add click listeners for buttons
    const prevButton = document.getElementById('music-prev-button');
    const nextButton = document.getElementById('music-next-button');

    prevButton.addEventListener('click', prevMusicPage);
    nextButton.addEventListener('click', nextMusicPage);

    // disable buttons for first and last page
    const totalPages = Math.ceil(musicData.length / musicItemsPerPage);

    if (currentMusicPage === 1) { prevButton.disabled = true; }
    if (currentMusicPage === totalPages) { nextButton.disabled = true; }
}