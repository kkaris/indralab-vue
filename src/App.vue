<template>
  <div id="app">
    <div class="container" style="padding: 20px;">
      <h1>Indralab Vue Components - Development</h1>
      
      <div style="margin: 20px 0;">
        <h2>RelationSearch Component</h2>
        <relation-search :autoload="false"></relation-search>
      </div>
      
      <!-- Add other components here as needed for development -->
      <div class="side-info-block sidebar-summary">
      <h3 class="bg-white">Summary</h3>
      <p>On this page, you can search for statements from the INDRA Database by applying different filters such as agents, relation types, MeSH terms, or papers.</p>
      <h4>Examples</h4>
      <span class="example-link"
            data-agent1="DUSP1"
            data-agent2="MAPK1"
            data-preset="s-o"
            onclick="window.dispatchEvent(new CustomEvent('indra:example', { detail: {
              agent1: this.dataset.agent1,
              agent2: this.dataset.agent2,
              preset: this.dataset.preset
            }}))">
        How does DUSP1 affect MAPK1?
      </span>
      <span class="example-link"
            data-agent1="CDK12"
            data-stmt-type="Phosphorylation"
            data-preset="s-o"
            onclick="window.dispatchEvent(new CustomEvent('indra:example', { detail: {
              agent1: this.dataset.agent1,
              stmtType: this.dataset.stmtType,
              preset: this.dataset.preset
            }}))">
        What does CDK12 phosphorylate?
      </span>
      <span class="example-link"
            data-agent1="MTOR"
            data-stmt-type="Inhibition"
            data-preset="o-s"
            onclick="window.dispatchEvent(new CustomEvent('indra:example', { detail: {
              agent1: this.dataset.agent1,
              stmtType: this.dataset.stmtType,
              preset: this.dataset.preset
            }}))">
        What is known to inhibit mTOR?
      </span>
      <span class="example-link"
            data-agent1="PIK3CA"
            data-preset="any-any"
            onclick="window.dispatchEvent(new CustomEvent('indra:example', { detail: {
              agent1: this.dataset.agent1,
              preset: this.dataset.preset
            }}))">
        Show all interactions involving PIK3CA.
      </span>
      <span class="example-link"
            data-agent1="Seliciclib"
            data-stmt-type="Inhibition"
            data-preset="s-o"
            onclick="window.dispatchEvent(new CustomEvent('indra:example', { detail: {
              agent1: this.dataset.agent1,
              stmtType: this.dataset.stmtType,
              preset: this.dataset.preset
            }}))">
        What does Seliciclib inhibit?
      </span>
    </div>  

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

.sidebar-summary .example-link {
    display: block;
    margin: 5px 0;
    color: #256DC5;
    text-decoration: underline;
    cursor: pointer;
    font-size: 10pt;
  }

  .sidebar-summary .example-link:hover {
    color: #007bff;
  }

</style>
