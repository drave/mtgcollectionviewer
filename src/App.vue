<template>
  <div id="app">
    <div class="container">
      <collection-table></collection-table>
    </div>
  </div>
</template>

<script>
import CollectionTable from './components/CollectionTable.vue'
export default {
  name: 'App',
  components: { CollectionTable },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
