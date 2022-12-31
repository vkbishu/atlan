<template>
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
        <Button
          class="ml-2"
          variant="secondary"
          :disabled="store.query.length === 0"
          @click="openModal"
          >Save
        </Button>
        <Button class="ml-2" variant="primary" @click="store.runQuery"
          >Run <IconPlay class="w-[10px] ml-2 fill-white" />
        </Button>
      </div>
    </div>
    <!-- sql editor goes here -->
    <div class="grow overflow-auto">
      <Codemirror
        v-model="store.query"
        placeholder="Type SQL Query here.."
        :style="{ height: '100%' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
      />
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Save Query
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500 mb-2">
                  Please enter a name to save query.
                </p>
                <BaseInput
                  placeholder="Enter name here..."
                  class="w-full"
                  v-model="queryName"
                />
              </div>

              <div class="mt-4">
                <Button
                  variant="primary"
                  class="mr-2"
                  :disabled="queryName.length === 0"
                  @click="handleSave"
                  >Save</Button
                >
                <Button @click="closeModal">Cancel</Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import { Codemirror } from "vue-codemirror";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { sql } from "@codemirror/lang-sql";
import { useSqlStore } from "../../stores/sql";
import { useSavedStore } from "../../stores/saved";
import Button from "../Button.vue";
import IconHistory from "../icons/IconHistory.vue";
import IconPlay from "../icons/IconPlay.vue";
import BaseInput from "../BaseInput.vue";
const extensions = [sql()];
const store = useSqlStore();
const { saveQuery } = useSavedStore();

const queryName = ref("");
const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  isOpen.value = true;
};

const handleSave = () => {
  saveQuery({ name: queryName.value, id: Date.now(), query: store.query });
  queryName.value = "";
  closeModal();
};
</script>
