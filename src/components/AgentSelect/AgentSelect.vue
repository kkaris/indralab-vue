<template>
  <span class='agent-select'>
      <span v-if="!options || options_empty">
        <span class="label">text:</span>
        <input class="form-control"
               type="text"
               v-model="agent_str"
               placeholder="Enter agent here">
        <span class="label">namespace:</span>
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
               class="form-control"
               v-model="custom_namespace"
               placeholder="Enter namespace...">
        OR
        <button class="agent-select-button btn btn-primary"
                @click='lookupOptions'>
            Search Grounding
        </button>
        <span v-show='searching'>Searching...</span>
        <span v-show='options_empty'>No groundings found...</span>
        <i style="color: red; cursor: default"
           v-show="search_error"
           :title="search_error">
          Search failed!
        </i>
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
        <button class="agent-select-button btn btn-primary"
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
        search_error: null,
      }
    },
    methods: {
      lookupOptions: async function() {
        this.searching = true;
        const resp = await fetch(
          `${this.$ground_url}?agent=${this.agent_str}`,
          {method: 'GET'}
          );
        if (resp.status === 200) {
          this.options = await resp.json();
          if (this.options.length === 1)
            this.selected_option_idx = 0;
          this.search_error = null;
        } else {
          this.search_error = `(${resp.status}) ${resp.statusText}`
        }
        this.searching = false;
      },
      resetOptions: function() {
        this.options = null;
        this.selected_option_idx = -1;
      },
      printOption: function(option) {
        let term = option.term;
        return (`<b>${term.entry_name}</b> (score: ${option.score.toFixed(2)}, `
                + `${term.id} from ${term.db})`);
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
  .agent-select {
    margin: 0.2em;
  }
  select, input, button {
    margin: 0.2em;
  }
  .label {
    margin-left: 0.5em;
    margin-right: 0.2em;
  }
</style>