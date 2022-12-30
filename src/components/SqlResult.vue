<template>
  <div v-if="store.columns.length > 0">
    <div class="sticky top-0 bg-white border-b shadow">
      <SqlFilter
        :columns="store.fields"
        @column-change="handleColumnChange"
        @filter="setFilter"
      />
      <div class="p-2 text-neutral-400 text-xs">
        Showing {{ store.results.length }} of {{ store.results.length }} records
        (0.00005 seconds)
      </div>
    </div>

    <Table :fields="tableColumns" :items="tableResults" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Table from "./Table.vue";
import SqlFilter from "./SqlFilter.vue";
import { useSqlStore } from "../stores/sql";

const store = useSqlStore();
const visibleColumns = ref([]);
const filterValue = ref({});

const handleColumnChange = (columns) => {
  visibleColumns.value = columns;
};
const setFilter = (filterOption) => {
  // prevent redundant component re-rendering
  if (
    filterOption.column != filterValue.value?.column ||
    filterOption.operation != filterValue.value?.operation ||
    filterOption.term != filterValue.value?.term
  ) {
    filterValue.value = filterOption;
  }
};

const tableColumns = computed(() => {
  return store.fields.filter(
    (item) => visibleColumns.value.indexOf(item.key) !== -1
  );
});

const tableResults = computed(() => {
  let result = [];
  if (!filterValue.value?.term) {
    result = store.results;
  } else {
    result = store.results.filter((item) => {
      const statement = `item.${filterValue.value.column} ${filterValue.value.operation} '${filterValue.value.term}'`;
      return eval(statement);
    });
  }
  return result.slice(0, 50);
});
</script>
