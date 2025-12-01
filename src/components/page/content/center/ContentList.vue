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
          <!-- <tr v-for="item in contentItems" :key="item.id" class="text-center hover:bg-gray-50">
            <td class="px-2 py-1 border">Actions</td>
            <td class="px-2 py-1 border">{{ item.location }}</td>
            <td class="px-2 py-1 border">{{ item.folder }}</td>
            <td class="px-2 py-1 border">{{ item.title }}</td>
            <td class="px-2 py-1 border">{{ item.content }}</td>
            <td class="px-2 py-1 border">{{ item.author }}</td>
          </tr> -->
          <tr>
            <td> 
              <ContentListItemAction class="pl-4" />
            </td>
            <td class="pl-4"> M</td>
            <td class="pl-4"> </td>
            <td class="pl-4"> 테스트 영상입니다.</td>
            <td class="pl-4"> </td>
            <td class="pl-4"> 채민희</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import ContentListItemAction from '../listItem/ContentListItemAction.vue';

export default defineComponent({
  components: {
    ContentListItemAction,
  },
  props: {
    contentItems: {
      type: Array,
      default: () => [] as any[],
    },
  },
});
</script>

<style scoped>
</style>
