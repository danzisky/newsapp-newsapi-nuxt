import { NewsAPIService } from "../utils/newsApiService"

// define news type
interface NewsType {
  author?: string
  source: { id: string|null, name: string }
  title: string
  description?: string
  url?: string
  urlToImage?: string
}
export { type NewsType };

interface SourceType {
  id: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
}

interface NewsData {
  items: NewsType[]
  totalItems: Number
  page: Number
  pages: Number
}
interface SourceData {
  items: SourceType[]
  totalItems: Number
  page: Number
  pages: Number
}

// const runtimeConfig = useRuntimeConfig().public
const newsApi = new NewsAPIService('80f3266e5aa04d96a18e2568769ed44d');

export const useNewsStore = defineStore('news', {
  state: () => ({
    apiKey: process.env.NEWS_API_KEY,
    news: {
      items: [] as NewsType[],
      totalItems: 0,
      page: 1,
      pages: 0,
    } as NewsData,
    headlines: {
      items: [] as NewsType[],
      totalItems: 0,
      page: 1,
      pages: 0,
    } as NewsData,
    sources: {
      items: [] as SourceType[],
      totalItems: 0,
      page: 1,
      pages: 0,
    } as SourceData,
  }),

  actions: {
    async fetchTopHeadlines(options?: { country?: string, category?: any, pageSize?: number, page?: number }) {
      let { country, category, pageSize, page } = options ?? {};
      country = country || 'ro';
      pageSize = pageSize || 20;
      page = page || 1;
      const res = await newsApi.getTopHeadlines(country, category, pageSize, page);
      this.headlines.items = res.articles;
      this.headlines.totalItems = res.totalResults;
      this.headlines.pages = Math.ceil(res.totalResults / pageSize);
      this.headlines.page = page
    },

    async searchNews(options?: { query?: string, language?: string, fromDate?: any, toDate?: any, pageSize?: number, page?: number }) {
      let { query, language, fromDate, toDate, pageSize, page } = options ?? {};
      pageSize = pageSize || 20;
      page = page || 1;
      const res = await newsApi.searchNews(query, language, fromDate || null, toDate || null, pageSize, page);
      this.news = res.articles;
      this.news.totalItems = res.totalResults;
      this.news.pages = Math.ceil(res.totalResults / pageSize);
      this.news.page = page
    },

    async fetchSources(category = null, language = 'en') {
      const res = await newsApi.getSources(category, language);
      this.sources = res.sources;
      this.sources.totalItems = res.sources?.length ?? 0;
      this.sources.pages = Math.ceil((res.sources?.length ?? 0) / 20);
      this.sources.page = 1
    },
  },
})