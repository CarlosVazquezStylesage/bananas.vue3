<template>
  <h1>Breweries</h1>
  <h3>breweries rated {{ numBreweriesRated }}</h3>
  <input type="text" placeholder="search by city" v-model="searchCityField" />
  <input
    type="checkbox"
    label="Only odd"
    id="only-odd"
    v-model="onlyOdd"
    style="margin-left: 8px"
  />
  <label for="only-odd">Only Odd</label>
  <div v-if="loading">Loading...</div>
  <div v-else>
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
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";

// Get breweries
const breweries = ref([]);
const loading = ref(false);
const searchCityField = ref(undefined);
const breweryURLEndpoint = computed(
  () =>
    `https://api.openbrewerydb.org/breweries?by_city=${searchCityField.value}`
);
const getBreweries = () => {
  selectedBrewery.value = undefined;
  loading.value = true;
  setTimeout(
    () =>
      fetch(breweryURLEndpoint.value)
        .then((res) => res.json())
        .then((res) => {
          breweries.value = res;
          loading.value = false;
        }),
    1000
  );
};
watch(searchCityField, () => getBreweries());

//Selected brewery
const selectedBrewery = ref(undefined);
const selectBrewery = (brewery) => (selectedBrewery.value = brewery);

// Odd phones
const onlyOdd = ref(false);
const visibleBreweries = computed(() =>
  onlyOdd.value
    ? breweries.value.filter((brewery) => brewery.phone % 2 !== 0)
    : breweries.value
);

// Rate brewery
const numBreweriesRated = ref(0);
const enableRateButton = computed(() => searchCityField.value === "colorado");
const rateBrewery = () => numBreweriesRated.value++;

onMounted(() => {
  getBreweries();
});
</script>
