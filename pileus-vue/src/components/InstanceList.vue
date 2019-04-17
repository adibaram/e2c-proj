<template>
    <section>
        <instance-preview v-for="instance in instances" :instance="instance"></instance-preview>
    </section> 
</template>

<script>
import InstancePreview from "@/components/InstancePreview.vue";

export default {
  data() {
    return {

    };
  },
  created() {
    
    let filter = '';
    this.$store.dispatch({ type: "loadFilter", filter});
  },
  computed: {
    instances() {
      return this.$store.getters.getInstances;
    },
    filter() {
      return this.$store.getters.getInstances;
    }
  },
  components: {
    InstancePreview
  }
};
</script>

<style scoped>
</style>

