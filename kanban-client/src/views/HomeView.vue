<script setup>

import { reactive } from 'vue';
import BoardVueVue from 'src/reusable-components/BoardVue.vue';

const boardInfo = reactive({
  'Todo': {
    list: [
      {
        id: '1',
        title: 'Todo Title',
        content: 'Kanban board information added to situtation, with long text and multiple lines'
      }
    ]
  },
  'Inprogress': {
    list: [
      {
        id: '2',
        title: 'Inprogress Title',
        content: 'Kanban board Inprogress information added to situtation, with long text and multiple lines'
      }
    ]
  }
});

const startDrag = (event, boardName, item) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('item', JSON.stringify(item));
  event.dataTransfer.setData('fromBoard', boardName);
}

const onDrop = (event) => {
  const { id: boardName } = event.target;
  const item = event.dataTransfer.getData('item');
  const dropData = JSON.parse(item);
  const fromBoardName = event.dataTransfer.getData('fromBoard');
  if ((boardName === fromBoardName) || !boardName) return;
  let index = boardInfo[fromBoardName].list.findIndex(data => data.id === dropData.id);
  if (boardInfo[boardName]) {
    boardInfo[boardName].list.push(dropData);
  }
  boardInfo[fromBoardName].list.splice(index, 1);
}

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3" v-for="(value, key) in boardInfo" :key="key">
        <BoardVueVue :id="key" :list="value.list" @startDrag="startDrag" @onDrop="onDrop" />
      </div>
    </div>
  </div>
</template>
