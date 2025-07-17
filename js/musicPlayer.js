// MUSIC PLAYER

let isPlaying = true;
let currentSong = new Audio();
let playlists = {};
let track_list = [];
let track_index = 0;

// Variables
const playlistSelect = document.getElementById("playlist-select");
const songTitle = document.getElementById("song-title");
const prevTrackButton = document.getElementById("previous-track");
const playPauseTrackButton = document.getElementById("play-pause-track");
const nextTrackButton = document.getElementById("next-track");

// Functions
function loadTrack(index) {
  if (track_list.length === 0) return; 

  currentSong.src = track_list[index].path;
  document.getElementById('song-title').textContent = String(index + 1) + ". " + track_list[index].name;
  currentSong.load();
}

function playPauseTrack() {
  if (isPlaying) {
    currentSong.pause();
    isPlaying = !isPlaying;
    playPauseTrackButton.innerHTML = '<img src="/assets/images/play.png">';
  } else {
    currentSong.play();
    isPlaying = !isPlaying;
    playPauseTrackButton.innerHTML = '<img src="/assets/images/pause.png">';
  }
}

function nextTrack() {
  if (track_index < track_list.length - 1) {
    track_index++;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  currentSong.play();
  playPauseTrackButton.innerHTML = '<img src="/assets/images/pause.png">';
  isPlaying = true;
}

function previousTrack() {
  if (track_index > 0) {
    track_index--;
  } 
  loadTrack(track_index);
  currentSong.play();
  playPauseTrackButton.innerHTML = '<img src="/assets/images/pause.png">';
  isPlaying = true;
}

function changePlaylist() {
  const selected = playlistSelect.value;
  track_list = playlists[selected];
  track_index = 0;
  songTitle.textContent = track_list[0].name;
  loadTrack(track_index);
  playPauseTrack();
}


fetch("/assets/mixtapes.json")
  .then(response => response.json())
  .then(data => {
    playlists = data;

    for (let playlistName in playlists) {
      const option = document.createElement("option");
      option.value = playlistName;
      option.textContent = playlistName;
      playlistSelect.appendChild(option);
    }

    // Set default playlist and song title
    const numPlaylists = Object.keys(playlists).length;
    const firstPlaylist = Object.keys(playlists)[numPlaylists - 1];
    if (firstPlaylist) {
      playlistSelect.value = firstPlaylist;
      track_list = playlists[firstPlaylist];
      track_index = 0;
      songTitle.textContent = String(track_index + 1) + ". " + track_list[0].name;
      loadTrack(track_index);
      isPlaying = false;
    }
  });

// Listeners
playlistSelect.addEventListener("change", changePlaylist);
prevTrackButton.addEventListener('click', previousTrack);
playPauseTrackButton.addEventListener('click', playPauseTrack);
nextTrackButton.addEventListener('click', nextTrack);
currentSong.addEventListener('ended', nextTrack);