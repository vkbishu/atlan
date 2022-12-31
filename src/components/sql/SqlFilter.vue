<template>
  <div class="filters flex items-center gap-2 p-2">
    <BaseSelect :options="columns" class="w-[20%]" v-model="filter.column" />
    <BaseSelect
      :options="operations"
      class="w-[20%]"
      v-model="filter.operation"
    />
    <BaseInput
      placeholder="Enter value..."
      class="grow"
      v-model="filter.term"
    />

    <button class="hover:bg-neutral-200 p-3 rounded-full" @click="handleSearch">
      <IconSearch class="w-[20px]" />
    </button>
    <Popover class="relative">
      <PopoverButton class="hover:bg-neutral-200 p-3 rounded-full"
        ><IconColumn class="w-[20px]"
      /></PopoverButton>

      <PopoverPanel
        class="absolute right-0 z-10 bg-white shadow-xl rounded-lg max-h-96 overflow-auto"
      >
        <ChoiceList
          :choices="columns"
          name="visibleCoumns"
          title="Columns"
          v-model="columnValue"
        />
      </PopoverPanel>
    </Popover>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import IconSearch from "../icons/IconSearch.vue";
import IconColumn from "../icons/IconColumn.vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ChoiceList from "../ChoiceList.vue";
import BaseSelect from "../BaseSelect.vue";
import BaseInput from "../BaseInput.vue";
const props = defineProps({
  /**
   *  columns = [{text: "choice text", value: "value"}]
   */
  columns: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["columnChange", "filter"]);
const columnValue = ref([]);
const operations = [
  {
    text: "EQUAL",
    value: "==",
  },
  {
    text: "GREATER THAN",
    value: ">",
  },
  {
    text: "LESS THAN",
    value: "<",
  },
  {
    text: "GREATER THAN EQUAL TO",
    value: ">=",
  },
  {
    text: "LESS THAN EQUAL TO",
    value: "<=",
  },
];

const filter = ref({
  column: "",
  operation: "",
  term: "",
});

const handleSearch = () => {
  emit("filter", {
    column: filter.value.column || props.columns[0]?.value,
    operation: filter.value.operation || "==",
    term: filter.value.term,
  });
};

watch(
  () => props.columns,
  (newVal) => {
    columnValue.value = newVal.map((item) => item.value);
    filter.value = {
      column: "",
      operation: "",
      term: "",
    };
  },
  { immediate: true }
);

watch(
  () => columnValue.value,
  (newVal) => {
    emit("columnChange", newVal);
  },
  { immediate: true }
);
</script>
