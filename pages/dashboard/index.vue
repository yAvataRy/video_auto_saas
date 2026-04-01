<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <!-- Stats Cards -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Total Projects</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">
              {{ projectCount }}
            </p>
          </div>
          <Icon
            name="mdi:folder-multiple"
            class="w-12 h-12 text-blue-500 opacity-20"
          />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Active Projects</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">
              {{ activeProjectCount }}
            </p>
          </div>
          <Icon
            name="mdi:play-circle"
            class="w-12 h-12 text-green-500 opacity-20"
          />
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

    <!-- Project Status Analytics -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        Project Status Analytics
      </h3>

      <div v-if="projects.length === 0" class="text-gray-500 text-sm">
        No projects to display analytics. Create a project first.
      </div>

      <div v-else class="space-y-4">
        <div v-for="(count, status) in statusCounts" :key="status">
          <div class="flex items-center justify-between mb-1">
            <span
              class="uppercase text-xs font-semibold tracking-wide text-gray-600"
              >{{ status }}</span
            >
            <span class="text-xs text-gray-500"
              >{{ count }} ({{
                ((count / totalProjects) * 100).toFixed(0)
              }}%)</span
            >
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div
              class="h-2 rounded-full"
              :class="{
                'bg-green-500': status === 'active',
                'bg-yellow-500': status === 'draft',
                'bg-gray-400': status === 'archived',
              }"
              :style="{
                width:
                  totalProjects > 0
                    ? (count / totalProjects) * 100 + '%'
                    : '0%',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Scheduled -->
    <div v-if="upcomingSchedules.length > 0" class="bg-white rounded-lg shadow p-6 mb-8">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-800">
          <Icon name="mdi:calendar-clock" class="w-5 h-5 inline mr-2" />
          Upcoming Scheduled
        </h3>
      </div>

      <div class="space-y-3">
        <div
          v-for="project in upcomingSchedules"
          :key="project.id"
          class="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
        >
          <div>
            <p class="font-medium text-gray-800">{{ project.name }}</p>
            <p class="text-sm text-gray-600">
              {{ formatScheduledDate(project.scheduled_at) }}
            </p>
          </div>
          <NuxtLink
            :to="`/projects/${project.id}`"
            class="text-blue-600 hover:text-blue-700 text-sm font-semibold"
          >
            View →
          </NuxtLink>
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
        <Icon
          name="mdi:loading"
          class="w-8 h-8 animate-spin mx-auto text-gray-400"
        />
      </div>

      <div v-else-if="projects.length === 0" class="text-center py-8">
        <Icon
          name="mdi:folder-open"
          class="w-12 h-12 mx-auto text-gray-300 mb-3"
        />
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
              <th
                class="text-left py-3 px-4 text-sm font-semibold text-gray-700"
              >
                Name
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-semibold text-gray-700"
              >
                Niche
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-semibold text-gray-700"
              >
                Status
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-semibold text-gray-700"
              >
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects.slice(0, 5)"
              :key="project.id"
              class="border-b border-gray-100 hover:bg-gray-50"
            >
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
import { formatScheduledDate } from '~/ utils/scheduling';

definePageMeta({
  middleware: "auth",
});

const { projects, loading, fetchProjects, getUpcomingSchedules } = useProjects();

const projectCount = computed(() => projects.value.length);
const activeProjectCount = computed(
  () => projects.value.filter((p) => p.status === "active").length
);

const totalProjects = computed(() => projects.value.length);
const statusCounts = computed(() => ({
  active: projects.value.filter((p) => p.status === "active").length,
  draft: projects.value.filter((p) => p.status === "draft").length,
  archived: projects.value.filter((p) => p.status === "archived").length,
}));

const upcomingSchedules = computed(() => getUpcomingSchedules(5));

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

onMounted(async () => {
  try {
    await fetchProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
});
</script>
