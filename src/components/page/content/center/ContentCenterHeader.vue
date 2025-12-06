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
      v-if="displayFilters.length > 0"
      class="flex flex-wrap items-center gap-2 px-4"
    >
      <div
        v-for="filter in displayFilters"
        :key="filter.key"
        class="flex items-center space-x-1 bg-primary text-white rounded-xl px-3 py-1 cursor-pointer"
      >
        <FilterSearchIcon class="h-4 w-4 fill-white" />
        <span>{{ filter.label }}</span>
        <XIcon
          class="h-4 w-4 fill-white rounded-full hover:opacity-50"
          @click.stop="deleteMyFilter(filter.type, filter.value)"
        />
      </div>
    </div>

    <!-- 기술필터선택 -->
     <div class="absolute top-40">
      <div v-if="isShowFilter">
        <SearchTechFilter 
          :selected-techs="tempTechs"
          @onCloseFilter="isShowFilter = false"
          @onRefreshFilter="tempTechs.length = 0"
          @onSearchFilter="onSearchTechFilter"
          @onAddFilter="toggleTech"
        />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, inject, reactive, toRefs, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { IProvideCategoryInfo, IProvideContentInfo } from '@/interface/ui';
import ETechStack from '@/enums/eTechStack';
import SearchTechFilter from '@/components/filters/SearchTechFilter.vue';
import EFilterValue from '@/enums/eFilterValue';
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
      tempTechs: [...(contentState.currentTech || [])],
    })
    
    const onClickPremiereBtn = () => {
      if(contentState.selectedContent.id)
      toast.success(`입수가 완료되었습니다.\n제목: ${contentState.selectedContent.title}`);
    }

    const deleteMyFilter = (type: EFilterValue, value: any) => {
      if (type === EFilterValue.Category) {
        categoryState.currentCategory = null;
        localStorage.removeItem('currentCategory');
      } else if (type === EFilterValue.Tech) {

        // tempTechs에서 삭제
        state.tempTechs = state.tempTechs.filter(
          (t: string) => t !== value
        );

        // contentState에도 반영
        contentState.currentTech = [...state.tempTechs];

        // localStorage 최신화 (완전히 갱신)
        if (state.tempTechs.length > 0) {
          localStorage.setItem('currentTech', JSON.stringify(state.tempTechs));
        } else {
          localStorage.removeItem('currentTech');
        }
      }
    };

    // filter된 기술만 검색
    const onSearchTechFilter = () => {
      contentState.currentTech = [...state.tempTechs];
      state.isShowFilter = false;
      localStorage.setItem('currentTech', JSON.stringify(contentState.currentTech));
    }
    
    const onShowTechFilter = () => {
      state.isShowFilter = !state.isShowFilter;
    }

   const toggleTech = (tech: ETechStack) => {
      if (state.tempTechs.includes(tech)) {
        state.tempTechs = state.tempTechs.filter((t: ETechStack) => t !== tech);
      } else {
        state.tempTechs.push(tech);
      }
    };

    const displayFilters = computed(() => {
      const list: { key: string; label: string; type: string; value: any }[] = [];

      // 카테고리 필터
      if (categoryState.currentCategory) {
        list.push({
          key: `category-${categoryState.currentCategory.id}`,
          label: categoryState.currentCategory.name,
          type: EFilterValue.Category,
          value: categoryState.currentCategory
        });
      }

      // 기술 필터들
      if(contentState.currentTech?.length > 0)
      contentState.currentTech.forEach((tech: string) => {
        list.push({
          key: `tech-${tech}`,
          label: tech,
          type: EFilterValue.Tech,
          value: tech
        });
      });

      return list;
    });


    return { 
      categoryState, 
      contentState,
      techStackList,
      ...toRefs(state),
      deleteMyFilter,
      onClickPremiereBtn,
      onShowTechFilter,
      onSearchTechFilter,
      toggleTech,
      displayFilters
    };
  }
});
</script>
