<template>
  <div class="flex flex-col flex-1 bg-dark text-white">
    <AppLayout tabindex="0">
      <template v-slot:top>
        <TopNav :menus="state.menus" />
      </template>
      <template v-slot:center>
        <CenterLayout>
          <template v-slot:left-panel>
            <div class="flex h-full" :style="previewSectionStyle">
              <ContentLeftSide
                class="bg-dark-deep"
                :category-list="state.categoryList"
              />
            </div>
          </template>
          <template v-slot:center-panel>
            <ContentCenterSide
              class="text-sm bg-dark-deep w-full"
              :contents="state.contents"
            />
          </template>
        </CenterLayout>
      </template>
    </AppLayout>
  </div>
</template>

<script lang="ts">
// import axios from 'axios';
import { IProvideCategoryInfo, IContent, IProvideContentInfo } from './interface/ui';
import { defineComponent, reactive, computed, onMounted, provide, watch } from 'vue';
import TopNav from './components/top/TopNav.vue';
import AppLayout from './components/layouts/AppLayout.vue';
import CenterLayout from './components/layouts/CenterLayout.vue';
import ContentLeftSide from './components/page/content/left/ContentLeftSide.vue';
import ContentCenterSide from './components/page/content/center/ContentCenterSide.vue';

export default defineComponent({
  name: 'App',
  components: {
    TopNav,
    AppLayout,
    CenterLayout,
    ContentLeftSide,
    ContentCenterSide
  },
  setup() {   
    const categoryPanelDefaultSize = 200
    //실제 프로젝트에서는 inertia를 통해 db데이터를 props로 받아와서 처리하였습니다. 
    const contents = [
    {
      id: 1,
      title: '1번 제목입니다.',
      content: '1번 내용입니다.',
      location: 'M',
      category: {
        id: 1,
        name: '컨텐츠팀'
      },
      register: '채민희 A'
    },
    {
      id: 2,
      title: '2번 제목입니다.',
      content: '2번 내용입니다.',
      location: 'S',
      category: {
        id: 2,
        name: '마케팅팀'
      },
      register: '채민희 B'
    },
    {
      id: 3,
      title: '3번 제목입니다.',
      content: '3번 내용입니다.',
      location: 'N',
      category: {
        id: 3,
        name: '개발팀'
      },
      register: '채민희 C'
    },
  ] as IContent[]

    const state = reactive ({
      menus:[
        {
          id: 1,
          name: 'MY'
        },
        {
          id: 2,
          name: '검색'
        },
         {
          id: 3,
          name: '요청'
        }
      ],
      categoryList: [
         {
          id: 1,
          name: '컨텐츠팀'
        },
        {
          id: 2,
          name: '마케팅팀'
        },
         {
          id: 3,
          name: '개발팀'
        }
      ],
      contents: contents,
      previewResizeWidth: categoryPanelDefaultSize
    })

    // 카테고리 정보 공유
    const categoryState = reactive({
      currentCategory: JSON.parse(localStorage.getItem('currentCategory')),
      isShowCategoryPanel: true
    }) as IProvideCategoryInfo

    // 컨텐츠 정보 공유
    const contentState = reactive({
      selectedContent: {} as IContent
    }) as IProvideContentInfo

    provide('categoryState', categoryState);
    provide('contentState', contentState);

    const previewSectionStyle = computed(() => {
      return{
        width: `${state.previewResizeWidth}px`,
        opacity: 1,
      }
    })

    const handleCategoryPanel = () => {
      state.previewResizeWidth = categoryState.isShowCategoryPanel ? categoryPanelDefaultSize : 0;
    }

    const filterContent = () => {
      state.contents = contents;
      if(categoryState.currentCategory?.id) {
        state.contents = state.contents.filter((content: IContent) => content.category.id === categoryState.currentCategory.id)
      }
    }

    onMounted(() => {
      // 임의로 화면단에서 filter처리
      filterContent()
    })

    watch(
      () => categoryState.isShowCategoryPanel,
      () => handleCategoryPanel()
    )

    watch(
      () => categoryState.currentCategory,
      () => filterContent()
    )

    return {
      state,
      previewSectionStyle 
    }
  }
});
</script>

<style lang="scss">

</style>
