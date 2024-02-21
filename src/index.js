import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const galerySection = document.querySelector('.gallery');
let perPageItems = 5;
const searchParams = new URLSearchParams({
  key: '18941965-072e6ae370689f800c64fac36',
  q: null,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: perPageItems,
  page: 1,
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchQuery = form.querySelector('input[name="searchQuery"]').value;

  searchParams.set('q', searchQuery);
  const URL = `https://pixabay.com/api/?${searchParams}`;

  fetch(URL)
    .then(response => response.json())
    .then(posts => renderPosts(posts))
    .catch(error => console.log(error));
});

const renderPosts = posts => {
  galerySection.innerHTML = ``;
  if (posts.total === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${perPageItems} images.`);
    posts.hits.map(val => {
      const html = `<div class="photo-card">
      <img src="${val.largeImageURL}" alt="${val.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b>
          ${val.likes}
        </p>
        <p class="info-item">
          <b>Views:</b>
          ${val.views}
        </p>
        <p class="info-item">
          <b>Comments:</b>
          ${val.comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b>
          ${val.downloads}
        </p>
      </div>
    </div>
    `;

      galerySection.insertAdjacentHTML('afterbegin', html);
    });
    const loadMore = `<button type="button" class="load-more">Load more</button>`;

    galerySection.insertAdjacentHTML('afterend', loadMore);
    const loadMoreBtn = document.querySelector('.load-more');

    loadMoreBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log(e.target);
      searchParams.set('per_page', perPageItems + 10);
    });
  }
};
