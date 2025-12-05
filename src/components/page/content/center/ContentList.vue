<template>
  <div class="overflow-x-scroll h-full bg-dark mt-4">
    <div class="min-w-[500px] mt-2 mr-2 mb-2 rounded-md bg-dark-deep" :style="{height: 'calc(100% - 2.5rem)'}">
      <table class="table-auto w-full border-separate border-spacing-y-4">
        <thead>
          <tr class="text-left divide-x divide-gray-200">
            <th class="pl-4">ACTIONS</th>
            <th class="pl-4">폴더</th>
            <th class="pl-4">기술스택</th>
            <th class="pl-4">제목</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="item in contentItems" 
            :key="item.id"
            @click="onClickItem(item)"
            :class="{
              'cursor-pointer hover:bg-primary/50' : selectedId !== item.id, 
              'bg-primary text-white': selectedId === item.id
            }"
          >
            <td>
              <ContentListItemAction class="pl-4" />
            </td>
            <td class="pl-4">{{ item.category.name }}</td>
            <td class="pl-4">
              <div class="flex space-x-2 items-center">
                <div v-for="techStack in item.techStack" :key="techStack">
                <TechStackChip :status="techStack" />
              </div>
              </div>
            </td>
            <td class="pl-4">{{ item.title }}</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import ContentListItemAction from '../listItem/ContentListItemAction.vue';
import type { IContent, IProvideContentInfo } from '@/interface/ui';
import type { PropType } from 'vue';
import TechStackChip from '@/components/chip/TechStackChip.vue';

export default defineComponent({
  components: {
    ContentListItemAction,
    TechStackChip
  },

  props: {
    contentItems: {
      type: Array as PropType<IContent[]>,
      default: () => [] as IContent[],
    },
  },

  setup() {
    const selectedId = ref<number | null>(null);
    const contentState = inject('contentState') as IProvideContentInfo;
    const onClickItem = (item: IContent) => {
      selectedId.value = item.id;
      contentState.selectedContent = item;
      contentState.isShowPreviewPanel = true;
    };

    return {
      selectedId,
      onClickItem,
    };
  },
});
</script>
