// BLOG

// Variables
let blogData = [];
let currentBlogPage = 1;
let blogItemsPerPage = 2;

// Functions
function nextBlogPage() {
  blogLength = blogData.length;
  itemsOnNextPage = blogLength - (currentBlogPage * blogItemsPerPage);
  if (itemsOnNextPage > 0) {
    currentBlogPage++;
    renderBlogFrames(currentBlogPage);
  }
}
function prevBlogPage() {
  if (currentBlogPage > 1) {
    currentBlogPage--;
    renderBlogFrames(currentBlogPage);
  }
}
function renderBlogFrames(page) {
  const container = document.getElementById('blog-container');
  container.innerHTML = '';

  const pageSelectContainer = document.getElementById('blog-page-select-container');
  pageSelectContainer.innerHTML = '';

  const start = (page - 1) * blogItemsPerPage;
  const end = page * blogItemsPerPage;
  const pageItems = blogData.slice(start, end);

  // render =<2 blog frames on page
  pageItems.forEach((blog, index) => {
    const globalIndex = start + index;

    const frame = document.createElement('div');
    frame.className = 'pink-metallic blog-frame';
    frame.innerHTML = `
      <div class="date">${blog.date}</div>
      <div class="inner-text blog-text">
          <h3>${blog.title}</h3>
          <p style="white-space: pre-line;">${blog.text}</p>
      </div>
    `;
    frame.dataset.index = globalIndex;

    container.appendChild(frame);
  });

  // add page select buttons
  pageSelectContainer.innerHTML = `
    <button id="blog-prev-button" class="left toggle-button big-prev-button"></button>
    <button id="blog-next-button" class="right toggle-button big-next-button"></button>
  `;

  // add click listeners for buttons
  const prevButton = document.getElementById('blog-prev-button');
  const nextButton = document.getElementById('blog-next-button');

  prevButton.addEventListener('click', prevBlogPage);
  nextButton.addEventListener('click', nextBlogPage);

  const totalPages = Math.ceil(blogData.length / blogItemsPerPage);

  if (currentBlogPage === 1) { prevButton.disabled = true; }
  if (currentBlogPage === totalPages) { nextButton.disabled = true; }
}