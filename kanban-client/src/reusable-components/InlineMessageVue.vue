<script setup>

import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['closeInlineMessage']);
const props = defineProps({
    message: String,
    type: String
})

</script>

<template>
    <div :class="`message_container ${props.type}`">
        <div>{{ props.message }}</div>
        <div @click="emit('closeInlineMessage', type)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x message_icon"
                viewBox="0 0 16 16">
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </div>
    </div>
</template>

<style scoped>
.message_container {
    margin: 0px 0px 15px 0px;
    padding: 10px;
    font-size: .9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.010rem;
    font-family: var(--font-roboto);
    border-radius: 6px;
}

.message_container.danger {
    border: 1px solid var(--danger-alert-border);
    background-color: var(--danger-alert-bg);
    color: var(--danger-alert-text);
}

.message_container.success {
    border: 1px solid var(--success-alert-border);
    background-color: var(--success-alert-bg);
    color: var(--success-alert-text);
}

.message_container.warning {
    border: 1px solid var(--warning-alert-border);
    background-color: var(--warning-alert-bg);
    color: var(--warning-alert-text);
}

.message_container.info {
    border: 1px solid var(--info-alert-border);
    background-color: var(--info-alert-bg);
    color: var(--info-alert-text);
}

.message_icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>
