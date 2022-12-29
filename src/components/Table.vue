<template>
  <div class="overflow-x-auto">
    <table class="w-full mb-4">
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="index"
            :class="[
              'bg-white  text-left border-b border-neutral-300 text-sm text-neutral-500 py-3 px-2',
              field?.thClass,
            ]"
          >
            <IconKey
              class="w-3 mr-2 inline-block fill-neutral-400"
              v-if="index === 0"
            />{{ field.label }}

            <IconSort
              class="w-3 ml-2 inline-block fill-neutral-400 cursor-pointer hover:fill-neutral-500"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="border-b border-neutral-300 text-sm text-neutral-400 hover:bg-neutral-100"
        >
          <td
            v-for="(field, fieldsIndex) in fields"
            :key="fieldsIndex"
            :class="['py-3 px-2 text-left']"
          >
            <slot :name="field.key" :data="item">
              {{ item[field.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import IconSort from "./icons/IconSort.vue";
import IconKey from "./icons/IconKey.vue";
export default {
  name: "BaseTable",
};
</script>
<script setup>
defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
