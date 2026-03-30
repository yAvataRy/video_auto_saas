<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <!-- Stats Cards -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Total Projects</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ projectCount }}</p>
          </div>
          <Icon name="mdi:folder-multiple" class="w-12 h-12 text-blue-500 opacity-20" />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Active Projects</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ activeProjectCount }}</p>
          </div>
          <Icon name="mdi:play-circle" class="w-12 h-12 text-green-500 opacity-20" />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Videos Generated</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">0</p>
          </div>
          <Icon name="mdi:video" class="w-12 h-12 text-purple-500 opacity-20" />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Total Views</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">0</p>
          </div>
          <Icon name="mdi:eye" class="w-12 h-12 text-orange-500 opacity-20" />
        </div>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-800">Recent Projects</h3>
        <NuxtLink
          to="/projects"
          class="text-blue-600 hover:text-blue-700 text-sm font-semibold"
        >
          View All →
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-8">
        <Icon name="mdi:loading" class="w-8 h-8 animate-spin mx-auto text-gray-400" />
      </div>

      <div v-else-if="projects.length === 0" class="text-center py-8">
        <Icon name="mdi:folder-open" class="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p class="text-gray-500">No projects yet</p>
        <NuxtLink
          to="/projects"
          class="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-2 inline-block"
        >
          Create your first project
        </NuxtLink>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200">
            <tr>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Niche</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects.slice(0, 5)" :key="project.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4">
                <NuxtLink
                  :to="`/projects/${project.id}`"
                  class="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {{ project.name }}
                </NuxtLink>
              </td>
              <td class="py-3 px-4 text-gray-600">{{ project.niche }}</td>
              <td class="py-3 px-4">
                <span
                  :class="{
                    'px-3 py-1 rounded-full text-xs font-semibold': true,
                    'bg-green-100 text-green-800': project.status === 'active',
                    'bg-yellow-100 text-yellow-800': project.status === 'draft',
                    'bg-gray-100 text-gray-800': project.status === 'archived',
                  }"
                >
                  {{ project.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-gray-600 text-sm">
                {{ formatDate(project.created_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { projects, loading, fetchProjects } = useProjects();

const projectCount = computed(() => projects.value.length);
const activeProjectCount = computed(() => projects.value.filter((p) => p.status === 'active').length);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

onMounted(async () => {
  try {
    await fetchProjects();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
});
</script>
