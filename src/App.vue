<template>
  <div id="app">
    <div class="container" style="padding: 20px;">
      <h1>Indralab Vue Components - Development</h1>
      
      <div style="margin: 20px 0;">
        <h2>RelationSearch Component</h2>
        <relation-search :autoload="false"></relation-search>
      </div>
      
      <!-- Add other components here as needed for development -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
