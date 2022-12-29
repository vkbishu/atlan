<template>
  <Disclosure :default-open="true" as="div" v-slot="{ open }">
    <DisclosureButton
      class="font-bold uppercase px-3 py-3 w-full text-left flex items-center justify-between"
    >
      {{ title }}
      <IconArrowDown :class="['w-[15px]', { 'rotate-180': !open }]" />
    </DisclosureButton>
    <DisclosurePanel class="px-3">
      <slot></slot>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import IconArrowDown from "./icons/IconArrowDown.vue";
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
