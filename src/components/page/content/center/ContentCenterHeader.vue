<template>
  <div class="flex items-center bg-dark space-x-2 mt-4 p-2 cursor-pointer">
    <!-- 닫기 버튼 -->
    <div class="flex items-center justify-center w-8 h-8">
      <LeftPanelCloseIcon class="fill-primary" v-if="categoryState.isShowCategoryPanel" @click.stop="categoryState.isShowCategoryPanel = false"/>
      <LeftPanelOpenIcon class="fill-primary" v-if="!categoryState.isShowCategoryPanel" @click.stop="categoryState.isShowCategoryPanel = true"/>
    </div>
    <!-- 필터 아이콘 -->
    <div
      class="cursor-pointer mr-1 flex items-center justify-center border-0 border-primary font-600 h-full"
    >
      <div
        class="h-8 w-8 flex items-center justify-center stroke-primary"
        @click="onShowTechFilter"
      >
        <FilterIcon />
      </div>
    </div>
    <!-- 프리미어 import button -->
    <div>
      <PremiereIcon 
        class="flex fill-primary mr-2" 
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

    <!-- 기술필터선택 -->
     <div class="absolute top-40">
      <div v-if="isShowFilter">
        <SearchTechFilter 
          :selected-techs="selectedTechs"
          @onCloseFilter="isShowFilter = false"
          @onRefreshFilter="selectedTechs.length = 0"
          @onSearchFilter="onSearchTechFilter"
          @onAddFilter="toggleTech"
        />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, inject, reactive, toRefs } from 'vue';
import { useToast } from 'vue-toastification';
import { IProvideCategoryInfo, IProvideContentInfo } from '@/interface/ui';
import ETechStack from '@/enums/eTechStack';
import SearchTechFilter from '@/components/filters/SearchTechFilter.vue';
// icon
import FilterSearchIcon from '@/components/icon/FilterSearchIcon.vue';
import XIcon from '@/components/icon/XIcon.vue';
import PremiereIcon from '@/components/icon/PremiereIcon.vue';
import FilterIcon from '@/components/icon/FilterIcon.vue';
import LeftPanelCloseIcon from '@/components/icon/LeftPanelCloseIcon.vue';
import LeftPanelOpenIcon from '@/components/icon/LeftPanelOpenIcon.vue';


export default defineComponent({
  name: 'ContentCenterHeader',
  components: {
    SearchTechFilter,
    FilterSearchIcon,
    XIcon,
    LeftPanelCloseIcon,
    LeftPanelOpenIcon,
    PremiereIcon,
    FilterIcon,
  },
  setup() {
    const toast = useToast();
    const categoryState = inject('categoryState') as IProvideCategoryInfo;
    const contentState = inject('contentState') as IProvideContentInfo;
    const techStackList = Object.values(ETechStack);

    const state = reactive({
      isShowFilter: false,
      selectedTechs: [] as ETechStack[]
    })
    
    const onClickPremiereBtn = () => {
      if(contentState.selectedContent.id)
      toast.success(`입수가 완료되었습니다.\n제목: ${contentState.selectedContent.title}`);
    }

    const deleteMyFilter = () => {
      localStorage.removeItem('currentCategory');
      categoryState.currentCategory = null;
    };

    const onShowTechFilter = () => {
      state.isShowFilter = !state.isShowFilter;
    }

    const toggleTech = (tech: ETechStack) => {
      if(state.selectedTechs.includes(tech)) {
        state.selectedTechs = state.selectedTechs.filter((t: ETechStack) => t!==tech)
      } else {
        state.selectedTechs.push(tech);
      }
    }

    // filter된 기술만 검색
    const onSearchTechFilter = () => {
      if(state.selectedTechs.length > 0) {
        console.error(state.selectedTechs)
        state.isShowFilter = false;
      }
    }

    return { 
      categoryState, 
      contentState,
      techStackList,
      ...toRefs(state),
      deleteMyFilter,
      onClickPremiereBtn,
      onShowTechFilter,
      onSearchTechFilter,
      toggleTech
    };
  }
});
</script>
