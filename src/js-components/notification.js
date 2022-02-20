import { Notify } from 'notiflix/build/notiflix-notify-aio';

export { onSuccess, onFailure, notification };

function onSuccess(message) {
  Notify.success(`Hooray! We found ${message} images.`);
}

function onFailure() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function notification() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

Notify.init({
  width: '425px',
  fontSize: '24px',
  timeout: 3000,
  borderRadius: '10px',
});
