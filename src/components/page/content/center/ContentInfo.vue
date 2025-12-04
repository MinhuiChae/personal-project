<template>
  <div class="flex flex-col space-y-4 w-[95%] mt-4">
    <!-- 컨텐츠 내용 -->
    <GInput
      :name="'내용'"
      :readonly="true"
      :disabled="true"
      :value="contentState.selectedContent?.content"
     />
     <!-- 컨텐츠 카테고리 -->
     <GInput
      :name="'폴더'"
      :readonly="true"
      :disabled="true"
      :value="contentState.selectedContent?.category?.name"
     />
     <!-- 컨텐츠 위치정보 -->
     <GInput
      :name="'위치정보'"
      :readonly="true"
      :disabled="true"
      :value="contentState.selectedContent?.location"
     />
     <!-- 컨텐츠 등록자 -->
     <GInput
      :name="'등록자'"
      :readonly="true"
      :disabled="true"
      :value="contentState.selectedContent?.register"
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
export default defineComponent({
  name: 'ContentInfo',
  components: {
    GInput
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