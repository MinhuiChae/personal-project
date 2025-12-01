<template>
  <DotsVerticalIcon
    class="cursor-pointer pr-2 w-6"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { DotsVerticalIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    DotsVerticalIcon
  },
  props: {
    contentItems: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
