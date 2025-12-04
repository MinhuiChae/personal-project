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
        class="h-full w-2 cursor-ew-resize transition-opacity rounded-full"
        :class="[
          isDragging ? 'bg-primary' : 'bg-dark hover:bg-primary/70'
        ]"
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
  onMounted,
  ref
} from 'vue';
import { IContent } from '@/interface/ui';
import ContentCenterBody from './ContentCenterBody.vue';
import ContentPreview from './ContentPreview.vue';
import ContentCenterHeader from './ContentCenterHeader.vue';
import { IProvideContentInfo } from '@/interface/ui';
// import ResizeHandle from '@/components/common/ResizeHandle.vue';

export default defineComponent({
  name: 'ContentCenterSide',
  components: {
    ContentCenterBody,
    ContentCenterHeader,
    ContentPreview,
    // ResizeHandle
  },
  props: {
    contents: {
      type: Array,
      default: () => [] as  IContent[],
    },
  },
  setup() {
    const el = ref<HTMLElement>();
    const contentState = inject('contentState') as IProvideContentInfo;
    const previewPanelDefaultSize = 400;

    const state = reactive({
      minWidth: 350,
      previewResizeWidth: previewPanelDefaultSize,
      previewResizeMinWidth: previewPanelDefaultSize,
      previewResizeMaxWidth: 420,
      isDragging: false
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

    const onMouseResizeMove = (size: number) => {
      state.previewResizeWidth = Math.min(
        Math.max(size, state.previewResizeMinWidth),
        state.previewResizeMaxWidth
      );
    };

    const onMouseResizeDown = () => {
      state.isDragging = true;
    }

    const onMouseResizeUp = () => {
      state.isDragging = false;
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
      previewSectionStyle,
      el,
      onMouseResizeMove,
      onMouseResizeDown,
      onMouseResizeUp
    };
  },
});
</script>
