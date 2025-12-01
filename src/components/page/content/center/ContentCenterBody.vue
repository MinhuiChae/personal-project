<!-- eslint-disable prettier/prettier -->
<template>
  <div class="flex h-full">
    <div class="flex flex-col flex-1">
        dd
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
} from 'vue';

export default defineComponent({
  name: 'ContentCenterBody',
  components: {
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
