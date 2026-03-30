<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

    <!-- Profile Settings -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Profile</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            :value="userEmail"
            disabled
            class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            :value="userName"
            disabled
            class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>
      </div>
    </div>

    <!-- API Keys -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">API Keys</h2>
      <p class="text-gray-600 mb-4">Manage your API keys for integrations</p>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Generate New Key
      </button>
    </div>

    <!-- Danger Zone -->
    <div class="bg-white rounded-lg shadow border-2 border-red-200 p-6">
      <h2 class="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
      <p class="text-gray-600 mb-4">Irreversible actions</p>
      <button
        @click="handleDeleteAccount"
        class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
      >
        Delete Account
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const authStore = useAuthStore();

const userName = computed(() => authStore.user?.name || 'User');
const userEmail = computed(() => authStore.user?.email || '');

const handleDeleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    console.log('Delete account');
    // TODO: Implement account deletion
  }
};
</script>
