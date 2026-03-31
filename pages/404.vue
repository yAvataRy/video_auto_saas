<template>
  <div
    class="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 px-4"
  >
    <div class="max-w-xl text-center">
      <h1 class="text-6xl font-black text-primary">404</h1>
      <p class="mt-4 text-xl">Página não encontrada</p>
      <p class="mt-2 text-slate-600">
        O caminho que você tentou acessar não existe.
      </p>
      <NuxtLink
        to="/"
        class="mt-6 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md"
        >Voltar para home</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
