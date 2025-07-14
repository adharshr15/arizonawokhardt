// PAGE LOADING

const cache = {
  music: null,
  gallery: null,
  blog: null,
  outfits: null, 
  scrapbook: null
}

// Functions
function loadPage(page) {
  fetch(`./${page}/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;

      switch(page) {
        case 'music':
          if (cache.music) {
            // Use cached data
            musicData = cache.music;
            renderMusicFrames(currentMusicPage);
          } else {
            fetch("assets/music.json")
              .then(res => {
                if (!res.ok) throw new Error('Failed to fetch music.json');
                return res.json();
              })
              .then(data => {
                musicData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                cache.music = musicData; // Cache the data
                renderMusicFrames(currentMusicPage);
              })
              .catch(err => {
                console.error('Error loading music.json:', err);
              });
          }
          break;

        case 'gallery':
          if (cache.gallery) {
            galleryData = cache.gallery;
            galleryViewGrid = true;
            renderGalleryFrames(currentGalleryPage, 'grid');
            setupGalleryButtons();
          } else {
            fetch('/assets/gallery.json')
              .then(res => {
                if (!res.ok) throw new Error('Failed to fetch gallery.json');
                return res.json();
              })
              .then(data => {
                galleryData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                cache.gallery = galleryData; // Cache the data

                galleryViewGrid = true;
                renderGalleryFrames(currentGalleryPage, 'grid');
                setupGalleryButtons();
              })
              .catch(err => {
                console.error('Error loading gallery.json:', err);
              });
          }
          break;

        case 'blog':
          if (cache.blog) {
            blogData = cache.blog;
            renderBlogFrames(currentBlogPage);
          } else {
            fetch('/assets/blog.json')
              .then(res => {
                if (!res.ok) throw new Error('Failed to fetch blog.json');
                return res.json();
              })
              .then(data => {
                blogData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                cache.blog = blogData; // Cache the data
                renderBlogFrames(currentBlogPage);
              })
              .catch(err => {
                console.error('Error loading blog.json:', err);
              });
          }
          break;

        case 'outfits':
          if (cache.outfits) {
            outfitsData = cache.outfits;
            renderOutfitFrames(currentOutfitIndex);
          } else {
            fetch('/assets/outfits.json')
              .then(res => {
                if (!res.ok) throw new Error('Failed to fetch outfits.json');
                return res.json();
              })
              .then(data => {
                outfitsData = data.sort((a, b) => new Date(a.date) - new Date(b.date)); // ascending
                cache.outfits = outfitsData; // Cache the data
                renderOutfitFrames(currentOutfitIndex);
              })
              .catch(err => {
                console.error('Error loading outfits.json:', err);
              });
          }
          break;

          case 'home':
            const video = document.getElementById('home-page-video');
            const muteButton = document.getElementById('mute-button');

            if (video && muteButton) {
              muteButton.addEventListener('click', () => {
                video.muted = !video.muted;
                muteButton.classList.toggle('active');
                // muteButton.textContent = video.muted ? 'X' : ')))';
              });
            }
            break;


        case 'scrapbook':
          if (cache.scrapbook) {
            scrapbookData = cache.scrapbook;
            scrapbookViewGrid = true;
            renderScrapbookFrames(currentScrapbookPage, 'grid');
            setupScrapbookButtons();
          } else {
            fetch('/assets/scrapbook.json')
              .then(res => {
                if (!res.ok) throw new Error('Failed to fetch scrapbook.json');
                return res.json();
              })
              .then(data => {
                scrapbookData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                cache.scrapbook = scrapbookData; // Cache the data

                scrapbookViewGrid = true;
                renderScrapbookFrames(currentScrapbookPage, 'grid');
                setupScrapbookButtons();
              })
              .catch(err => {
                console.error('Error loading scrapbook.json:', err);
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
  const initialPage = location.hash ? location.hash.substring(1) : 'home';
  loadPage(initialPage);
});