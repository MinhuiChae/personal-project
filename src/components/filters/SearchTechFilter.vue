<template>
  <div class="flex flex-col bg-dark-secondary rounded-xl w-[200px] pb-4">
    <div
      class="border-b bg-white dark:bg-dark border-gray-200 dark:border-dark-border px-2 py-3 sm:px-3 rounded-t-lg flex items-center justify-between"
    >
      <span>기술스택 필터</span>
      <XIcon @click="$emit('on-close-filter')"/>
    </div>
    <div class="pl-2 space-y-2">
      <div class="flex justify-end pr-2 pt-2 space-x-2">
        <div @click="$emit('on-refresh-filter')" class="bg-primary p-1 rounded-md">
          <RefreshIcon class="h-5 w-5"/>
        </div>
        <div @click="$emit('on-search-filter')" class="p-1 rounded-md" :class="selectedTechs.length > 0 ? 'bg-primary' : 'bg-primary/50'">
          <SearchIcon class="h-5 w-5"/>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <TechStackChip
          v-for="tech in techStackList"
          :key="tech"
          :status="tech"
          :selected="selectedTechs.includes(tech)"
          @click="$emit('on-add-filter', tech)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { RefreshIcon, SearchIcon } from '@heroicons/vue/outline';
import TechStackChip from '@/components/chip/TechStackChip.vue';
import ETechStack from '@/enums/eTechStack';
import XIcon from '@/components/icon/XIcon.vue';

export default defineComponent({
  components: {
    TechStackChip,
    RefreshIcon,
    SearchIcon,
    XIcon
  },
  props: {
    selectedTechs: {
      type: Array,
      default: [] as ETechStack[]
    }
  },
  setup() {
    const techStackList = Object.values(ETechStack);
    return { 
      techStackList
    }
  }
})
</script>