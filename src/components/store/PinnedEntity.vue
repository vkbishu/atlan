<template>
  <CollapsablePanel :title="title">
    <ul>
      <li
        v-for="(entity, index) in store.pinnedEntities"
        :key="index"
        class="pb-2 text-sm text-neutral-500 flex items-center justify-between"
      >
        <div
          class="cursor-pointer hover:underline"
          @click="sqlStore.showQueryResult(entity)"
        >
          <IconTable class="w-4 inline-block mr-2" />
          <span>
            {{ entity.name }}
          </span>
        </div>
        <button @click="entity.pinned = false">
          <IconClose class="w-[10px]" />
        </button>
      </li>
    </ul>
  </CollapsablePanel>
</template>

<script setup>
import { computed } from "vue";
import { useEntityStore } from "../../stores/entity";
import { useSqlStore } from "../../stores/sql";
import CollapsablePanel from "../CollapsablePanel.vue";
import IconClose from "../icons/IconClose.vue";
import IconTable from "../icons/IconTable.vue";
const store = useEntityStore();
const sqlStore = useSqlStore();
const title = computed(() => `PINNED (${store.pinnedEntitiesCount})`);
</script>
