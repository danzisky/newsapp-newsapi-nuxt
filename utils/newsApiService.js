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
      return data.articles;
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
      return data.articles;
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
      return data.sources;
    } catch (error) {
      console.error('Error fetching sources:', error);
      return [];
    }
  }
}

/* // Example usage:
const apiKey = '80f3266e5aa04d96a18e2568769ed44d'; // Replace with your NewsAPI API key
const newsService = new NewsAPIService(apiKey); */

// Get top headlines
/* newsService.getTopHeadlines('us', 'technology', 10, 1)
  .then(articles => {
    console.log('Top technology headlines:', articles);
  })
  .catch(error => {
    console.error('Error getting top headlines:', error);
  });

// Search news
newsService.searchNews('tesla', 'en', '2024-01-01', '2024-02-01', 10, 1)
  .then(articles => {
    console.log('Bitcoin news:', articles);
  })
  .catch(error => {
    console.error('Error searching news:', error);
  });

// Get sources
newsService.getSources('business', 'en')
  .then(sources => {
    console.log('Business news sources:', sources);
  })
  .catch(error => {
    console.error('Error getting sources:', error);
  }); */
