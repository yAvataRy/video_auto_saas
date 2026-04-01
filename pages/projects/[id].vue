<template>
  <div>
    <!-- Loading State -->
    <div
      v-if="loading"
      class="text-center py-12"
    >
      <Icon
        name="mdi:loading"
        class="w-8 h-8 animate-spin mx-auto text-gray-400 mb-3"
      />
      <p class="text-gray-500">
        Loading project...
      </p>
    </div>

    <!-- Project Details -->
    <div
      v-else-if="project"
      class="space-y-6"
    >
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <NuxtLink
            to="/projects"
            class="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-2 inline-block"
          >
            ← Back to Projects
          </NuxtLink>
          <h1 class="text-3xl font-bold text-gray-800">
            {{ project.name }}
          </h1>
          <p class="text-gray-500 mt-1">
            {{ project.niche }}
          </p>
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
        <h2 class="text-lg font-semibold text-gray-800 mb-4">
          Description
        </h2>
        <p
          v-if="project.description"
          class="text-gray-600"
        >
          {{ project.description }}
        </p>
        <p
          v-else
          class="text-gray-500 italic"
        >
          No description provided
        </p>
      </div>

      <!-- Project Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">
            Project Information
          </h3>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-gray-500">
                Project ID
              </p>
              <p class="text-sm font-mono text-gray-800">
                {{ project.id }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">
                Created
              </p>
              <p class="text-sm text-gray-800">
                {{ formatDate(project.created_at) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">
                Last Updated
              </p>
              <p class="text-sm text-gray-800">
                {{ formatDate(project.updated_at) }}
              </p>
            </div>
            <div v-if="project.scheduled_at">
              <p class="text-xs text-gray-500">
                Scheduled for
              </p>
              <p class="text-sm text-blue-600 font-semibold">
                {{ formatDate(project.scheduled_at) }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">
            Quick Stats
          </h3>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-gray-500">
                Videos Generated
              </p>
              <p class="text-2xl font-bold text-gray-800">
                0
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">
                Total Views
              </p>
              <p class="text-2xl font-bold text-gray-800">
                0
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex space-x-3">
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center"
          @click="handleEdit"
        >
          <Icon
            name="mdi:pencil"
            class="w-5 h-5 mr-2"
          />
          Edit Project
        </button>
        <button
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center"
          @click="handleDelete"
        >
          <Icon
            name="mdi:trash-can"
            class="w-5 h-5 mr-2"
          />
          Delete Project
        </button>
      </div>

      <!-- Edit Project Modal -->
      <div
        v-if="showEditModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Edit Project
          </h2>

          <form
            class="space-y-4"
            @submit.prevent="submitEdit"
          >
            <div>
              <label
                for="edit-name"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Project Name *</label>
              <input
                id="edit-name"
                v-model="projectForm.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>

            <div>
              <label
                for="edit-niche"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Niche *</label>
              <input
                id="edit-niche"
                v-model="projectForm.niche"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>

            <div>
              <label
                for="edit-description"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Description</label>
              <textarea
                id="edit-description"
                v-model="projectForm.description"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <div>
              <label
                for="edit-status"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Status</label>
              <select
                id="edit-status"
                v-model="projectForm.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">
                  Active
                </option>
                <option value="draft">
                  Draft
                </option>
                <option value="archived">
                  Archived
                </option>
              </select>
            </div>

            <div>
              <label
                for="edit-scheduled"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Schedule Post (Optional)</label>
              <UiDateTimePicker
                id="edit-scheduled"
                v-model="projectForm.scheduled_at"
                name="scheduled_at"
                hint="Leave empty to publish immediately"
              />
            </div>

            <div class="flex space-x-3 pt-4">
              <button
                type="button"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                @click="showEditModal = false"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="editLoading"
                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!editLoading">Save</span>
                <span
                  v-else
                  class="flex items-center justify-center"
                >
                  <Icon
                    name="mdi:loading"
                    class="w-4 h-4 mr-2 animate-spin"
                  />
                  Saving...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div
      v-else
      class="text-center py-12 bg-white rounded-lg"
    >
      <Icon
        name="mdi:folder-open"
        class="w-16 h-16 mx-auto text-gray-300 mb-4"
      />
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        Project not found
      </h3>
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
import type { Project, UpdateProjectInput } from "~/types";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const { fetchProjectById, deleteProject, updateProject } = useProjects();

const project = ref<Project | null>(null);
const loading = ref(true);
const showEditModal = ref(false);
const editLoading = ref(false);

const projectForm = reactive<UpdateProjectInput>({
  name: "",
  niche: "",
  description: "",
  status: "active",
  scheduled_at: null,
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleEdit = () => {
  if (!project.value) return;

  projectForm.name = project.value.name;
  projectForm.niche = project.value.niche;
  projectForm.description = project.value.description || "";
  projectForm.status = project.value.status;

  showEditModal.value = true;
};

const submitEdit = async () => {
  if (!project.value) return;

  editLoading.value = true;
  try {
    const { data } = await updateProject(project.value.id, {
      name: projectForm.name,
      niche: projectForm.niche,
      description: projectForm.description,
      status: projectForm.status,
    });

    if (data) {
      project.value = data;
      showEditModal.value = false;
    }
  } catch (error) {
    console.error("Failed to update project:", error);
  } finally {
    editLoading.value = false;
  }
};

const handleDelete = async () => {
  if (
    confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    )
  ) {
    try {
      if (project.value) {
        await deleteProject(project.value.id);
        await router.push("/projects");
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }
};

onMounted(async () => {
  try {
    const id = route.params.id as string;
    const { data } = await fetchProjectById(id);
    project.value = data || null;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    project.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
