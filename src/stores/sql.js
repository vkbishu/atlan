import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { cleanQuery, getDisplayTime } from "../helpers/utility";
import { getSqlDataMaps } from "../data";

export const useSqlStore = defineStore("sql", () => {
  const sqlDataMaps = getSqlDataMaps();
  const query = ref("");
  const columns = ref([]);
  const results = ref([]);
  const history = ref([]);

  const runQuery = () => {
    const sqlResult = sqlDataMaps.get(cleanQuery(query.value));
    if (!sqlResult) {
      columns.value = [];
      results.value = [];
      return false;
    }
    columns.value = sqlResult.columns;
    results.value = sqlResult.rows;

    history.value.push({
      time: Date.now(),
      formattedTime: getDisplayTime(new Date()),
      query: query.value,
    });
  };

  const showQueryResult = (entity) => {
    query.value = entity.query;
    runQuery();
  };

  const fields = computed(() => {
    return columns.value.map((item) => ({
      key: item,
      label: item,
      value: item,
    }));
  });

  const sqlHistory = computed(() => {
    return history.value.slice().reverse();
  });

  return {
    columns,
    results,
    fields,
    query,
    history,
    sqlHistory,
    showQueryResult,
    runQuery,
  };
});
