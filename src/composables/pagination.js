import { computed } from "vue";

export default function usePagination(items, currentPage, perPage) {
  const paginationInfo = computed(() => {
    const offset = (currentPage.value - 1) * perPage.value;
    const limit = offset + perPage.value;
    const resultTotal = items.value.length;
    const startText = offset + 1;
    const endText = limit > resultTotal ? resultTotal : limit;
    return {
      offset,
      limit,
      startText,
      endText,
      resultTotal,
    };
  });

  const pageCount = computed(() => {
    return Math.ceil(paginationInfo.value.resultTotal / perPage.value);
  });

  const paginatedItems = computed(() => {
    return items.value.slice(
      paginationInfo.value.offset,
      paginationInfo.value.limit
    );
  });

  return {
    paginatedItems,
    paginationInfo,
    pageCount,
  };
}
