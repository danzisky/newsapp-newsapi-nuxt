<template>
  <v-layout class="overflow-hidden h-screen overflow-hidden">
    <v-app-bar color="green" title="Știri Mondiale" class="sticky"></v-app-bar>

    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Home"
          value="home"
          @click="navTo('/')"
        ></v-list-item>
       <v-list-item
          prepend-icon="mdi-newspaper"
          title="All Stories"
          value="all-stories"
          @click="navTo('/')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-newspaper-check"
          title="Top Headlines"
          value="top-headlines"
          @click="navTo('/top-headlines')"
        ></v-list-item>
         <v-list-item
          prepend-icon="mdi-account"
          title="My Account"
          value="account"
          @click="navTo('/account')"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="h-full overflow-auto" style="min-height: 300px">
      <slot />
    </v-main>
  </v-layout>
</template>
<script setup>
const rail = ref(true);
const drawer = ref(true);

const navTo = async (url) => {
  await navigateTo(url);
};
</script>
