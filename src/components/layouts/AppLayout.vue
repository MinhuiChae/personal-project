<template>
  <div class="flex flex-col h-screen w-full overflow-hidden">
    <div class="w-full flex">
      <slot name="top"></slot>
    </div>
    <div class="flex flex-1 overflow-hidden pt-4">
      <slot name="center"></slot>
    </div>
    <div class="flex flex-2 bg-theme-bg-default w-full justify-end">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
  },
});
</script>
