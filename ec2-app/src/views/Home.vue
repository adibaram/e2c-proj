

<template>
  <section>
    <div class="home">
      <img alt="logo" src="../assets/image.png">
      <h1>EC2</h1>
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </div>
    <instance-filter :items="instancesNames"></instance-filter>
    <instance-list></instance-list>
   </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import InstanceFilter from '@/components/Autocomplete.vue'
import InstanceList from '@/components/InstanceList.vue'

export default {
  name: 'home',

  computed: {
    instancesNames() {
      var instances = this.$store.getters.getInstances
      var items = []
      for (let i =0; i<instances.length; i++) {
        if (items.includes(instances[i].type)) continue;
        else items.push(instances[i].type);
      }
      return items
    },
  },
  components: {
    HelloWorld,
    InstanceFilter,
    InstanceList
  }
}
</script>

<style lang="css" scoped>
  .home img {
    height: 80px;
  }

  .home{
    display: flex;
    background-color: #f6f7fa;
  }

</style>




