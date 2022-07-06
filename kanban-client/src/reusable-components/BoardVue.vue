<script setup>

import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: String,
    list: Array
});

const emits = defineEmits(['startDrag', 'onDrop']);


</script>

<template>
    <div class="board_container" :id="props.id" @drop="emits('onDrop', $event)" @dragover.prevent @dragenter.prevent>
        <div class="board_header">
            <div class="board_title">{{ props.id }}</div>
            <div class="board_add_icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg icon"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
            </div>
        </div>
        <div class="board_body" v-for="boardInfo in list" :key="boardInfo.id"
            @dragstart="emits('startDrag', $event, props.id, boardInfo)">
            <div class="board_card_container" draggable="true">
                <div class="board_card_header">
                    <div class="board_card_title">{{ boardInfo.title }}</div>
                    <div class="board_card_header_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-grip-vertical icon"
                            viewBox="0 0 16 16">
                            <path
                                d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                    </div>
                </div>
                <div class="board_card_body">
                    <div class="board_card_body_info">{{ boardInfo.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
