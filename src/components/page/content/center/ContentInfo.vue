<template>
  <div class="flex flex-col space-y-4 w-[95%] mt-4">
    <!-- 컨텐츠 내용 -->
    <GTextArea 
      :name="'내용'"
      :value="contentState.selectedContent?.content"
      :disabled="true"
      :rows="7"
    />
     <!-- 컨텐츠 카테고리 -->
    <GInput
    :name="'폴더'"
    :readonly="true"
    :disabled="true"
    :value="contentState.selectedContent?.category?.name"
    />
    <!-- 기술스택 -->
    <GInput
    :name="'기술스택'"
    :readonly="true"
    :disabled="true"
    :value="contentState.selectedContent?.techStack"
    />
  </div>
</template>
<script lang="ts">
  import {
  defineComponent,
  reactive,
  toRefs,
  inject,
  onMounted
} from 'vue';
import { IProvideContentInfo } from '@/interface/ui';
import GInput from '@/components/ui/GInput.vue';
import GTextArea from '@/components/ui/GTextArea.vue';
export default defineComponent({
  name: 'ContentInfo',
  components: {
    GInput,
    GTextArea
  },
  props: {},
  setup() {
    const contentState = inject('contentState') as IProvideContentInfo;

    const state = reactive({
    });
    onMounted(() => {
    })
  
    return {
      ...toRefs(state),
      contentState
    };
  },
});
</script>