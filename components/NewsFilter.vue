<template>
  <div class="w-full">
    <v-card color="green-darken-2" variant="tonal" class="w-full">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">
            {{ 'News App' }}
          </div>
          <div class="text-h6 mb-1">Filter</div>
          <div class="text-caption">Filter cases by title and date</div>
        </div>
      </v-card-item>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            name="keyword"
            variant="outlined"
            v-model="filter.q"
            label="Keyword"
          ></v-text-field>

          <v-text-field
            name="dateFrom"
            variant="outlined"
            v-model="filter.dateFrom"
            type="date"
            label="Date From"
          ></v-text-field>

          <v-text-field
            name="dateTo"
            variant="outlined"
            v-model="filter.dateTo"
            type="date"
            label="Date To"
          ></v-text-field>
          <v-divider class="my-2"></v-divider>
          <!-- <div>
            <v-title>Countries</v-title>
            <v-chip-group
              v-model="filter.country"
              column
            >
              <v-chip
                v-for="(country, index) in newsStore.countries"
                :key="index"
                variant="tonal"
                label
                filter
              >
                {{  country  }}
              </v-chip>
            </v-chip-group>
          </div> -->
          <v-divider class="my-2"></v-divider>
          <div>
            <v-title>Languages</v-title>
            <v-chip-group
              v-model="filter.language"
              column
            >
              <v-chip
                v-for="(language, index) in newsStore.languages"
                :key="index"
                variant="tonal"
                label
                filter
              >
                {{  language  }}
              </v-chip>
            </v-chip-group>
          </div>
          <v-divider class="my-2"></v-divider>
          <div>
            <v-title>Categories</v-title>
            <v-chip-group
              v-model="filter.category"
              column
            >
              <v-chip
                v-for="(category, index) in newsStore.categories"
                :key="index"
                variant="tonal"
                label
                filter
              >
                {{  category  }}
              </v-chip>
            </v-chip-group>
          </div>
          <div>
            <v-title>Sort By</v-title>
            <v-chip-group
              v-model="filter.sortBy"
              column
            >
              <v-chip
                v-for="(sortBy, index) in newsStore.sortColumns"
                :key="index"
                variant="tonal"
                label
                filter
              >
                {{  sortBy  }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn append-icon="mdi-filter" @click="appyFilters"> Apply Filters </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script setup>
  const newsStore = useNewsStore()
  const filter = reactive({
    q: "",
    dateFrom: "",
    dateTo: "",
    sortBy: null,
    country: null,
    category: null,
    language: newsStore.languages?.indexOf('en'),
  })

  const appyFilters = () => {
    try {
      newsStore.lastFilter = filter
      if(newsStore.domain == "headlines") {
        newsStore.fetchTopHeadlines(newsStore.filterData('headlines', filter))
      } else {
        newsStore.searchNews(newsStore.filterData('news', filter))
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong! Please try again.')
    }
  }
</script>
