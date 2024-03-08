<template>
  <div class="p-8 max-w-7xl">
    <div class="grid grid-cols-3 gap-6 w-full justify-items-stretch">
      <NewsCard v-for="(headline, index) in newsStore.headlines.items" :key="index" :news-data="headline" :loading="!newsStore.headlines.totalItems" class="w-full h-full"></NewsCard>
    </div>
    <template>
    <div class="text-center py-16">
      <v-pagination
        color="green"
        v-model="newsStore.headlines.page"
        :length="newsStore.headlines.pages"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      ></v-pagination>
    </div>
</template>
  </div>
</template>
<script setup>
import NewsAPI from "newsapi"
import { NewsAPIService } from "../utils/newsApiService"

const runtimeConfig = useRuntimeConfig().public
const newsStore = useNewsStore()

onMounted(()=> {
  newsStore.fetchTopHeadlines({
    country: "us",
    pageSize: 9,
  })
});
</script>