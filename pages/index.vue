<template>
  <div>Main Content {{ runtimeConfig.newsapiApiKey }}</div>
</template>
<script setup>
import NewsAPI from "newsapi"
import { NewsAPIService } from "../utils/newsApiService"
const runtimeConfig = useRuntimeConfig().public

const newsapi = new NewsAPIService(runtimeConfig.newsapiApiKey);

const articles = ref([]);

const topHeadlines = ref([]);
const sources = ref([]);
let searchQuery = ref("tesla");

const fetchTopHeadlines = async () => {
  const response = await newsapi.getTopHeadlines("en", "business");
  // return response.articles;
  console.log(response);
};


const fetchSources = async () => {
  const response = await newsapi.getSources("bitcoin");
  // return response.sources;
  console.log(response);
};

const fetchArticles = async () => {
    const response = await newsapi.searchNews(searchQuery.value, "en");
  // return response.articles;
  console.log(response);
};

// const fetchTopHeadlines = async () => {
//   const response = await newsapi.v2.topHeadlines({
//     country: "us",
//     category: "business",
//   });
//   // return response.articles;
//   console.log(response);
// };


// const fetchSources = async () => {
//   const response = await newsapi.v2.sources({
//     language: "en",
//   });
//   // return response.sources;
//   console.log(response);
// };

// const fetchArticles = async () => {
//   const response = await newsapi.v2.everything({
//     q: searchQuery.value,
//     language: "en",
//   });
//   // return response.articles;
//   console.log(response);
// };

onMounted(()=> {
  fetchTopHeadlines();
  fetchSources();
  fetchArticles();
});
</script>