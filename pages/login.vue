<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

    <!-- Error Message -->
    <div
      v-if="error"
      class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
    >
      <p class="text-red-700 text-sm">{{ error }}</p>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      <!-- Password -->
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="••••••••"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!loading">Sign In</span>
        <span v-else class="flex items-center justify-center">
          <Icon name="mdi:loading" class="w-5 h-5 mr-2 animate-spin" />
          Signing in...
        </span>
      </button>
    </form>

    <!-- Divider -->
    <div class="my-6 flex items-center">
      <div class="flex-1 border-t border-gray-300"></div>
      <span class="px-3 text-gray-500 text-sm">or</span>
      <div class="flex-1 border-t border-gray-300"></div>
    </div>

    <!-- Register Link -->
    <p class="text-center text-gray-600 text-sm">
      Don't have an account?
      <NuxtLink
        to="/register"
        class="text-blue-600 font-semibold hover:text-blue-700"
      >
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { LoginCredentials } from "~/types";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const form = reactive<LoginCredentials>({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref<string | null>(null);
const { login } = useAuth();

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  try {
    await login(form);
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
