<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <div class="header_container" :class="(route.name !== 'login' && route.name !== 'signup') ? 'show' : ''">
        <div class="header_title">Kanban</div>
    </div>
</template>
