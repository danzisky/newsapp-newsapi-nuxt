<template>
  <div class="p-8 w-5/6_ flex justify-center items-start gap-4 relative">
    <div class="w-full">
      <div v-if="!newsStore.loading.headlines && !newsStore.headlines.items" class="w-max_">
        <v-alert variant="tonal" text="There are no items to be displayed. Please make sure you haven't exceeded api limits" type="info"></v-alert>

      </div>
      <div v-else class="grid grid-cols-3 gap-6 w-full justify-items-stretch">
        <NewsCard
          v-for="(headline, index) in newsStore.headlines.items"
          :key="index"
          :news-data="headline"
          :loading="newsStore.loading.headlines"
          class="w-full h-full"
        ></NewsCard>
      </div>
      <div>
        <div class="text-center pt-16">
          <v-pagination
            v-if="newsStore.loading.headlines || newsStore.headlines.items"
            color="green"
            v-model="newsStore.headlines.page"
            :length="newsStore.headlines.pages"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            total-visible="7"
            @update:model-value="changePage"
          ></v-pagination>
        </div>
      </div>
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
    ...newsStore.filterData("headlines", newsStore.lastFilter),
    language: "en",
    pageSize: 9,
    page: page,
  };
  newsStore.fetchTopHeadlines(
    filters
  );
};
onMounted(() => {
  newsStore.domain = "headlines"
  newsStore.fetchTopHeadlines({
    language: "en",
    pageSize: 9,
  });
});
</script>
