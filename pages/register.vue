<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>

    <!-- Error Message -->
    <div
      v-if="error"
      class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
    >
      <p class="text-red-700 text-sm">{{ error }}</p>
    </div>

    <!-- Register Form -->
    <form @submit.prevent="handleRegister" class="space-y-4">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          v-model="form.name"
          type="text"
          autocomplete="name"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

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
          autocomplete="new-password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="••••••••"
        />
        <p class="text-xs text-gray-500 mt-1">At least 8 characters</p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!loading">Create Account</span>
        <span v-else class="flex items-center justify-center">
          <Icon name="mdi:loading" class="w-5 h-5 mr-2 animate-spin" />
          Creating...
        </span>
      </button>
    </form>

    <!-- Divider -->
    <div class="my-6 flex items-center">
      <div class="flex-1 border-t border-gray-300"></div>
      <span class="px-3 text-gray-500 text-sm">or</span>
      <div class="flex-1 border-t border-gray-300"></div>
    </div>

    <!-- Login Link -->
    <p class="text-center text-gray-600 text-sm">
      Already have an account?
      <NuxtLink
        to="/login"
        class="text-blue-600 font-semibold hover:text-blue-700"
      >
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { RegisterCredentials } from "~/types";

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const form = reactive<RegisterCredentials>({
  email: "",
  password: "",
  name: "",
});

const loading = ref(false);
const error = ref<string | null>(null);
const { register } = useAuth();

const handleRegister = async () => {
  loading.value = true;
  error.value = null;

  try {
    await register(form);
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : "Registration failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
