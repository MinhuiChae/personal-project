<template>
  <div class="flex h-full w-full p-2">
    <div
      id="preview-panel"
      class="dark:bg-dark-deep w-full"
    >
      <div class="top-0 sticky z-20">
        <div
          class="border-b bg-white dark:bg-dark border-gray-200 dark:border-dark-border px-2 py-3 sm:px-3 rounded-t-lg flex items-center justify-between"
        >
          <div class="flex items-center">
            {{ contentState.selectedContent.title }}
          </div>
          <XIcon class="cursor-pointer" @click="closePreviewPanel"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  inject,
} from 'vue';
import { IProvideContentInfo } from '@/interface/ui';
import XIcon from '@/components/icon/XIcon.vue';

export default defineComponent({
  name: 'ContentCenterSide',
  components: {
    XIcon 
  },
  props: {
  },
  setup() {
    const contentState = inject('contentState') as IProvideContentInfo;

    const state = reactive({
    });

    const closePreviewPanel = () => {
      contentState.isShowPreviewPanel = false;
    }

    return {
      ...toRefs(state),
      contentState,
      closePreviewPanel
    };
  },
});
</script>