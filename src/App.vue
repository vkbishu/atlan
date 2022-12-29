<template>
  <div class="wrapper w-screen h-screen flex">
    <div class="sidebar h-100 basis-[250px] border-r shrink-0">
      <!-- database list -->
      <div class="database px-3 py-2" v-once>
        <select class="w-full outline-none py-2 cursor-pointer">
          <option value="">Demo Database</option>
        </select>
      </div>
      <PinnedEntityStore />
      <EntityStore />
    </div>
    <main class="main grow flex flex-col h-full overflow-auto">
      <div class="sql-query basis-[30%] border-b">
        <div class="flex flex-col h-full">
          <div class="bg-neutral-100 py-2 px-4 flex items-center border-b">
            <div class="font-bold">SQL</div>
            <div class="ml-auto flex items-center">
              <Popover class="relative">
                <PopoverButton :as="Button"
                  ><IconHistory class="w-[15px] mr-2 fill-neutral-500" />
                  History</PopoverButton
                >

                <PopoverPanel
                  class="absolute right-0 z-10 bg-white shadow-xl rounded-lg p-3 min-w-[300px] max-h-[400px] overflow-auto"
                >
                  <div class="mb-3 font-bold">SQL History</div>
                  <div
                    class="bg-blue-100 shadow-lg rounded-lg p-3 relative overflow-hidden mb-3"
                    v-for="(history, index) in store.sqlHistory"
                    :key="index"
                  >
                    <span
                      class="inline-block bg-neutral-300 text-neutral-500 px-2 py-1 text-xs absolute right-0 bottom-0"
                      >{{ history.formattedTime }}</span
                    >
                    <div>{{ history.query }}</div>

                    <div class="mt-4">
                      <Button
                        variant="primary"
                        @click="store.showQueryResult(history)"
                        >Run <IconPlay class="w-[10px] ml-2 fill-white" />
                      </Button>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
              <Button class="ml-2" variant="primary" @click="store.runQuery"
                >Run <IconPlay class="w-[10px] ml-2 fill-white" />
              </Button>
            </div>
          </div>
          <!-- sql editor goes here -->
          <SqlEditor v-model="store.query" />
        </div>
      </div>
      <div
        class="sql-runner grow overflow-auto w-full"
        v-if="store.columns.length > 0"
      >
        <div class="sticky top-0">
          <SqlFilter
            :columns="store.fields"
            @column-change="handleColumnChange"
          />
        </div>
        <Table :fields="tableColumns" :items="store.results" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SqlEditor from "./components/SqlEditor.vue";
import Table from "./components/Table.vue";
import Button from "./components/Button.vue";
import IconHistory from "./components/icons/IconHistory.vue";
import IconPlay from "./components/icons/IconPlay.vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import SqlFilter from "./components/SqlFilter.vue";
import { useSqlStore } from "./stores/sql";
import EntityStore from "./components/store/EntityStore.vue";
import PinnedEntityStore from "./components/store/PinnedEntityStore.vue";

const store = useSqlStore();
const visibleColumns = ref([]);
const handleColumnChange = (columns) => {
  visibleColumns.value = columns;
};
const tableColumns = computed(() => {
  return store.fields.filter(
    (item) => visibleColumns.value.indexOf(item.key) !== -1
  );
});
</script>
