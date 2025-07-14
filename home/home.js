// PAGE LOADING

const cache = {
  music: null,
  gallery: null,
  blog: null,
  outfits: null, 
  scrapbook: null
}

// Functions
function cacheData() {
  const fetchAndCache = (key, url, sortFn) => {
    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        return res.json();
      })
      .then(data => {
        cache[key] = sortFn ? data.sort(sortFn) : data;
      })
      .catch(err => {
        console.error(`Error loading ${url}:`, err);
      });
  };

  return Promise.all([
    fetchAndCache('music', '/assets/music.json', (a, b) => new Date(b.date) - new Date(a.date)),
    fetchAndCache('gallery', '/assets/gallery.json', (a, b) => new Date(b.date) - new Date(a.date)),
    fetchAndCache('blog', '/assets/blog.json', (a, b) => new Date(b.date) - new Date(a.date)),
    fetchAndCache('outfits', '/assets/outfits.json', (a, b) => new Date(a.date) - new Date(b.date)), // ascending
    fetchAndCache('scrapbook', '/assets/scrapbook.json', (a, b) => new Date(b.date) - new Date(a.date))
  ]);
}

function loadPage(page) {
  fetch(`./${page}/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;

      switch(page) {
        case 'music':
          musicData = cache.music;
          renderMusicFrames(currentMusicPage);
          break;

        case 'gallery':
          galleryData = cache.gallery;
          galleryViewGrid = true;
          renderGalleryFrames(currentGalleryPage, 'grid');
          setupGalleryButtons();
          break;

        case 'blog':
          blogData = cache.blog;
          renderBlogFrames(currentBlogPage);
          break;

        case 'outfits':
          outfitsData = cache.outfits;
          renderOutfitFrames(currentOutfitIndex);
          break;

        case 'scrapbook':
          scrapbookData = cache.scrapbook;
          scrapbookViewGrid = true;
          renderScrapbookFrames(currentScrapbookPage, 'grid');
          setupScrapbookButtons();
          break;

        case 'home':
          const video = document.getElementById('home-page-video');
          const muteButton = document.getElementById('mute-button');

          if (video && muteButton) {
            muteButton.addEventListener('click', () => {
              video.muted = !video.muted;
              muteButton.classList.toggle('active');
            });
          }
          break;
      }
    });

  window.scrollTo(0, 0);
}



// Listeners

// sets initial page to home page
window.addEventListener('DOMContentLoaded', () => {
  cacheData().then(() => {
    const initialPage = location.hash ? location.hash.substring(1) : 'home';
    loadPage(initialPage);
  });
});