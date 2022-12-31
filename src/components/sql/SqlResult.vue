<template>
  <div v-if="store.columns.length > 0">
    <div class="sticky top-0 bg-white border-b shadow">
      <SqlFilter
        :columns="store.fields"
        @column-change="handleColumnChange"
        @filter="setFilter"
      />
      <div class="flex items-center justify-between p-2 h-[50px]">
        <div class="text-neutral-400 text-xs">
          Showing {{ paginationInfo.startText }} -
          {{ paginationInfo.endText }} of
          {{ paginationInfo.resultTotal }} records (0.00005 seconds)
        </div>
        <Paginate
          v-model="currentPage"
          v-show="pageCount > 0"
          :page-count="pageCount"
          :page-range="3"
          :click-handler="updatePage"
          container-class="table border-collapse text-center bg-white text-sm"
          active-class="bg-blue-500 !hover:bg-blue-500 text-white"
          prev-class="w-12 h-8 border border-gray-200 table-cell"
          prev-link-class="pt-1 cursor-pointer inline-block   w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
          next-class="w-12 h-8 border border-gray-200 table-cell"
          next-link-class="pt-1 cursor-pointer inline-block w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
          page-class="w-8 h-8 border border-gray-200 table-cell"
          page-link-class="pt-1 cursor-pointer inline-block  w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
          prev-text="Prev"
          next-text="Next"
        ></Paginate>
      </div>
    </div>

    <Table :fields="tableColumns" :items="paginatedItems" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Paginate from "vuejs-paginate-next";
import Table from "../Table.vue";
import SqlFilter from "./SqlFilter.vue";
import { useSqlStore } from "../../stores/sql";
import usePagination from "../../composables/pagination";

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
  if (!filterValue.value?.term) {
    return store.results;
  }

  // eslint-disable-next-line no-unused-vars
  return store.results.filter((item) => {
    const statement = `item.${filterValue.value.column} ${filterValue.value.operation} '${filterValue.value.term}'`;
    return eval(statement);
  });
});

/**
 *  Pagination
 */
const currentPage = ref(1);
const perPage = ref(20);

const updatePage = (page) => {
  currentPage.value = page;
};

const { paginationInfo, paginatedItems, pageCount } = usePagination(
  tableResults,
  currentPage,
  perPage
);

watch(
  () => store.columns,
  () => {
    // reset pagination and filter on query change
    currentPage.value = 1;
    filterValue.value = {};
  }
);
</script>
