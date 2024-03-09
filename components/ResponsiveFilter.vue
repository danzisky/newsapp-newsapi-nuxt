<template>
  <div class="md:w-full relative">
    <div v-if="!mdAndUp" class="fixed bottom-[7rem] right-0">
      <v-btn v-if="!mdAndUp" size="x-large" icon="mdi-filter" variant="flat" color="green">
        <v-icon>mdi-filter</v-icon>
        <v-dialog activator="parent" class="w-full max-w-4xl">
          <template v-slot:default="{ isActive }">
            <v-card>
              <NewsFilter class="w-full sticky" />
              <template v-slot:actions>
                <v-btn
                  color="green"
                  class="ml-auto"
                  text="Close"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
    </div>
    <NewsFilter v-else class="w-full sticky" />
  </div>
</template>
<script setup>
import { useDisplay } from 'vuetify'

  // Destructure only the keys you want to use
  const { mdAndUp } = useDisplay()
</script>