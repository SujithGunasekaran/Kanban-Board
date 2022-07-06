<script setup>
import HeaderVue from "src/components/HeaderVue.vue";
import 'src/style/root.css';
import 'src/style/header.css';
import 'src/style/form.css';
import 'src/style/board.css';
</script>

<template>
  <div class="body">
    <HeaderVue />
    <div class="body_main">
      <router-view></router-view>
    </div>
  </div>
</template>
