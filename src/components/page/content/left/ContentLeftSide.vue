<template>
  <div class="flex flex-col w-full h-full pt-2 mr-2">
    <div class="flex-1 overflow-hidden flex flex-col space-y-2">
      <div v-for="category in categoryList"
        :key="category.id"
        @click.stop="changeCategory(category)"
        class="cursor-pointer p-2"
        :class="{
          'bg-primary text-white': categoryState.currentCategory?.id === category.id,
          'hover:bg-primary/50': categoryState.currentCategory?.id !== category.id
        }"
      >
        {{ category.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ICategory, IProvideCategoryInfo } from '@/interface/ui';
import {
  defineComponent,
  reactive,
  toRefs,
  inject,
  onMounted
} from 'vue';
export default defineComponent({
  components: {
  },
  props: {
     categoryList: {
      type: Object,
      default: () => {},
    },
  },
  
  setup() {
    const categoryState = inject('categoryState') as IProvideCategoryInfo;
    const state = reactive({
    });

    const changeCategory = (category: ICategory) => {
      // 현재 로컬에 카테고리 정보 저장
      categoryState.currentCategory= category;
      localStorage.setItem('currentCategory', JSON.stringify(category));
    }

    onMounted(() => {

    })

    return {
      ...toRefs(state),
      categoryState,
      changeCategory,
    }
  }

});
</script>
<style></style>

