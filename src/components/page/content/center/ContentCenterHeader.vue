<template>
  <div class="flex items-center bg-dark space-x-2 mt-4 p-2 cursor-pointer">
    <!-- 닫기 버튼 -->
    <div class="flex items-center justify-center w-8 h-8">
      <LeftPanelCloseIcon class="fill-primary" v-if="categoryState.isShowCategoryPanel" @click.stop="categoryState.isShowCategoryPanel = false"/>
      <LeftPanelOpenIcon class="fill-primary" v-if="!categoryState.isShowCategoryPanel" @click.stop="categoryState.isShowCategoryPanel = true"/>
    </div>
    <!-- 프리미어 import button -->
    <div>
      <PremiereIcon 
        class="fill-primary mr-2" 
        :class="{
          'fill-primary/50' : !contentState.selectedContent?.id
        }"
        @click="onClickPremiereBtn()"
      />
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
import { useToast } from 'vue-toastification';
import FilterSearchIcon from '@/components/icon/FilterSearchIcon.vue';
import XIcon from '@/components/icon/XIcon.vue';
import PremiereIcon from '@/components/icon/PremiereIcon.vue';
import LeftPanelCloseIcon from '@/components/icon/LeftPanelCloseIcon.vue';
import LeftPanelOpenIcon from '@/components/icon/LeftPanelOpenIcon.vue';
import { IProvideCategoryInfo, IProvideContentInfo } from '@/interface/ui';

export default defineComponent({
  name: 'ContentCenterHeader',
  components: {
    FilterSearchIcon,
    XIcon,
    LeftPanelCloseIcon,
    LeftPanelOpenIcon,
    PremiereIcon
  },
  setup() {
    const toast = useToast();
    const categoryState = inject('categoryState') as IProvideCategoryInfo;
    const contentState = inject('contentState') as IProvideContentInfo;
    
    const onClickPremiereBtn = () => {
      toast.success(`입수가 완료되었습니다.\n제목: ${contentState.selectedContent.title}`);
    }

    const deleteMyFilter = () => {
      localStorage.removeItem('currentCategory');
      categoryState.currentCategory = null;
    };

    return { 
      categoryState, 
      contentState,
      deleteMyFilter,
      onClickPremiereBtn 
    };
  }
});
</script>
