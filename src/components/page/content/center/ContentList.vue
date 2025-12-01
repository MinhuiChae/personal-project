<template>
  <div class="overflow-x-scroll">
    <div class="min-w-[800px]">
      <table class="table-auto w-full border-separate border-spacing-y-4">

        <thead>
          <tr class="text-left divide-x divide-gray-200">
            <th class="pl-4">ACTIONS</th>
            <th class="pl-4">위치정보</th>
            <th class="pl-4">폴더</th>
            <th class="pl-4">제목</th>
            <th class="pl-4">내용</th>
            <th class="pl-4">등록자</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in contentItems" :key="item.id">
            <td> 
              <ContentListItemAction class="pl-4" />
            </td>
             <td class="pl-4"> {{ item.location }}</td>
            <td class="pl-4">{{ item.category.name }}</td>
            <td class="pl-4">{{ item.title }}</td>
            <td class="pl-4">{{ item.content }}</td>
            <td class="pl-4">{{ item.register }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import ContentListItemAction from '../listItem/ContentListItemAction.vue';
import { IContent } from '@/interface/ui';
import type { PropType } from 'vue';

export default defineComponent({
  components: {
    ContentListItemAction,
  },
props: {
  contentItems: {
    type: Array as PropType<IContent[]>,
    default: () => [] as IContent[],
  },
},

});
</script>

<style scoped>
</style>
