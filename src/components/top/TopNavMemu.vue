<template>
  <div>
    <a
      v-for="menu in menus"
      :key="menu.id"
      class="hover:text-primary font-bold cursor-pointer text-xl "
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


