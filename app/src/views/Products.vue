<template>
  <v-row>
    <v-col cols="3" v-for="product in products" :key="product.id">
      <Product :product="product"/>
    </v-col>
  </v-row>
</template>
<script>
import API from '../services/api'
import Product from '../components/product'
export default {
  components: {
    Product
  },
  data () {
    return {
      products: []
    }
  },
  async mounted () {
    const { data: { products } } = await API.getProducts()
    this.products = products
  }
}
</script>
