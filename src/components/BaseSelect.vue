<template>
  <select class="border rounded-md p-2" v-model="inputValue">
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option?.text ?? option.value }}
    </option>
  </select>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "",
  },
  defaultFirst: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get() {
    return (
      props.modelValue || (props.defaultFirst ? props.options[0].value : "")
    );
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});
</script>
