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
    languages: [ // ardeenesfrheitnlnoptrusvudzh.
      'ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'ud', 'zh'
    ],  
    countries: [ //aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza
      'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
    ],
    categories: [
      'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
    ],
    sortColumns: [
      'publishedAt', 'relevancy', 'popularity'
    ],
    loading: {
      news: false,
      headlines: false,
      sources: false
    },
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
    lastFilter: {}
  }),

  actions: {
    async fetchTopHeadlines(options?: { country?: string, category?: any, pageSize?: number, page?: number }) {
      let { country, category, pageSize, page } = options ?? {};
      country = country || 'ro';
      pageSize = pageSize || 9;
      page = page || 1;
      this.loading.headlines = true;
      const res = await newsApi.getTopHeadlines(country, category, pageSize, page);
      this.headlines.items = res.articles;
      this.headlines.totalItems = res.totalResults;
      this.headlines.pages = Math.ceil(res.totalResults / pageSize);
      this.headlines.page = page
      this.loading.headlines = false;
    },

    async searchNews(options?: { query?: any, language?: string, fromDate?: any, toDate?: any, sortBy?: any, pageSize?: number, page?: number }) {
      let { query, language, fromDate, toDate, sortBy, pageSize, page } = options ?? {};
      query = query || null;
      pageSize = pageSize || 9;
      page = page || 1;
      this.loading.news = true;
      const res = await newsApi.searchNews(query, language, fromDate, toDate, sortBy, pageSize, page);
      this.news.items = res.articles;
      this.news.totalItems = res.totalResults;
      this.news.pages = Math.ceil(res.totalResults / pageSize);
      this.news.page = page
      this.loading.news = false;
    },

    async fetchSources(category = null, language = 'en') {
      this.loading.sources = true;
      const res = await newsApi.getSources(category, language);
      this.sources = res.sources;
      this.sources.totalItems = res.sources?.length ?? 0;
      this.sources.pages = Math.ceil((res.sources?.length ?? 0) / 9);
      this.sources.page = 1
      this.loading.sources = false;
    },
    filterData(type: string, filter: any) {
      let filterStructure;
      const country = this.countries[filter?.country] ?? null
      const category = this.categories[filter?.category] ?? null
      const language = this.languages[filter?.language] ?? null
      const sortBy = this.sortColumns[filter?.sortBy] ?? null
      if(type === 'news') {
        filterStructure = {
          query: filter.q,
          language: language,
          category: category,
          fromDate: filter.dateFrom,
          toDate: filter.dateTo,
          sortBy: sortBy
        }
      }
      else if(type === 'sources') {
        filterStructure = {
          category: category,
          language: language
        }
      }
      else if(type === 'headlines') {
        filterStructure = {
          country: country,
          category: category
        }
      }
      return filterStructure
    }
  },
})