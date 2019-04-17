<template>
    <div>
        <input type="text" placeholder="search..." @input="updateFilter" v-model="filter">
    </div>
</template>

<script>
import Autocomplete from './Autocomplete.vue'
export default {
    data() {
        return {
            filter: ''
        }
    },
    methods: {
        updateFilter() {
            let filter = this.filter.toLowerCase();
            this.$store.dispatch({ type: "setFilter", filter });
            this.$store.dispatch({ type: "loadFilter", filter });
        }
    },
    components: {
        Autocomplete
    }
    

}
</script>

<style scoped>
    input {
        width: 100%;
        height: 30px;
        padding: 0 10px;
        font-size: 12px;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid #D8D8D8; 
        margin: 10px;
    }
  
    input:focus {
       outline: none; 
    }
</style>

