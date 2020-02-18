<template>
  <span class='agent-select'>
      <span v-if="!options || options_empty">
        text:
        <input class="form-control"
               type="text"
               v-model="agent_str"
               placeholder="Enter agent here">
        namespace:
        <select v-model="namespace"
                class="form-control"
                title="namespace">
          <option v-for="option in namespace_options"
                  :key="option"
                  :value="option">
            {{ option }}
          </option>
        </select>
        <input v-if="namespace === 'other'"
               v-model="custom_namespace"
               placeholder="Enter namespace...">
        OR
        <button class="btn btn-primary"
                @click='lookupOptions'>
            Search Grounding
        </button>
        <span v-show='searching'>Searching...</span>
        <span v-show='options_empty'>No groundings found...</span>
      </span>
      <span v-else-if="options.length === 1">
        <span class='form-control' v-html="printOption(options[0])"></span>
        <button class="btn btn-primary"
                @click='resetOptions'>
            Cancel
        </button>
      </span>
      <span v-else>
        <select class="form-control" v-model='selected_option_idx'>
          <option :value='-1' selected disabled hidden>Select grounding option...</option>
          <option v-for='(option, option_idx) in options'
                  :key='option_idx'
                  :value='option_idx'
                  v-html="printOption(option)">
          </option>
        </select>
        <button class="btn btn-primary"
                @click='resetOptions'>
            Cancel
        </button>
      </span>
    </span>
</template>

<script>
  export default {
    name: "AgentSelect",
    props: ['value'],
    data: function() {
      return {
        agent_str: '',
        searching: false,
        options: null,
        selected_option_idx: -1,
        namespace: "auto",
        namespace_options: [
          "auto",
          "text",
          "name",
          "fplx",
          "hgnc",
          "other"
        ],
        custom_namespace: null,
      }
    },
    methods: {
      lookupOptions: async function() {
        this.searching = true;
        const resp = await fetch(
          `${this.$ground_url}?agent=${this.agent_str}`,
          {method: 'GET'}
          );
        this.options = await resp.json();
        this.searching = false;

        if (this.options.length === 1)
          this.selected_option_idx = 0;
      },
      resetOptions: function() {
        this.options = null;
        this.selected_option_idx = -1;
      },
      printOption: function(option) {
        let term = option.term;
        return (`<b>${term.entry_name}</b> (score: ${option.score.toFixed(2)}, `
                + `${term.status} from ${term.source})`);
      }
    },
    computed: {
      options_empty: function() {
        if (!this.options)
          return false;
        return this.options.length === 0;
      },
      grounding: function() {
        if (!this.agent_str)
          return null;
        else
          if (!this.options)
            if (this.namespace !== 'other')
              return {id: this.agent_str, db: this.namespace.toUpperCase()};
            else if (this.custom_namespace)
              return {id: this.agent_str, db: this.custom_namespace.toUpperCase()};
            else
              return null;
          else
            if (this.selected_option_idx < 0)
              return null;
            else
              return {
                id: this.options[this.selected_option_idx].term.id,
                db: this.options[this.selected_option_idx].term.db
              }
      }
    },
    watch: {
      grounding: function(grounding) {
        this.$emit('input', grounding);
      }
    }
  }
</script>

<style scoped>
  button {
    margin: 0 0.5em;
  }
</style>