import 'simplelightbox/dist/simple-lightbox.min.css';
import { onSuccess, onFailure, notification } from './js-components/notification';
import debounce from 'lodash.debounce';
import renderCards from './js-components/render-cards';
import SimpleLightbox from 'simplelightbox';
import SearchPhotoApi from './js-components/search-api';

const refs = {
  form: document.querySelector('#search-form'),
  btn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  marker: document.querySelector('.marker'),
};

const scrollOptions = {
  rootMargin: '300px',
  threshold: 0,
};

const DEBOUNCE_DELAY = 300;
const lightbox = new SimpleLightbox('.gallery a');
const photoApi = new SearchPhotoApi();
const observer = new IntersectionObserver(onScroll, scrollOptions);

// =================================================================

async function onInput(event) {
  await photoApi.resetQuery();
  photoApi.setQuery = event.target.value.trim();
}

// =================================================================

async function onSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  refs.form.reset();

  await photoApi.resetPage();

  if (!photoApi.getQuery) {
    return onFailure();
  }

  const imgArr = (await photoApi.getPhoto()).data;

  if (imgArr.hits.length === 0) {
    return onFailure();
  }

  onSuccess(imgArr.totalHits);

  await renderCards(refs.gallery, imgArr);

  observer.observe(refs.marker);

  lightbox.refresh();
}

// =================================================================

function onScroll(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }

    const newPhotos = photoApi.getPhoto();

    newPhotos.then(resp => {
      if (Math.ceil(resp.data.totalHits / 24) + 1 === photoApi.page) {
        observer.unobserve(refs.marker);
        notification();
      }

      renderCards(refs.gallery, resp.data);
    });

    lightbox.refresh();
  });
}

// =================================================================

refs.form.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
refs.btn.addEventListener('click', onSubmit);
