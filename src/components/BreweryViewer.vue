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
    <button @click="rateBrewery" :disabled="!enableRateButton">Rate</button>
    <pre>{{ selectedBrewery }}</pre>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
// get breweries
const breweries = ref([]);
const searchCityField = ref(undefined);
const breweryURLEndpoint = computed(
  () =>
    `https://api.openbrewerydb.org/breweries?by_city=${searchCityField.value}`
);
const getBreweries = () => {
  selectedBrewery.value = undefined;
  fetch(breweryURLEndpoint.value)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      breweries.value = res;
    });
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
const enableRateButton = computed(() => searchCityField.value === "colorado");
const rateBrewery = () => alert("rated!");

onMounted(() => {
  getBreweries();
});
</script>
