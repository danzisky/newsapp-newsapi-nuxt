export class NewsAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://newsapi.org/v2';
  }

  async getTopHeadlines(country = 'us', category = null, pageSize = 20, page = 1) {
    let url = `${this.apiUrl}/top-headlines?country=${country}&apiKey=${this.apiKey}&pageSize=${pageSize}&page=${page}`;
    if (category) {
      url += `&category=${category}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      return [];
    }
  }

  async searchNews(query, language = 'en', fromDate = null, toDate = null, pageSize = 20, page = 1) {
    let url = `${this.apiUrl}/everything?q=${query}&language=${language}&apiKey=${this.apiKey}&pageSize=${pageSize}&page=${page}`;

    if (fromDate) {
      url += `&from=${fromDate}`;
    }
    if (toDate) {
      url += `&to=${toDate}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching news:', error);
      return [];
    }
  }

  async getSources(category = null, language = 'en') {
    let url = `${this.apiUrl}/sources?language=${language}&apiKey=${this.apiKey}`;
    if (category) {
      url += `&category=${category}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching sources:', error);
      return [];
    }
  }
}