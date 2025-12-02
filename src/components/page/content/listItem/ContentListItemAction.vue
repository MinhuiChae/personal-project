<template>
  <span class="flex items-center space-x-1">
    <!-- 즐겨찾기 아이콘 -->
     <BookmarkIcon/>
    <!-- 컨텍스트 메뉴 -->
    <ContentListItemContextMenuInfo
    />
    <!-- 썸네일 -->
   <div
      class="w-[130px] h-[80px] bg-black rounded-lg border border-white pl-4"
    ></div>
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BookmarkIcon from '@/components/icon/BookmarkIcon.vue';
import ContentListItemContextMenuInfo from './ContentListItemContextMenuInfo.vue';
export default defineComponent({
  components: {
    ContentListItemContextMenuInfo,
    BookmarkIcon
  },
  props: {
    params: {
      type: Object,
    },
  },
  emits: [],
  setup() {
    
    
    return {
    };
  },
});
</script>
