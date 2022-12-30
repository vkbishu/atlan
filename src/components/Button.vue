<template>
  <button
    :type="type"
    :class="[
      'px-3 py-2 font-medium inline-flex items-center text-sm rounded-lg disabled:opacity-75 disabled:cursor-not-allowed',
      {
        'bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600':
          variant === 'primary',
      },
      {
        'bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-800':
          variant === 'secondary',
      },
      {
        'text-neutral-500  hover:bg-neutral-200 active:bg-neutral-300':
          !variant,
      },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
};
</script>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "", // primary, secondary
  },
  type: {
    type: String,
    default: "button", // button, submit
  },
});
</script>
