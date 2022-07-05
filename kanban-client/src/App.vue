<script setup>
import HeaderVue from "./components/HeaderVue.vue";
import './style/root.css';
import './style/header.css';
import './style/form.css';
import './style/board.css';
</script>

<template>
  <div class="body">
    <HeaderVue />
    <div class="body_main">
      <router-view></router-view>
    </div>
  </div>
</template>
