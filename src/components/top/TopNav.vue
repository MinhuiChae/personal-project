<template>
  <div class="flex items-top justify-between w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-1">
      <TopNavMemu :menus="menus" class="hidden space-x-1 md:-my-px md:ml-10 md:flex"/>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted} from 'vue';
import TopNavMemu from './TopNavMemu.vue';
export default defineComponent({
  components: {
    TopNavMemu,
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
