<template>
  <div @mousedown.stop.prevent="onMouseDown"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  emit: ['on-mouse-move', 'on-mouse-up', 'on-mouse-down'],
  props: {
    handleType: {
      type: String,
      default: 'w', // w or h
    },
    el: {
      type: Element,
      default: null,
    },
    elPosition: {
      type: String,
      default: 'right',
    },
  },
  setup(props, context) {
    const state = reactive({
      startX: 0,
      startWidth: 0,
    });

    const onMouseDown = (e: MouseEvent) => {
      const rect = (props.el as HTMLElement).getBoundingClientRect();
      state.startX = e.clientX;
      state.startWidth = rect.width;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      context.emit('on-mouse-down');
    };

    const onMouseMove = (e: MouseEvent) => {
      let currentWidth = state.startWidth - (e.clientX - state.startX);
      if (props.elPosition === 'left')
        currentWidth = state.startWidth + (e.clientX - state.startX);
      context.emit('on-mouse-move', currentWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      context.emit('on-mouse-up');
    };

    onMounted(() => {});

    return {
      onMouseDown,
    };
  },
});
</script>
