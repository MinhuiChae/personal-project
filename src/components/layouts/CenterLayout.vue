<template>
  <div class="flex w-full overflow-hidden ">
    <div class = ''>
      <slot name="left-panel" />
    </div>

    <!-- 콘텐츠 영역 -->
    <div class ='flex-1 h-auto overflow-hidden'>
      <slot name="center-panel" />
    </div>

    <!-- 우측 패널 -->
    <div>
      <slot name="right-panel" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {

  },
})
</script>
