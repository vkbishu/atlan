<template>
  <input type="text" class="border rounded-md p-2" v-model="inputValue" />
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});
</script>
