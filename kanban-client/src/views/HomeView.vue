<script setup>

import { board } from '../common/constant';

console.log("board", board);

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <div class="board_container">
          <div class="board_header">
            <div class="board_title">Todo</div>
            <div class="board_add_icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg icon"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
              </svg>
            </div>
          </div>
          <div class="board_body">
            <div class="board_card_container">
              <div class="board_card_header">
                <div class="board_card_title">Title</div>
              </div>
              <div class="board_card_body">
                <div class="board_card_body_info">Kanban board information added to situtation, with long text and
                  multiple lines</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
