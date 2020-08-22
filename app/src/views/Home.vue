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
            <v-combobox
              v-model="filter"
              class="rounded-l-0"
              light
              hide-details
              solo
              flat
              autofocus
              :items="keywords"
            >
              <template v-slot:append>
                <v-icon>search</v-icon>
              </template>
            </v-combobox>
          </div>
        </v-col>
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
      products: [],
      filter: null,
      selectedCategory: {
        t: 'All',
        v: 'All'
      }
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
    },
    keywords () {
      return this.products
        .reduce((accum, p) => {
          if (!this.selectedCategory || this.selectedCategory === 'All') {
            return accum.concat(p)
          }
          if (this.selectedCategory === p.category) {
            return accum.concat(p)
          } else {
            return accum
          }
        }, [])
        .map(p => p.keywords)
        .reduce((accum, keywords) => accum.concat(keywords), [])
    },
    filteredProducts () {
      return this.products.filter(p => {
        const keywordsLowerCase = p.keywords.map(k => k.toLowerCase())
        const title = p.title.toLowerCase()
        const description = p.description.toLowerCase()
        return (
          (this.selectedCategory.t && this.selectedCategory.t === 'All') ||
          (this.selectedCategory && this.selectedCategory === 'All') ||
          (!this.filter && p.category === this.selectedCategory) ||
          (p.category === this.selectedCategory && title.includes(this.filter.toLowerCase())) ||
          (p.category === this.selectedCategory && keywordsLowerCase.includes(this.filter.toLowerCase())) ||
          (p.category === this.selectedCategory && description.includes(this.filter.toLowerCase()))
        )
      })
    }
  },
  methods: {
    openDetail (product) {
      this.$router.push({ name: 'product detail', params: { product: product } })
    }
  },
  async mounted () {
    const { data: { products } } = await API.getProducts()
    this.products = products
  }
}
</script>
