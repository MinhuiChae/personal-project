<template>
  <div class ="relative ">
    <div class="relative flex items-center border h-12 border-theme-primary bg-theme-bg-search-default rounded-md focus:outline-none focus:border-transparent focus:ring-0">
      <SearchIcon
          class="absolute ml-2 h-6 w-6 text-theme-primary cursor-pointer"
        />
      <input class="h-10 w-full pl-10 pr-10 outline-none text-theme-text-defualt rounded-md border-0 bg-transparent focus:ring-0"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { SearchIcon} from '@heroicons/vue/outline';
export default defineComponent({
  components: {
    SearchIcon,
  },
  setup() {
    const state = reactive({
    })


    return {
      ...toRefs(state),
    };
  },
});
</script>
<style scoped>
</style>
