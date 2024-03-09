<template>
  <div class="w-full h-full">
    <v-skeleton-loader :loading="loading" min-height="20rem" class="w-full h-full" type="image, article">
      <v-card
        elevation="0"
        color="green-lighten-4"
        variant="flat"
        class="w-full h-full"
      >
        <v-img :src="newsData.urlToImage" lazy-src="https://picsum.photos/id/870/200/300?grayscale&blur=2" height="16rem" cover></v-img>
        <v-card-item class="max-h-30_" _style="max-height: 2rem">
          <div>
            <div class="text-overline mb-1">
              {{ newsData?.author }}
            </div>
            <div class="text-h6 mb-1">
              {{ newsData.title }}
            </div>
            <div class="text-caption h-full">{{ newsData.description }}</div>
          </div>
        </v-card-item>

        <v-card-actions class="absolute_ bottom-0 right-0 bg-white_bg-opacity-60_rounded-tl-md" style="z-index: 8000!important">
          <a :href="newsData.url" target="_blank">
            <v-chip label color="green">
              Read more...
            </v-chip>
          </a>

        </v-card-actions>
      </v-card>
      <!-- <v-responsive>
        <v-list-item :subtitle="newsData.author" :title="newsData.title" class="px-0"></v-list-item>
        <v-list-item :subtitle="newsData.description" class="px-0">
          <template #title>
            <a variant="text" color="primary" :href="newsData.url" target="_blank">Read more</a>
          </template>
        </v-list-item>
      </v-responsive> -->
    </v-skeleton-loader>
  </div>
</template>
<script setup>
const props = defineProps({
  newsData: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>

</style>