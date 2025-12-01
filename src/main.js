import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(formEl);
  const query = (formData.get('search-text') || '').trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
      timeout: 2500,
    });
    return;
  }

  showLoader();
  clearGallery();

  try {
    const data = await getImagesByQuery(encodeURIComponent(query));

    const { hits = [] } = data;

    if (!hits.length) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        messageColor: '#fafafb',
        messageSize: '16',
        backgroundColor: '#ef4040',
        progressBarColor: '#b51b1b',
        timeout: 3000,
        maxWidth: 432,
      });
      return;
    }

    createGallery(hits);

    iziToast.success({
      title: 'Success',
      message: `Found ${hits.length} images for "${query}".`,
      position: 'topRight',
      timeout: 2000,
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 3000,
    });
      
  } finally {
    hideLoader();
    formEl.reset();
  }
});
