import { isRef, ref, unref, watch } from "vue";

export function useFetch(urlMaybeRef, initialValue) {
  const loading = ref(false);
  const data = ref(initialValue);

  const fetchData = () => {
    loading.value = true;
    setTimeout(
      () =>
        fetch(unref(urlMaybeRef))
          .then((res) => res.json())
          .then((res) => {
            data.value = res;
            loading.value = false;
          }),
      1000
    );
  };
  if (isRef(urlMaybeRef)) {
    watch(urlMaybeRef, () => fetchData());
  } else {
    fetchData();
  }

  return { loading, data };
}
