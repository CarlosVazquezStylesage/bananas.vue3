<template>
  <h1>Breweries</h1>
  <h3>Breweries Rated: {{ numBreweriesRated }}</h3>
  <input type="text" placeholder="search by city" v-model="searchCityField" />
  <input
    type="checkbox"
    label="Only odd"
    id="only-odd"
    v-model="onlyOdd"
    style="margin-left: 8px"
  />
  <label for="only-odd">Only Odd</label>
  <div>Showing {{ visibleBreweries.length }} of {{ breweries.length }}</div>
  ---
  <div
    v-for="brewery in visibleBreweries"
    :key="brewery.id"
    @click="selectBrewery(brewery)"
  >
    {{ brewery.name }} - {{ brewery.city }} - {{ brewery.phone }}
  </div>
  <div v-if="selectedBrewery">
    <button @click="rateBrewery" :disabled="!enableRateButton">Rate</button>
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
    numBreweriesRated: 0,
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
    enableRateButton() {
      return this.searchCityField === "colorado";
    },
  },
  watch: {
    searchCityField() {
      this.selectedBrewery = undefined;
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
    rateBrewery() {
      this.numBreweriesRated = this.numBreweriesRated + 1;
    },
  },
  created() {
    this.getBreweries();
  },
};
</script>
