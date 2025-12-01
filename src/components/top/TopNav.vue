<template>
  <div class="flex items-top justify-between w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2">
    <div class="flex flex-1">
      <TopNavMemu :menus="menus" class="hidden space-x-4 md:ml-10 md:flex items-center"/>
      <div class="flex flex-1 items-center pl-2">
        <SearchInput class="ml-2 mr-4 w-full max-w-md"></SearchInput>
      </div>
       <div class="md:flex space-x-2 md:items-center">
        <div class="hover:text-primary cursor-pointer">
          Upload
        </div>
        <div>
          Profile
        </div>
       </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted} from 'vue';
import TopNavMemu from './TopNavMemu.vue';
import SearchInput from './search/SearchInput.vue';
export default defineComponent({
  components: {
    TopNavMemu,
    SearchInput
  },
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    onMounted(() => {});

    return {
    };
  },
});
</script>
