import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSavedStore = defineStore("saved", () => {
  const queries = ref([]);
  const savedQueries = computed(() => queries.value.slice().reverse());
  const savedQueriesCount = computed(() => queries.value.length);
  const saveQuery = (query) => {
    /**
     *  query = {id: int, name: string, query: string}
     */
    queries.value.push(query);
  };
  const removeSavedQuery = (id) => {
    queries.value = queries.value.filter((query) => {
      return query.id !== id;
    });
  };
  return {
    savedQueries,
    savedQueriesCount,
    saveQuery,
    removeSavedQuery,
  };
});
