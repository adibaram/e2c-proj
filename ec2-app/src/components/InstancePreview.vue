<template>
    <section>
        <h3>{{instance.type}}, {{instance.region}}</h3>
        <h6 v-for="size in instance.sizes" :key="size.size+size.valueColumns.length">{{size.size}}: price for 1h {{size.valueColumns[0].prices.USD}}$ price for 6h {{size.valueColumns[1].prices.USD}}$</h6>
    </section>
</template>

<script>
export default {
    props: {
        instance: {
            type: Object,
            default: {}
    }
  }, 
  computed: {
      instancePrices() {
          for (let i =0; i<this.instance.sizes.length; i++) {
              let size = this.instance.sizes[i]
              return `${size.size} price for 1h ${size.valueColumns[0].prices.USD} price for 6h ${size.valueColumns[1].prices.USD}`
          }
      }
  }
}
</script>

<style scoped>
    h3{
        margin: 10px;
    }
    h6 {
        margin-left:50px;
        margin-top:4px;
        margin-bottom: 4px;
    }
    span {
        font-size: 10px;
        margin-left: 10px;
    }
</style>



