<template>
  <div class="flex items-center space-x-2 mt-4">
    <!-- 닫기 버튼 -->
    <div class="flex items-center justify-center w-8 h-8 cursor-pointer">
      <LeftPanelCloseIcon class="fill-primary" v-if="categoryState.isShowCategoryPanel" @click.stop="categoryState.isShowCategoryPanel = false"/>
      <LeftPanelOpenIcon class="fill-primary" v-if="!categoryState.isShowCategoryPanel" @click.stop="categoryState.isShowCategoryPanel = true"/>
    </div>

    <!-- 선택된 필터 표시 -->
    <div
      v-if="categoryState.currentCategory"
      class="flex items-center space-x-1 px-4 py-1 bg-primary text-white rounded-xl cursor-pointer"
    >
      <FilterSearchIcon class="h-4 w-4 fill-white" />
      <span>{{ categoryState.currentCategory.name }}</span>
      <XIcon
        class="h-4 w-4 fill-white rounded-full hover:opacity-50"
        @click="deleteMyFilter"
      />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, inject } from 'vue';
import FilterSearchIcon from '@/components/icon/FilterSearchIcon.vue';
import XIcon from '@/components/icon/XIcon.vue';
import LeftPanelCloseIcon from '@/components/icon/LeftPanelCloseIcon.vue';
import LeftPanelOpenIcon from '@/components/icon/LeftPanelOpenIcon.vue';

export default defineComponent({
  name: 'ContentCenterHeader',
  components: {
    FilterSearchIcon,
    XIcon,
    LeftPanelCloseIcon,
    LeftPanelOpenIcon
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
