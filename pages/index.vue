<template>
  <div class="p-8 w-5/6_ flex justify-center items-start gap-4 relative">
    <div class="w-full">
      <div v-if="!newsStore.loading.news && !newsStore.news.items" class>
        <v-alert text="There are no items to be displayed" type="info"></v-alert>

      </div>
      <div v-else class="grid grid-cols-3 gap-6 w-full justify-items-stretch">
        <NewsCard
          v-for="(headline, index) in newsStore.news.items"
          :key="index"
          :news-data="headline"
          :loading="!newsStore.loading.news"
          class="w-full h-full"
        ></NewsCard>
      </div>
      <template>
        <div class="text-center pt-16">
          <v-pagination
            color="green"
            v-model="newsStore.news.page"
            :length="newsStore.news.pages"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            total-visible="7"
            @update:model-value="changePage"
          ></v-pagination>
        </div>
      </template>
    </div>
    <div class="basis-1/3 relative h-full">
      <NewsFilter class="w-full sticky" />
    </div>
  </div>
</template>
<script setup>
import NewsAPI from "newsapi";
import { NewsAPIService } from "../utils/newsApiService";

const runtimeConfig = useRuntimeConfig().public;
const newsStore = useNewsStore();
const changePage = (page) => {
  const filters = {
    ...newsStore.filterData("news", newsStore.lastFilter),
    language: "en",
    pageSize: 9,
    page: page,
  };
  newsStore.searchNews(
    filters
  );
};
onMounted(() => {
  newsStore.searchNews({
    language: "en",
    pageSize: 9,
  });
});
</script>
