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
import ETechStack from './enums/eTechStack';

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
      title: '연합뉴스TV Premiere panel 연동',
      content: `연합뉴스TV 기자가 영상편집부에 편집을 의뢰하는 페이지 개발\n편집된 영상을 기자가 확인하고 승인/반려 할 수 있도록 구현\npremiere 와 연동하여 편집한 영상을 웹사이트에 바로 등록할 수 있도록 구현 \npremiere과 웹화면은 iframe을 통해 데이터를 송수신`,
      techStack: [
        ETechStack.PHP,
        ETechStack.JSX,
        ETechStack.Tailwind,
        ETechStack.Typescript,
        ETechStack.Vue3
      ],
      category: {
        id: 1,
        name: '연합뉴스TV'
      }
    },
    {
      id: 2,
      title: 'SBS Premiere panel 연동',
      content: `SBS 웹사이트에서 premiere pro와 연동하여 구간정보 입력가능하게 구현 \n구간정보에 동적으로 색상마킹이 가능하도록 구현\n편집한 영상을 웹사이트에 등록할 수 있도록 구현`,
      techStack: [
        ETechStack.JSX,
        ETechStack.SCSS,
        ETechStack.Typescript,
        ETechStack.Vue3
      ],
      category: {
        id: 2,
        name: 'SBS'
      }
    },
    {
      id: 3,
      title: 'MBC Premiere panel 렌더링 자동화',
      content: `Adobe Media Encoder 를 통해 백그라운드에서 편집된 영상 렌더링 가능하게 구현\n렌더링 된 영상을 웹사이트에 등록할 수 있도록 구현`,
      techStack: [
        ETechStack.JSX,
        ETechStack.SCSS,
        ETechStack.Javascript,
        ETechStack.HTML5
      ],
      category: {
        id: 3,
        name: 'MBC'
      }
    },
    {
      id: 4,
      title: 'WEB NLE 개발',
      content: `웹에서 영상을 편집 할 수 있는 사이트 구현 \n컷편집, fade in, fade out, 회전 등등 편집에 필요한 기능 구현`,
      techStack: [
        ETechStack.Tailwind,
        ETechStack.SCSS,
        ETechStack.Typescript,
        ETechStack.Vue3
      ],
      category: {
        id: 4,
        name: 'WEB NLE'
      }
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
          name: '연합뉴스TV'
        },
        {
          id: 2,
          name: 'SBS'
        },
        {
          id: 3,
          name: 'MBC'
        },
         {
          id: 4,
          name: 'WEB NLE'
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
