ß<template>
  <div class="flex h-full">
    <div class="flex flex-col space-y-4 flex-1">
      <!-- top -->
      <ContentCenterHeader></ContentCenterHeader>
      <!-- body -->
      <ContentCenterBody :contents="contents"/>
    </div>
    <!-- preview -->
    <div class="flex" ref="el" :style="previewSectionStyle">
      <!-- <ResizeHandle
        class="h-full w-2 cursor-ew-resize bg-theme-border-divide-default transition-opacity hover:bg-theme-border-divide-hover"
        :el="el"
        @on-mouse-move="onMouseResizeMove"
        @on-mouse-down="onMouseResizeDown"
        @on-mouse-up="onMouseResizeUp"
      /> -->
      <ContentPreview />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  inject,
  onMounted
} from 'vue';
import { IContent } from '@/interface/ui';
import ContentCenterBody from './ContentCenterBody.vue';
import ContentPreview from './ContentPreview.vue';
import ContentCenterHeader from './ContentCenterHeader.vue';
import { IProvideContentInfo } from '@/interface/ui';

export default defineComponent({
  name: 'ContentCenterSide',
  components: {
    ContentCenterBody,
    ContentCenterHeader,
    ContentPreview
  },
  props: {
    contents: {
      type: Array,
      default: () => [] as  IContent[],
    },
  },
  setup() {
    const contentState = inject('contentState') as IProvideContentInfo;
    const previewPanelDefaultSize = 350;

    const state = reactive({
      minWidth: 350,
      previewResizeWidth: previewPanelDefaultSize
    });

    const previewSectionStyle = computed(() => {
      return{
        width: `${state.previewResizeWidth}px`,
        opacity: 1,
      }
    })

    const handlePreviewPanel = () => {
      state.previewResizeWidth = contentState.isShowPreviewPanel ? previewPanelDefaultSize : 0;
    } 

    onMounted(() => {
      handlePreviewPanel();
    })

    watch(
      () => contentState.isShowPreviewPanel,
      () => handlePreviewPanel()
    )
  
    return {
      ...toRefs(state),
      previewSectionStyle
    };
  },
});
</script>
