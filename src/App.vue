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
      <SavedQuery />
    </div>
    <main class="main grow flex flex-col h-full overflow-auto">
      <div class="sql-query h-[25%] border-b grow-0 shrink-0">
        <SqlEditor />
      </div>
      <div class="sql-runner grow overflow-auto w-full">
        <SqlResult />
      </div>
    </main>
  </div>
</template>

<script setup>
import SqlEditor from "./components/SqlEditor.vue";
import SqlResult from "./components/SqlResult.vue";
import EntityStore from "./components/store/EntityStore.vue";
import PinnedEntityStore from "./components/store/PinnedEntityStore.vue";
import SavedQuery from "./components/store/SavedQuery.vue";
</script>
