import { ref } from "vue";

export function useCounter(options) {
  const { max } = options;
  const counter = ref(0);
  const increment = () => {
    if (counter.value <= max) {
      counter.value++;
    }
  };
  return { counter, increment };
}
