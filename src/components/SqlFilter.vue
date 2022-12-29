<template>
  <div class="filters flex items-center gap-2 p-2 bg-white border-b shadow">
    <BaseSelect :options="columns" class="w-[20%]" />
    <BaseSelect :options="operations" class="w-[20%]" />
    <BaseInput placeholder="Enter value..." class="grow" />

    <button class="hover:bg-neutral-200 p-3 rounded-full">
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
import IconSearch from "./icons/IconSearch.vue";
import IconColumn from "./icons/IconColumn.vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ChoiceList from "./ChoiceList.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseInput from "./BaseInput.vue";
const props = defineProps({
  /**
   *  columns = [{text: "choice text", value: "value"}]
   */
  columns: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["columnChange"]);
const columnValue = ref([]);
const operations = [
  {
    text: "EQUAL TO",
    value: "=",
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

watch(
  () => props.columns,
  (newVal) => {
    columnValue.value = newVal.map((item) => item.value);
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
