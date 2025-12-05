<template>
  <span
    class="inline-flex whitespace-nowrap items-center px-2.5 py-1 rounded-full text-xs font-medium"
    :class="[bgColor, textColor]"
  >
    {{ text }}
    <slot v-if="!text" />
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const colorMap = {
  gray: ["bg-gray-100", "text-gray-800"],
  red: ["bg-red-100", "text-red-800"],
  yellow: ["bg-yellow-100", "text-yellow-800"],
  blue: ["bg-blue-100", "text-blue-800"],
  green: ["bg-green-100", "text-green-800"],
  indigo: ["bg-indigo-100", "text-indigo-800"],
  purple: ["bg-purple-100", "text-purple-800"],
  pink: ["bg-pink-100", "text-pink-800"],
  orange:["bg-orange-100", "text-orange-800"],
};

export default defineComponent({
  name: "GChipTs",
  props: {
    text: {
      type: [String, Number],
      default: "",
    },
    color: {
      type: String as PropType<keyof typeof colorMap>,
      required: true,
    },
  },
  setup(props) {
    const [bgColor, textColor] = colorMap[props.color];

    return { bgColor, textColor };
  },
});
</script>
