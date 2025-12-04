<template>
  <div class="flex flex-col flex-1 bg-dark text-white">
    <AppLayout tabindex="0">
      <template v-slot:top>
        <TopNav :menus="state.menus" />
      </template>
      <template v-slot:center>
        <CenterLayout>
          <template v-slot:left-panel>
            <div class="flex h-full" ref="el" :style="previewSectionStyle">
              <ContentLeftSide
                class="bg-dark-deep"
                :category-list="state.categoryList"
              />
              <ResizeHandle
                class="h-full w-2 cursor-ew-resize transition-opacity rounded-full"
                :class="[
                  state.isDragging ? 'bg-primary' : 'bg-dark hover:bg-primary/70'
                ]"
                :el="el"
                :elPosition="'left'"
                @on-mouse-move="onMouseResizeMove"
                @on-mouse-down="onMouseResizeDown"
                @on-mouse-up="onMouseResizeUp"
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
import { defineComponent, reactive, computed, onMounted, provide, watch, ref } from 'vue';
import TopNav from './components/top/TopNav.vue';
import AppLayout from './components/layouts/AppLayout.vue';
import CenterLayout from './components/layouts/CenterLayout.vue';
import ContentLeftSide from './components/page/content/left/ContentLeftSide.vue';
import ContentCenterSide from './components/page/content/center/ContentCenterSide.vue';
import ResizeHandle from './components/common/ResizeHandle.vue';

export default defineComponent({
  name: 'App',
  components: {
    TopNav,
    AppLayout,
    CenterLayout,
    ContentLeftSide,
    ContentCenterSide,
    ResizeHandle
  },
  setup() {   
    const el = ref<HTMLElement>();
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
    {
      id: 4,
      title: '4번 제목입니다.',
      content: '4번 내용입니다.',
      location: 'O',
      category: {
        id: 3,
        name: '개발팀'
      },
      register: '채민희 D'
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
      previewResizeWidth: categoryPanelDefaultSize,
      previewResizeMinWidth: categoryPanelDefaultSize,
      previewResizeMaxWidth: 420,
      isDragging: false
    })

    // 카테고리 정보 공유
    const categoryState = reactive({
      currentCategory: JSON.parse(localStorage.getItem('currentCategory')),
      isShowCategoryPanel: true
    }) as IProvideCategoryInfo

    // 컨텐츠 정보 공유
    const contentState = reactive({
      selectedContent: {} as IContent,
      isShowPreviewPanel: false
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

    const onMouseResizeMove = (size: number) => {
      state.previewResizeWidth = Math.min(
        Math.max(size, state.previewResizeMinWidth),
        state.previewResizeMaxWidth
      );
    };

    const onMouseResizeDown = () => {
      state.isDragging = true;
    }

    const onMouseResizeUp = () => {
      state.isDragging = false;
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
      el,
      state,
      previewSectionStyle,
      onMouseResizeMove,
      onMouseResizeUp,
      onMouseResizeDown
    }
  }
});
</script>

<style lang="scss">

</style>
