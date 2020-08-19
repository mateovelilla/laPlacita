<template>
  <v-app>
    <v-app-bar
      app
      flat
      color="secondary"
    >
      <v-row>
        <v-col cols="2">
          <v-img
            alt="Vuetify Logo"
            class="mr-2"
            contain
            :src="require('@/assets/logo.png')"
            transition="scale-transition"
            width="100"
          />
        </v-col>
        <v-col cols="8" class="pl-0 d-flex align-center">
          <v-text-field
            light
            append-icon="search"
            hide-details
            solo
            flat
          >
            <template v-slot:prepend-inner>
              <v-select
                label="Category"
                hide-details
                flat
                color="white"
                light
              ></v-select>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
