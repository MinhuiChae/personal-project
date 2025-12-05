<template>
  <GChip :color="color">{{ status }}</GChip>
</template>
 
<script>
import GChip from '../ui/GChip.vue';
import ETechStack from '@/enums/eTechStack';

export default {
  name: 'TechStackChip',
  components: { GChip },
  props: {
    status: {
      type: String,
      default: '',
    },
  },
  computed: {
    color() {
      let ret = '';
      switch (this.status) {
        case ETechStack.HTML5:
          ret = 'gray';
          break;
        case ETechStack.JSX:
          ret = 'red';
          break;
        case ETechStack.Javascript:
          ret = 'indigo';
          break;
        case ETechStack.PHP:
          ret = 'purple';
          break;
        case ETechStack.SCSS:
          ret = 'orange';
          break;
        case ETechStack.Tailwind:
          ret = 'blue';
          break;
        case ETechStack.Typescript:
          ret = 'yellow';
          break;
        case ETechStack.Vue3:
          ret = 'green';
          break;
        default:
          break;
      }
      return ret;
    },
  },
};
</script>

<style scoped></style>
