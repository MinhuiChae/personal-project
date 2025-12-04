<template>
  <div class="flex flex-col space-y-1">
    <label>{{ name }}</label>
    <input
      class="shadow-none block w-full rounded-lg py-1 px-2 font-400 text-base bg-dark-secondary"
      :type="type"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
    />
  </div>
</template>
<script lang="ts">
  import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from 'vue';
export default defineComponent({
  name: 'GInput',
  components: {
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  setup() {

    const state = reactive({
    });
    onMounted(() => {
    })
  
    return {
      ...toRefs(state),
    };
  },
});
</script>