<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <Icon name="mdi:loading" class="w-8 h-8 animate-spin mx-auto text-gray-400 mb-3" />
      <p class="text-gray-500">Loading project...</p>
    </div>

    <!-- Project Details -->
    <div v-else-if="project" class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <NuxtLink to="/projects" class="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-2 inline-block">
            ← Back to Projects
          </NuxtLink>
          <h1 class="text-3xl font-bold text-gray-800">{{ project.name }}</h1>
          <p class="text-gray-500 mt-1">{{ project.niche }}</p>
        </div>
        <span
          :class="{
            'px-4 py-2 rounded-full text-sm font-semibold': true,
            'bg-green-100 text-green-800': project.status === 'active',
            'bg-yellow-100 text-yellow-800': project.status === 'draft',
            'bg-gray-100 text-gray-800': project.status === 'archived',
          }"
        >
          {{ project.status }}
        </span>
      </div>

      <!-- Description -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Description</h2>
        <p v-if="project.description" class="text-gray-600">{{ project.description }}</p>
        <p v-else class="text-gray-500 italic">No description provided</p>
      </div>

      <!-- Project Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">Project Information</h3>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-gray-500">Project ID</p>
              <p class="text-sm font-mono text-gray-800">{{ project.id }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Created</p>
              <p class="text-sm text-gray-800">{{ formatDate(project.created_at) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Last Updated</p>
              <p class="text-sm text-gray-800">{{ formatDate(project.updated_at) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">Quick Stats</h3>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-gray-500">Videos Generated</p>
              <p class="text-2xl font-bold text-gray-800">0</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Total Views</p>
              <p class="text-2xl font-bold text-gray-800">0</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex space-x-3">
        <button
          @click="handleEdit"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center"
        >
          <Icon name="mdi:pencil" class="w-5 h-5 mr-2" />
          Edit Project
        </button>
        <button
          @click="handleDelete"
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center"
        >
          <Icon name="mdi:trash-can" class="w-5 h-5 mr-2" />
          Delete Project
        </button>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-12 bg-white rounded-lg">
      <Icon name="mdi:folder-open" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Project not found</h3>
      <NuxtLink
        to="/projects"
        class="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-4 inline-block"
      >
        Back to Projects
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types';

definePageMeta({
  middleware: 'auth',
});

const route = useRoute();
const router = useRouter();
const { fetchProjectById, deleteProject } = useProjects();

const project = ref<Project | null>(null);
const loading = ref(true);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const handleEdit = () => {
  // TODO: Implement edit functionality
  console.log('Edit project:', project.value?.id);
};

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
    try {
      if (project.value) {
        await deleteProject(project.value.id);
        await router.push('/projects');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  }
};

onMounted(async () => {
  try {
    const id = route.params.id as string;
    const { data } = await fetchProjectById(id);
    project.value = data || null;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    project.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
