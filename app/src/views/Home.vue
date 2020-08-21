<template>
  <v-app>
    <v-app-bar app flat color="secondary">
      <v-row class="align-center">
        <v-col cols="2" >
          <v-img :src="require('@/assets/logo.png')" aspect-ratio="2" contain/>
        </v-col>
        <v-col cols="8" class="pa-0">
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
                :items="categories"
              ></v-select>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-row class="justify-start align-center ma-4">
        <v-col cols="12" sm="12" md="4" lg="4" v-for="product in products" :key="product.id">
          <Product :product="product"/>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import API from '../services/api'
import Product from '../components/Product'
export default {
  name: 'Home',
  components: {
    Product
  },
  data () {
    return {
      products: []
    }
  },
  computed: {
    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    categories: function () {
      const categories = this.products.map(p => p.category)
      return categories.filter((c, i, array) => array.indexOf(c) === i)
    }
  },
  async mounted () {
    const { data: { products } } = await API.getProducts()
    this.products = products
    console.log('Hooola')
    console.log(products)
  }
}
</script>
