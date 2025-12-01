import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, hideLoadMoreButton, showLoadMoreButton } from './js/render-functions.js';

const formEl = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

formEl.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(formEl);
  query = (formData.get('search-text') || '').trim();

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
  hideLoadMoreButton();
  page = 1;

  try {
    const data = await getImagesByQuery(encodeURIComponent(query), page);

    const { hits = [], totalHits: total = 0 } = data;
    totalHits = total;

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
    showLoadMoreButton();

    iziToast.success({
      title: 'Success',
      message: `Found ${totalHits} images for "${query}".`,
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

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(encodeURIComponent(query), page);
    const { hits = [] } = data;

    createGallery(hits);

    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
});