<template>
  <h1>Breweries</h1>
  <input type="text" placeholder="search by city" v-model="searchCityField" />
  <input type="checkbox" label="Only odd" id="only-odd" v-model="onlyOdd" style="margin-left: 8px" />
  <label for="only-odd">Only Odd</label>
  <div>Showing {{ visibleBreweries.length }} of {{ breweries.length }}</div>
  ---
  <div v-for="brewery in visibleBreweries" :key="brewery.id" @click="selectBrewery(brewery)">
    {{ brewery.name }} - {{ brewery.city }} - {{ brewery.phone }}
  </div>
  <div v-if="selectedBrewery">
    <pre>{{ selectedBrewery }}</pre>
  </div>
</template>
<script>
export default {
  data: () => ({
    breweries: [],
    selectedBrewery: undefined,
    searchCityField: undefined,
    onlyOdd: false,
  }),
  computed: {
    visibleBreweries() {
      return this.onlyOdd
        ? this.breweries.filter((brewery) => brewery.phone % 2 !== 0)
        : this.breweries;
    },
    breweryURLEndpoint() {
      return `https://api.openbrewerydb.org/breweries?by_city=${this.searchCityField}`;
    },
  },
  watch: {
    searchCityField() {
      this.getBreweries();
    },
  },
  methods: {
    getBreweries() {
      fetch(this.breweryURLEndpoint)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.breweries = res;
        });
    },
    selectBrewery(brewery) {
      this.selectedBrewery = brewery;
    },
  },
  created() {
    this.getBreweries();
  },
};
</script>
