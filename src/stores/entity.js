import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { getEntities } from "../data";
export const useEntityStore = defineStore("entity", () => {
  const entities = ref(getEntities());
  const entitiesCount = computed(() => entities.value.length);
  const pinnedEntities = computed(() => {
    return entities.value.filter((entity) => entity.pinned);
  });
  const pinnedEntitiesCount = computed(() => {
    return pinnedEntities.value.length;
  });

  return {
    entities,
    pinnedEntities,
    entitiesCount,
    pinnedEntitiesCount,
  };
});
