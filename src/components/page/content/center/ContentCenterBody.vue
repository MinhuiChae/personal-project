<template>
  <div class="flex-1 w-full">
    <ContentList
      :content-items="contents"
    ></ContentList>
  </div>
  <!-- <ContentContextMenu
    ref="contextMenuRef"
    :isShow="isOpenContextMenu"
    :position="contextMenuPosition"
    :selectedContentItems="selectedContentItems"
    :item-type="contextMenuItemsType"
    :download-type="downloadType"
    :isEnablePersonalFolder="isEnablePersonalFolder"
    :folderHasModifyGrant="folderHasModifyGrant"
    :contentSearchPageType="contentSearchPageType"
    :categoryMetaField="categoryMetaField"
    :isUserInAdminGroup="isUserInAdminGroup"
    :accountUserInfo="accountUserInfo"
    :bookmarkGroup="bookmarkGroup"
    :extensions="extensions"
    :downloadPresets="downloadPresets"
    :attachment-file-categories="attachmentFileCategories"
    @on-context-menu-action="onContextMenuAction"
    @lock_sequence_material="lockSequenceMaterial"
    @cancel_lock_sequence_material="cancelLockSequenceMaterial"
  /> -->
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
} from 'vue';
import ContentList from './ContentList.vue';
import { IContent } from '@/interface/ui';
// import ContentContextMenu from '@/src/components/page/content/contextMenu/ContentContextMenu.vue';
export default defineComponent({
  inheritAttrs: false,
  components: {
    ContentList,
    // ContentContextMenu,
  },
  emits: ['on-context-menu'],
  props: {
    contents: {
      type: Array,
      default: () => [] as  IContent[],
    },
    
  },
  setup() {
    const state = reactive({
      isOpenContextMenu: false,
      contextMenuPosition: {
        top: 0,
        left: 0,
      },
      selectedContentItems: [] as any[],
    });

    const contextMenuRef = ref(null as any);

    const onContextMenuAction = () => (state.isOpenContextMenu = false);
    const onContextMenu = (data: any) => {
      const { toggle, position, selectedContentItems } = data;
      state.isOpenContextMenu = toggle;
      state.contextMenuPosition = position;
      state.selectedContentItems = selectedContentItems;
    };

    return {
      onContextMenu,
      onContextMenuAction,
      ...toRefs(state),
      contextMenuRef,
    };
  },
});
</script>
<style scoped>
.scroll-test::-webkit-scrollbar {
  color: transparent;
  width: 10px;
  background-color: transparent;
}

.scroll-test:hover::-webkit-scrollbar-thumb {
  background-color: #ff6b01;
  border-radius: 12px;
}
</style>
