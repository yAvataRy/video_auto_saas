<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 shadow-sm">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-blue-600">
            VideoAI
          </h1>
          <p class="text-xs text-gray-500 mt-1">
            Automation Platform
          </p>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <NuxtLink
            to="/dashboard"
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            active-class="bg-blue-50 text-blue-600 font-semibold"
          >
            <Icon
              name="mdi:home"
              class="w-5 h-5 mr-3"
            />
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/projects"
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            active-class="bg-blue-50 text-blue-600 font-semibold"
          >
            <Icon
              name="mdi:folder-multiple"
              class="w-5 h-5 mr-3"
            />
            Projects
          </NuxtLink>

          <NuxtLink
            to="/templates"
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            active-class="bg-blue-50 text-blue-600 font-semibold"
          >
            <Icon
              name="mdi:palette"
              class="w-5 h-5 mr-3"
            />
            Templates
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            active-class="bg-blue-50 text-blue-600 font-semibold"
          >
            <Icon
              name="mdi:cog"
              class="w-5 h-5 mr-3"
            />
            Settings
          </NuxtLink>
        </nav>

        <!-- User Profile -->
        <div class="px-4 py-4 border-t border-gray-200">
          <button
            class="w-full flex items-center px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            @click="handleLogout"
          >
            <Icon
              name="mdi:logout"
              class="w-5 h-5 mr-3"
            />
            Logout
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 shadow-sm">
        <div class="px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ pageTitle }}
          </h2>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">{{ userEmail }}</span>
            <img
              v-if="userAvatar"
              :src="userAvatar"
              :alt="userName"
              class="w-8 h-8 rounded-full"
            >
            <div
              v-else
              class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
            >
              <span class="text-white text-sm font-semibold">
                {{ userName?.charAt(0).toUpperCase() || "U" }}
              </span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto">
        <div class="p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/projects": "Projects",
    "/templates": "Templates",
    "/settings": "Settings",
  };
  return titles[route.path] || "Dashboard";
});

const userName = computed(() => authStore.user?.name || "User");
const userEmail = computed(() => authStore.user?.email || "");
const userAvatar = computed(() => authStore.user?.avatar_url || null);

const handleLogout = async () => {
  try {
    const { logout } = useAuth();
    await logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
