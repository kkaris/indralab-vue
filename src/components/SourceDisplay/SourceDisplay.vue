<template>
  <span class="source-display">
    <span v-for="(src_group, cat, idx) in sources" :key="cat">
      <span v-if="idx > 0" class="badge badge-source">|</span>
      <span v-for="src in src_group"
            :key="src">
        <span class='badge badge-source'
              v-if="showSrc(src)"
              :title="src"
              :class="`source-${src}`">
          {{ source_counts[src] }}
        </span>
      </span>
    </span>
  </span>
</template>

<script>
  export default {
    name: "SourceDisplay",
    props: ['source_counts'],
    methods: {
      showSrc: function(src) {
        if ( !(src in this.source_counts) )
          return false;
        else if ( this.source_counts[src] > 0 )
          return true;
        return false;
      }
    },
    computed: {
      sources: function() {
        return this.$sources
      },
    }
  }
</script>

<style scoped>

</style>