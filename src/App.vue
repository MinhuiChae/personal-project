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
import { IProvideCategoryInfo } from './interface/ui';
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
    //실제 프로젝트에서는 inertia를 통해 db데이터를 props로 받아와서 처리하였습니다. 
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
          name: 'A부서'
        },
        {
          id: 2,
          name: 'B부서'
        },
         {
          id: 3,
          name: 'C부서'
        }
      ],
      contents: [
         {
          id: 1,
          name: 'A부서'
        },
        {
          id: 2,
          name: 'B부서'
        },
         {
          id: 3,
          name: 'C부서'
        }
      ],
      previewResizeWidth: 200
    })

    const categoryState = reactive({
      currentCategory: JSON.parse(localStorage.getItem('currentCategory')),
      isShowCategoryPanel: true
    }) as IProvideCategoryInfo

    provide('categoryState', categoryState);

    const previewSectionStyle = computed(() => {
      return{
        width: `${state.previewResizeWidth}px`,
        opacity: 1,
      }
    })

    const handleCategoryPanel = () => {
      state.previewResizeWidth = categoryState.isShowCategoryPanel ? 200 : 0;
    }

    onMounted(() => {
    })

    watch(
      () => categoryState.isShowCategoryPanel,
      () => handleCategoryPanel()
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
