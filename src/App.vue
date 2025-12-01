<template>
  <div class="flex flex-col flex-1 bg-dark text-white">
    <AppLayout tabindex="0">
      <template v-slot:top>
        <TopNav :menus="state.menus" />
      </template>

      <template v-slot:center>
        <CenterLayout>
          <template v-slot:left-panel>
            <div class="flex h-full transition-all" :style="previewSectionStyle">
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
import { defineComponent, reactive, computed, onMounted, provide } from 'vue';
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
          name: 'menu1'
        },
        {
          id: 2,
          name: 'menu2'
        },
         {
          id: 3,
          name: 'menu3'
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
      currentCategory: JSON.parse(localStorage.getItem('currentCategory'))
    })

    provide('categoryState', categoryState);

    const previewSectionStyle = computed(() => {
      return{
        width: `${state.previewResizeWidth}px`,
        opacity: 1,
      }
    })

    onMounted(() => {
    })

    return {
      state,
      previewSectionStyle 
    }
  }
});
</script>

<style lang="scss">

</style>
