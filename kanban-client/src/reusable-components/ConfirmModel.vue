<script setup>

import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    displayMessage: String,
    confirmDisplayName: String,
    isLoading: Boolean
});

const emit = defineEmits(['onCancel', 'onConfirm'])

</script>

<template>
    <div class="overlay">
        <div class="model_container">
            <div class="model_info">{{ props.displayMessage }}</div>
            <div class="model_footer_container">
                <button @click="emit('onCancel')" class="cancel">Cancel</button>
                <button :disabled="isLoading" @click="emit('onConfirm')" class="confirm">
                    <div v-if="isLoading" class="spinner-border spinner_loader" role="status"></div>
                    <span v-else>{{ confirmDisplayName }}</span>
                </button>
            </div>
        </div>
    </div>
</template>
