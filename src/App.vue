<template>
<div class="flex flex-col flex-1">
  <AppLayout tabindex="0">
      <template v-slot:top>
        <TopNav :menus="state.menus" />
      </template>
      <template v-slot:center>
        <div>
          center init
        </div>
      </template> 
  </AppLayout>
</div>

</template>

<script lang="ts">
// import axios from 'axios';
import { defineComponent, reactive } from 'vue';
import TopNav from './components/top/TopNav.vue';
import AppLayout from './components/layouts/AppLayout.vue';
export default defineComponent({
  name: 'App',
  components: {
    TopNav,
    AppLayout
  },
  setup() {    
    const state = reactive ({
      menus:[
        {
          id: 1,
          name: 'menu1'
        },
        {
          id: 2,
          name: 'menu2'
        },
         {
          id: 3,
          name: 'menu3'
        }
      ]
    })
    return {
      state
    }
  }
});
</script>

<style lang="scss">

</style>
