<template>
  <v-layout class="overflow-hidden h-full">
    <v-app-bar color="green" title="Știri Mondiale"></v-app-bar>

    <!-- <v-navigation-drawer>
      <v-list>
        <v-list-item title="Drawer left"></v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <slot/>
    </v-main>
  </v-layout>
</template>