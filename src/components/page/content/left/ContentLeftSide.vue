<template>
  <div class="flex flex-col w-full h-full pl-4 pt-2 mr-2">
    <div class="flex-1 overflow-hidden flex flex-col space-y-2" >
        <div v-for="category in categoryList"
        :key="category.id"
        class="hover:text-primary cursor-pointer"
        >
          {{ category.name }}
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
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
    const state = reactive({
        
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style></style>

