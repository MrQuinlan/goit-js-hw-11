import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';

export default class SearchApi {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  getPhoto() {
    const params = {
      key: '25737469-5e8bfc7bf6c680f39c339b92a',
      q: `${this.query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${this.page}`,
      per_page: 24,
    };

    const response = axios(`${BASE_URL}/`, { params });
    this.incrementPage();
    return response;
  }

  get getQuery() {
    return this.query;
  }

  set setQuery(newQuery) {
    this.query = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  resetQuery() {
    this.query = '';
  }
}
