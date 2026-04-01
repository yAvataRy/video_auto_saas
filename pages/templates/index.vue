<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-5xl px-4">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            Meus Templates
          </h1>
          <p class="mt-2 text-gray-600">
            Crie e reutilize templates para seus projetos
          </p>
        </div>
        <button
          class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
          @click="isCreateModalOpen = true"
        >
          Novo Template
        </button>
      </div>

      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200">
        <div class="flex gap-4">
          <button
            :class="[
              'px-4 py-2 font-semibold border-b-2 transition',
              activeTab === 'my'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
            @click="activeTab = 'my'"
          >
            Meus Templates ({{ userTemplates.length }})
          </button>
          <button
            :class="[
              'px-4 py-2 font-semibold border-b-2 transition',
              activeTab === 'public'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
            @click="activeTab = 'public'"
          >
            Templates Públicos ({{ publicTemplates.length }})
          </button>
        </div>
      </div>

      <!-- Filter by Category -->
      <div class="mb-6 flex gap-2">
        <button
          :class="[
            'px-4 py-2 rounded-full font-semibold transition',
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="selectedCategory = null"
        >
          Todos
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          :class="[
            'px-4 py-2 rounded-full font-semibold transition',
            selectedCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="selectedCategory = cat"
        >
          {{ formatCategory(cat) }}
        </button>
      </div>

      <!-- Templates Grid -->
      <div
        v-if="loading"
        class="space-y-4"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="h-48 bg-gray-200 rounded-lg animate-pulse"
        />
      </div>

      <div
        v-else-if="filteredTemplates.length === 0"
        class="rounded-lg bg-white p-8 text-center"
      >
        <p class="text-gray-600">
          Nenhum template disponível
        </p>
      </div>

      <div
        v-else
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          class="rounded-lg border border-gray-200 bg-white transition hover:shadow-lg"
        >
          <!-- Thumbnail -->
          <div
            v-if="template.thumbnail_url"
            class="overflow-hidden rounded-t-lg bg-gray-100 h-40"
          >
            <img
              :src="template.thumbnail_url"
              :alt="template.name"
              class="h-full w-full object-cover"
            >
          </div>
          <div
            v-else
            class="h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-t-lg"
          />

          <!-- Content -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-900">
              {{ template.name }}
            </h3>
            <p class="mt-1 line-clamp-2 text-sm text-gray-600">
              {{ template.description }}
            </p>

            <div class="mt-4 flex items-center justify-between">
              <span class="text-xs font-semibold text-blue-600">
                {{ formatCategory(template.category) }}
              </span>
              <span
                v-if="template.is_public"
                class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
              >
                Público
              </span>
            </div>

            <!-- Actions -->
            <div class="mt-4 flex gap-2">
              <button
                class="flex-1 rounded bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200 transition"
                @click="editTemplate(template)"
              >
                Editar
              </button>
              <button
                class="flex-1 rounded bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 transition"
                @click="deleteTemplate(template.id)"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <UiModal
      v-model="isCreateModalOpen"
      title="Criar Template"
    >
      <form
        class="space-y-4"
        @submit.prevent="submitTemplate"
      >
        <!-- Name -->
        <UiInput
          v-model="templateForm.name"
          label="Nome do Template"
          placeholder="Ex: Intro Dinâmica"
          required
        />

        <!-- Description -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            v-model="templateForm.description"
            placeholder="Ex: Template de intro dinâmica com transições..."
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            rows="3"
          />
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Categoria
          </label>
          <select
            v-model="templateForm.category"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Selecione uma categoria
            </option>
            <option value="short-form">
              Short-form (TikTok, Shorts)
            </option>
            <option value="long-form">
              Long-form (YouTube)
            </option>
            <option value="promotional">
              Promocional
            </option>
            <option value="educational">
              Educacional
            </option>
            <option value="entertainment">
              Entretenimento
            </option>
            <option value="other">
              Outro
            </option>
          </select>
        </div>

        <!-- Content -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Conteúdo (JSON)
          </label>
          <textarea
            v-model="templateForm.content"
            placeholder="{&quot;scenes&quot;: [], &quot;audio&quot;: ...}"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            rows="6"
          />
        </div>

        <!-- Is Public -->
        <div class="flex items-center">
          <input
            id="is_public"
            v-model="templateForm.is_public"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-blue-600"
          >
          <label
            for="is_public"
            class="ml-2 text-sm text-gray-700"
          >
            Compartilhar publicamente
          </label>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 pt-4">
          <button
            type="button"
            class="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition"
            @click="isCreateModalOpen = false"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {{ submitting ? "Salvando..." : "Salvar Template" }}
          </button>
        </div>
      </form>
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type {
  Template,
  CreateTemplateInput,
  UpdateTemplateInput,
} from "~/types";

definePageMeta({
  middleware: "auth",
});

const { useTemplates } = await import("~/composables/useTemplates");
const {
  fetchUserTemplates,
  fetchTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate: deleteTemplateApi,
  userTemplates,
  templates: publicTemplates,
} = useTemplates();

const activeTab = ref<"my" | "public">("my");
const selectedCategory = ref<string | null>(null);
const isCreateModalOpen = ref(false);
const submitting = ref(false);
const loading = ref(false);
const editingId = ref<string | null>(null);

const categories = [
  "short-form",
  "long-form",
  "promotional",
  "educational",
  "entertainment",
  "other",
];

const templateForm = ref<
  CreateTemplateInput & { id?: string; is_public?: boolean }
>({
  name: "",
  description: "",
  content: "",
  category: "short-form",
  is_public: false,
});

const filteredTemplates = computed(() => {
  const templates =
    activeTab.value === "my" ? userTemplates.value : publicTemplates.value;
  if (!selectedCategory.value) return templates;
  return templates.filter((t) => t.category === selectedCategory.value);
});

const formatCategory = (cat: string) => {
  const map: Record<string, string> = {
    "short-form": "Short-form",
    "long-form": "Long-form",
    promotional: "Promocional",
    educational: "Educacional",
    entertainment: "Entretenimento",
    other: "Outro",
  };
  return map[cat] || cat;
};

const submitTemplate = async () => {
  try {
    submitting.value = true;
    if (editingId.value) {
      await updateTemplate(
        editingId.value,
        templateForm.value as UpdateTemplateInput
      );
    } else {
      await createTemplate(templateForm.value);
    }
    resetForm();
    isCreateModalOpen.value = false;
  } finally {
    submitting.value = false;
  }
};

const editTemplate = (template: Template) => {
  editingId.value = template.id;
  templateForm.value = {
    name: template.name,
    description: template.description,
    content: template.content,
    category: template.category,
    thumbnail_url: template.thumbnail_url,
    is_public: template.is_public,
  };
  isCreateModalOpen.value = true;
};

const deleteTemplate = async (id: string) => {
  if (confirm("Tem certeza que deseja deletar este template?")) {
    await deleteTemplateApi(id);
  }
};

const resetForm = () => {
  templateForm.value = {
    name: "",
    description: "",
    content: "",
    category: "short-form",
    is_public: false,
  };
  editingId.value = null;
};

onMounted(async () => {
  loading.value = true;
  try {
    await Promise.all([fetchUserTemplates(), fetchTemplates()]);
  } finally {
    loading.value = false;
  }
});
</script>
