<template>
  <ul class="choice-list">
    <li class="text-neutral-500 p-3 font-bold text-sm uppercase">
      {{ title }}
    </li>
    <li v-for="(choice, index) in choices" :key="index">
      <label
        :for="`choice-${name}-${choice.value}`"
        class="flex items-center px-3 py-1 cursor-pointer hover:bg-neutral-100"
      >
        <input
          :id="`choice-${name}-${choice.value}`"
          type="checkbox"
          :value="choice.value"
          :name="name"
          class="mr-2"
          v-model="choiceValue"
        />
        {{ choice.text ?? choice.value }}
      </label>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  choices: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "choice",
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "change"]);
const choiceValue = ref([]);

watch(
  () => choiceValue.value,
  (newVal) => {
    emit("update:modelValue", newVal);
    emit("change", newVal);
  }
);

watch(
  () => props.modelValue,
  (newVal) => {
    choiceValue.value = newVal;
  },
  { immediate: true }
);
</script>
