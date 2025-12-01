<template>
   <div class="flex ml-2">
    <div
      class="mr-2 flex items-center justify-center bg-theme-primary text-theme-text-tab-active font-600 pl-4 pr-4 h-filter-button rounded-half cursor-pointer"
      v-tooltip="'tooptip'"
    >
      <FilterSearchIcon class="fill-theme-text-tab-active h-4 w-4" />
      <span class="pl-1">{{ categoryState.currentCategory.name}}</span>
      <XIcon
        class="fill-theme-text-tab-active h-4 w-4 rounded-full hover:opacity-50"
       
      />
    </div>
  </div>
</template>
<script lang="ts">
import FilterSearchIcon from '@/components/icon/FilterSearchIcon.vue';
import XIcon from '@/components/icon/XIcon.vue';
import {
  defineComponent,
  reactive,
  toRefs,
  inject
} from 'vue';

export default defineComponent({
  name: 'ContentCenterHeader',
  components: {
    FilterSearchIcon,
    XIcon
  },
  props: {
    contents: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const categoryState = inject('categoryState') as any;
    const state = reactive({
      
    });

    return {
      ...toRefs(state),
      categoryState
    };
  },
});
</script>
