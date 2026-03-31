<template>
  <div
    class="min-h-screen flex items-center justify-center bg-red-50 text-red-900 px-4"
  >
    <div class="max-w-lg text-center bg-white p-8 rounded-xl shadow-lg">
      <h1 class="text-5xl font-black text-red-600">Oops!</h1>
      <p class="mt-4 text-xl font-semibold">Algo deu errado</p>
      <p class="mt-2 text-sm text-slate-600 break-words">
        {{ statusCode }} - {{ message || statusMessage || "Erro inesperado" }}
      </p>

      <NuxtLink
        to="/"
        class="mt-6 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Voltar para home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
  };
}>();

const statusCode = props.error?.statusCode || 500;
const statusMessage = props.error?.statusMessage || "Internal Server Error";
const message =
  props.error?.message || "Algo inesperado aconteceu. Tente novamente.";
</script>
