<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Toast notifications -->
    <div class="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'max-w-sm w-full rounded-lg px-4 py-2 shadow-lg border border-gray-200',
            toast.type === 'success' ? 'bg-emerald-100 text-emerald-800' : '',
            toast.type === 'error' ? 'bg-rose-100 text-rose-800' : '',
            toast.type === 'warning' ? 'bg-amber-100 text-amber-800' : '',
            toast.type === 'info' ? 'bg-sky-100 text-sky-800' : '',
          ]"
        >
          {{ toast.message }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useAppToast } from "~/composables/useAppToast";

const auth = useAuth();
const { toasts } = useAppToast();

onMounted(async () => {
  await auth.restoreSession();
});
</script>

<style scoped>
/* Global app styles */
</style>
