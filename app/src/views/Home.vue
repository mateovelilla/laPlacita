<template>
  <div>
    <v-app-bar flat color="secondary">
      <v-row class="align-center">
        <v-col cols="2" >
          <v-img :src="require('@/assets/logo.png')" aspect-ratio="2" contain/>
        </v-col>
        <v-col cols="8" class="pa-0">
          <div class="d-flex">
            <v-select
              v-model="selectedCategory"
              solo
              class="rounded-r-0"
              label="Category"
              hide-details
              flat
              color="white"
              light
              :items="categories"
              style="max-width:40%;"
              item-text="t"
              item-value="v"
            >
            </v-select>
            <v-text-field
              v-model="search"
              class="rounded-l-0"
              light
              hide-details
              solo
              flat
              autofocus
              search-input.sync="filter"
            >
              <template v-slot:append>
                <v-icon>search</v-icon>
              </template>
            </v-text-field>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-badge class="mr-4" color="primary" :content="shopping_cart.length.toString()">
          <v-btn icon small @click="openCart">
            <v-icon>shopping_cart</v-icon>
          </v-btn>
        </v-badge>
      </v-row>
    </v-app-bar>
    <v-row class="justify-stretch align-center">
      <v-col
        v-for="product in filteredProducts" :key="product.id"
        class="pa-3"
        cols="12"
        sm="12"
        md="4"
        lg="4"
      >
        <Product @openDetail="openDetail" :product="product"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// TODO: https://github.com/Intera/vue-zoom-on-hover
import API from '../services/api'
import Product from '../components/Product'
export default {
  name: 'Home',
  components: {
    Product
  },
  data () {
    return {
      search: '',
      products: [],
      filter: null,
      shopping_cart: [],
      filteredProducts: [],
      selectedCategory: {
        t: 'All',
        v: 'All'
      }
    }
  },
  watch: {
    selectedCategory: function (val) {
      if (!this.search || this.search.length === 0) {
        this.filteredProducts = this.products.filter(p => p.category === val || val === 'All')
      } else {
        this.filteredProducts = this.products.filter(p =>
          (p.category === val || val === 'All') &&
          (
            p.title.toLowerCase().includes(this.search.toLowerCase()) ||
            p.description.toLowerCase().includes(this.search.toLowerCase()) ||
            p.title.toLowerCase().includes(this.search.toLowerCase()) ||
            this.toLowerCase(p.keywords).includes(this.search.toLowerCase())
          )
        )
      }
    },
    search: function (val) {
      this.filteredProducts = this.products.filter(p =>
        (
          (p.category === this.selectedCategory.v || this.selectedCategory.v === 'All') ||
          (p.category === this.selectedCategory || this.selectedCategory === 'All')
        ) &&
        (
          p.title.toLowerCase().includes(this.search.toLowerCase()) ||
          p.description.toLowerCase().includes(this.search.toLowerCase()) ||
          p.title.toLowerCase().includes(this.search.toLowerCase()) ||
          this.toLowerCase(p.keywords).includes(this.search.toLowerCase())
        )
      )
    },
    products: function (val) {
      this.filteredProducts = val
    }
  },
  computed: {
    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    categories () {
      const categories = this.products.map(p => p.category)
      return ['All'].concat(
        categories.filter(
          (c, i, array) => array.indexOf(c) === i
        )
      )
    }
    // filteredProducts () {
    //   return this.products.filter(p => {
    //     const keywordsLowerCase = p.keywords.map(k => k.toLowerCase())
    //     const title = p.title.toLowerCase()
    //     const description = p.description.toLowerCase()
    //     console.log(((!this.filter || this.filter.length === 0) && this.selectedCategory.t && this.selectedCategory.t === 'All'))
    //     return (
    //       ((!this.filter || this.filter.length === 0) && this.selectedCategory.t && this.selectedCategory.t === 'All') ||
    //       ((!this.filter || this.filter.length === 0) && this.selectedCategory && this.selectedCategory === 'All') ||
    //       (!this.filter && p.category === this.selectedCategory) ||
    //       (p.category === this.selectedCategory && title.includes(this.filter.toLowerCase())) ||
    //       (p.category === this.selectedCategory && keywordsLowerCase.includes(this.filter.toLowerCase())) ||
    //       (p.category === this.selectedCategory && description.includes(this.filter.toLowerCase()))
    //     )
    //   })
    // }
  },
  methods: {
    openDetail (product) {
      this.$router.push({ name: 'product detail', params: { product: product } })
    },
    openCart () {
      this.$router.push({ name: 'Cart' })
    },
    toLowerCase (object) {
      return object.map(element => element.toLowerCase())
    }
  },
  async mounted () {
    const { data: { products } } = await API.getProducts()
    this.products = products
    if (localStorage.getItem('userId')) {
      const userId = localStorage.getItem('userId')
      const { data: { cart } } = await API.getCart({ userId })
      this.shopping_cart = cart
    }
  }
}
</script>
