<!-- eslint-disable prettier/prettier -->
<template>
  <div class="flex h-full">
    <div class="flex flex-col flex-1">
    <!-- body -->
    <ContentCenterBody :contents="contents"/>
    <!-- footer -->
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
} from 'vue';
import ContentCenterBody from './ContentCenterBody.vue';

export default defineComponent({
  name: 'ContentCenterSide',
  components: {
    ContentCenterBody,
  },
  props: {
    contents: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const state = reactive({
      selectedContentItem: null,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
