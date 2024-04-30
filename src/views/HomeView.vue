<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
const name = ref('徐良')
</script>

<template>
  <main>
    {{ name }}
    <TheWelcome />
  </main>
</template>
