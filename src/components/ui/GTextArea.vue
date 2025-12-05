<template>
  <div class="flex flex-col space-y-1">
    <label>{{ name }}</label>
    <textarea
      ref="input"
      class="hadow-none block w-full rounded-lg py-1 px-2 font-400 text-base bg-dark-secondary"
      :value="value"
      :rows="rows"
      :readonly="readonly"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'GTextareaReadonly',

  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 5,
    },
    readonly: {
      type: Boolean,
      default: true, // default = 읽기 전용
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const input = ref<HTMLElement | null>(null);

    return {
      input,
    };
  },
};
</script>

<style scoped>
textarea:focus {
  outline: none !important;
}
</style>
