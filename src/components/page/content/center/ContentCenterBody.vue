<template>
  <div class="flex-1 w-full h-full">
    <span class="text-primary ml-2"> 총 {{ contents.length }} 개</span>
    <ContentList
      :content-items="contents"
    ></ContentList>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
} from 'vue';
import ContentList from './ContentList.vue';
import { IContent } from '@/interface/ui';
import type { PropType } from 'vue';
export default defineComponent({
  inheritAttrs: false,
  components: {
    ContentList,
  },
  emits: ['on-context-menu'],
  props: {
    contents: {
     type: Array as PropType<IContent[]>,
      default: () => [] as IContent[],
    },
    
  },
  setup() {
    const state = reactive({
      isOpenContextMenu: false,
      contextMenuPosition: {
        top: 0,
        left: 0,
      },
      selectedContentItems: [] as any[],
    });

    const contextMenuRef = ref(null as any);

    const onContextMenuAction = () => (state.isOpenContextMenu = false);
    const onContextMenu = (data: any) => {
      const { toggle, position, selectedContentItems } = data;
      state.isOpenContextMenu = toggle;
      state.contextMenuPosition = position;
      state.selectedContentItems = selectedContentItems;
    };

    return {
      onContextMenu,
      onContextMenuAction,
      ...toRefs(state),
      contextMenuRef,
    };
  },
});
</script>
<style scoped>
.scroll-test::-webkit-scrollbar {
  color: transparent;
  width: 10px;
  background-color: transparent;
}

.scroll-test:hover::-webkit-scrollbar-thumb {
  background-color: #ff6b01;
  border-radius: 12px;
}
</style>
