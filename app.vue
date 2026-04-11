<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Desactivar el menú de clic derecho (context menu) para dar sensación de app nativa
  document.addEventListener('contextmenu', event => event.preventDefault())

  // Desactivar arrastrar y soltar (Drag & Drop) en imágenes
  document.addEventListener('dragstart', event => {
    if (event.target.nodeName === 'IMG') {
      event.preventDefault()
    }
  })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Desactivar selección de texto globalmente para comportarse como app nativa, excepto en inputs/textareas */
body {
  user-select: none;
  -webkit-user-select: none;
}

input, textarea {
  user-select: text;
  -webkit-user-select: text;
}
</style>
