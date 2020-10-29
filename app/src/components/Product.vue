<template>
  <v-hover v-slot:default="{ hover }" open-delay="200">
    <v-card   :elevation="hover ? 16 : 2"
            :class="{ 'on-hover': hover }" @click="openDetail" width="100%">
      <v-img
        class="align-end image-product"
        :src="product.image"
        aspect-ratio="1.7778"
        contain
      >
      </v-img>
      <v-card-subtitle class="text-truncate">{{product.title}}</v-card-subtitle>
      <v-card-text class="text--primary pa-4 text-truncate" style="height:80px;" >
        <p class="text-wrap">{{ product.description }}</p>
      </v-card-text>
      <v-card-actions>
        <div class="d-block">
          <v-icon v-for="star in product.rating" :key="star" color="secondary">mdi-star</v-icon>
        </div>
        <div class="text-subtitle font-weight-black pl-3">${{product.price}}</div>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  methods: {
    openDetail () {
      this.$emit('openDetail', this.product)
    }
  }
}
</script>

<style scoped>
  .image-product {
    opacity: 0.7;
  }
  /*  */
</style>
