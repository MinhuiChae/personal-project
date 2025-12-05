<template>
  <div class="flex flex-col space-y-1">
    <label>{{ name }}</label>
    <textarea
      ref="input"
      class="hadow-none block w-full rounded-lg py-1 px-2 font-400 text-base bg-dark-secondary"
      :class="inputClass"
      :value="value"
      :rows="rows"
      :readonly="readonly"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

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

  setup(props) {
    const input = ref<HTMLElement | null>(null);

    const inputClass = computed(() => {
      if (props.disabled) {
        return 'disabled:text-theme-text-input-disable disabled:bg-theme-bg-input-disable disabled:border-theme-border-input-disable';
      }
      if (props.readonly) {
        return 'text-theme-text-input-readonly bg-theme-bg-input-readonly border-theme-border-input-readonly';
      }
      return 'bg-theme-bg-input-default border-theme-border-input-default';
    });

    return {
      input,
      inputClass,
    };
  },
};
</script>

<style scoped>
textarea:focus {
  outline: none !important;
}
</style>
