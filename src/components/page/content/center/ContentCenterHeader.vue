<template>
  <div class="flex">
    <div
      class="mr-2 flex items-center justify-center font-600 pl-4 pr-4 mt-4 rounded-xl cursor-pointer min-h-[32px]"
      :class="categoryState.currentCategory 
        ? 'bg-primary text-white' 
        : 'bg-transparent'"
    >
      <template v-if="categoryState.currentCategory">
        <FilterSearchIcon class="fill-white h-4 w-4" />
        <span class="pl-1">{{ categoryState.currentCategory.name }}</span>
        <XIcon
          class="fill-white h-4 w-4 rounded-full hover:opacity-50 ml-1"
          @click="deleteMyFilter"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import FilterSearchIcon from '@/components/icon/FilterSearchIcon.vue';
import XIcon from '@/components/icon/XIcon.vue';

export default defineComponent({
  name: 'ContentCenterHeader',
  components: {
    FilterSearchIcon,
    XIcon
  },
  setup() {
    const categoryState = inject('categoryState') as any;

    const deleteMyFilter = () => {
      localStorage.removeItem('currentCategory');
      categoryState.currentCategory = null;
    };

    return { categoryState, deleteMyFilter };
  }
});
</script>
