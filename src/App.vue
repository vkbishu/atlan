<template>
  <div
    :class="[
      'wrapper w-screen h-screen flex',
      { 'cursor-row-resize': isDragging },
    ]"
    @mouseup="endDragging()"
  >
    <div class="sidebar h-100 basis-[250px] border-r shrink-0">
      <!-- database list -->
      <div class="database px-3 py-2" v-once>
        <select class="w-full outline-none py-2 cursor-pointer">
          <option value="">Demo Database</option>
        </select>
      </div>
      <PinnedEntityStore />
      <EntityStore />
      <SavedQuery />
    </div>
    <main class="main grow flex flex-col h-full overflow-auto">
      <div
        class="sql-query border-b grow-0 shrink-0"
        :style="{ height: `${editorHeight}%` }"
      >
        <SqlEditor />
      </div>
      <div
        class="h-1 bg-neutral-300 cursor-row-resize"
        @mousedown="startDragging"
      ></div>
      <div class="sql-runner grow overflow-auto w-full">
        <SqlResult />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SqlEditor from "./components/SqlEditor.vue";
import SqlResult from "./components/SqlResult.vue";
import EntityStore from "./components/store/EntityStore.vue";
import PinnedEntityStore from "./components/store/PinnedEntityStore.vue";
import SavedQuery from "./components/store/SavedQuery.vue";

const editorHeight = ref(25);
const isDragging = ref(false);

const handleDragging = (e) => {
  const percentage = (e.pageY / window.innerHeight) * 100;

  if (e.pageY >= 100 && percentage <= 80) {
    editorHeight.value = percentage.toFixed(2);
  }
};

const startDragging = () => {
  isDragging.value = true;
  document.addEventListener("mousemove", handleDragging);
};

const endDragging = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleDragging);
};
</script>
