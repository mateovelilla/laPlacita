<template>
  <v-app>
    <v-app-bar app flat color="secondary">
      <v-row>
        <v-col cols="2">
          <v-img
            alt="Vuetify Logo"
            contain
            :src="require('@/assets/logo.png')"
            transition="scale-transition"
            width="100"
          />
        </v-col>
        <v-col cols="8" class="d-flex align-center">
          <v-autocomplete
            light
            append-icon="search"
            hide-details
            solo
            flat
          >
            <template v-slot:prepend-inner>
              <v-select
                solo
                class="category"
                label="Category"
                hide-details
                flat
                color="white"
                light
              ></v-select>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container fluid class="fill-height ma-0 pa-0">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import API from '../services/api'
export default {
  name: 'Home',
  async mounted () {
    console.log('Hola mundo')
    const { data: { products } } = await API.getProducts()
    console.log(products)
  }
}
</script>
