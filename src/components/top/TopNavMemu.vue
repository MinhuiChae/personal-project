<template>
  <div class="h-18 relative">
    <a
      v-for="menu in menus"
      :key="menu.id"
      @click.stop="onChangeMenu(menu)"
    >
      {{ menu.name }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    menus: {
      type: Array,
      default: () => [] as any[],
    },
  },
  setup() {
    const onChangeMenu = (name: string) => {
      console.error('change menu?', name);
    };


    return {
      onChangeMenu
    };
  },
});
</script>


