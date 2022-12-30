<template>
  <CollapsablePanel :title="title">
    <ul>
      <li
        v-for="item in store.savedQueries"
        :key="item.id"
        class="pb-2 text-sm text-neutral-500 flex items-center justify-between"
      >
        <div
          class="cursor-pointer hover:underline"
          @click="sqlStore.showQueryResult(item)"
        >
          <IconTable class="w-4 inline-block mr-2" />
          <span>
            {{ item.name }}
          </span>
        </div>
        <button @click="store.removeSavedQuery(item.id)">
          <IconClose class="w-[10px]" />
        </button>
      </li>
    </ul>
  </CollapsablePanel>
</template>

<script setup>
import { computed } from "vue";
import { useSavedStore } from "../../stores/saved";
import { useSqlStore } from "../../stores/sql";
import CollapsablePanel from "../CollapsablePanel.vue";
import IconClose from "../icons/IconClose.vue";
import IconTable from "../icons/IconTable.vue";
const store = useSavedStore();
const sqlStore = useSqlStore();
const title = computed(() => `SAVED (${store.savedQueriesCount})`);
</script>
