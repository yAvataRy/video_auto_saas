<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">
          VideoAI
        </h1>
        <p class="text-blue-100">
          Video Automation Platform
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-lg shadow-xl p-8">
        <slot />
      </div>

      <!-- Footer -->
      <div class="text-center mt-6 text-blue-100 text-sm">
        <p>&copy; 2024 VideoAI. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth layout component
</script>
