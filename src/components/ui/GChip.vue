<template>
  <span
    class="inline-flex whitespace-nowrap items-center px-2.5 py-1 rounded-full text-xs font-medium"
    :class="`bg-${color}-100 text-${color}-800`"
  >
    {{ text }}
    <slot v-if="!text" />
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type ChipColor =
  | "gray"
  | "red"
  | "yellow"
  | "blue"
  | "green"
  | "indigo"
  | "purple"
  | "pink";

export default defineComponent({
  name: "GChipTs",
  props: {
    text: {
      type: [String, Number],
      default: "",
    },
    color: {
      type: String as PropType<ChipColor>,
      required: true,
    },
  },
});
</script>
<style>
.text-orange-800 {
  color: #9c4221;
}
</style>