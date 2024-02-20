// API:18941965-072e6ae370689f800c64fac36

const form = document.querySelector('.search-form');

const searchParams = new URLSearchParams({
  key: '18941965-072e6ae370689f800c64fac36',
  q: null,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchQuery = form.querySelector('input[name="searchQuery"]').value;

  searchParams.set('q', searchQuery);
  const URL = `https://pixabay.com/api/?${searchParams}`;
  fetch(URL)
    .then(response => response.json())
    .then(posts => console.log(posts))
    .catch(error => console.log(error));
});
