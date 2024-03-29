import Notiflix from 'notiflix';
// Dodatkowy import stylów
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const galerySection = document.querySelector('.gallery');
let searchQuery;
let perPageItems;
let pageSet;
// console.log('asdaas');

const searchParams = new URLSearchParams({
  key: '18941965-072e6ae370689f800c64fac36',
  q: null,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: perPageItems,
  page: pageSet,
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const checkBtn = document.querySelector('.load-more');
  if (checkBtn) {
    checkBtn.remove();
  }

  searchQuery = form.querySelector('input[name="searchQuery"]').value;

  if (searchQuery.trim() !== '') {
    perPageItems = 40;
    pageSet = 1;
    searchParams.set('q', searchQuery);
    searchParams.set('per_page', perPageItems);
    searchParams.set('page', pageSet);

    const URL = `https://pixabay.com/api/?${searchParams}`;

    fetch(URL)
      .then(response => response.json())
      .then(posts => renderPosts(posts))
      .catch(error => {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        // console.log(error);
      });
  } else {
    galerySection.innerHTML = ``;
    perPageItems = 0;
    pageSet = 0;
    searchParams.set('q', searchQuery);
    searchParams.set('per_page', perPageItems);
    searchParams.set('page', pageSet);
    Notiflix.Notify.failure('Please enter a search query.');
  }
});

const renderPosts = posts => {
  galerySection.innerHTML = ``;
  if (posts.total === 0 || searchQuery === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${posts.totalHits} images.`);
    posts.hits.map(val => {
      const html = `<div class="photo-card">
      <a href="${val.largeImageURL}">
      <img src="${val.webformatURL}" alt="${val.tags}" loading="lazy" /></a>
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
      perPageItems += 40;
      searchParams.set('per_page', perPageItems);
      searchParams.set('page', (pageSet += 1));
      const URL = `https://pixabay.com/api/?${searchParams}`;
      fetch(URL)
        .then(response => response.json())
        .then(posts => renderPosts(posts))
        .catch(error => console.log(error));
      loadMoreBtn.remove();
      lightbox.refresh();
    });

    const lightbox = new SimpleLightbox('.photo-card a', {
      captions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
};
