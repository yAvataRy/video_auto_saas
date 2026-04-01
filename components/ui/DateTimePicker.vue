<script setup lang="ts">
interface Props {
  modelValue?: string | null;
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  min?: string;
}

interface Emits {
  (e: "update:modelValue", value: string | null): void;
}

defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  id: "datetimepicker",
  name: "datetime",
});

// Formata a data para ISO string (YYYY-MM-DDTHH:mm)
const formatDateForInput = (date: string | undefined | null) => {
  if (!date) return "";
  try {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  } catch {
    return "";
  }
};

// Converte input format para ISO string
const formatDateForValue = (value: string) => {
  if (!value) return null;
  try {
    const d = new Date(value);
    return d.toISOString();
  } catch {
    return null;
  }
};

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const formatted = formatDateForValue(target.value);
  if (props.modelValue !== undefined) {
    defineEmits("update:modelValue")(formatted);
  }
};
</script>

<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >*</span>
    </label>
    <input
      :id="id"
      type="datetime-local"
      :name="name"
      :value="formatDateForInput(modelValue)"
      :disabled="disabled"
      :required="required"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      :class="{ 'border-red-500': error }"
      @change="handleChange"
    >
    <p
      v-if="hint"
      class="text-xs text-gray-500"
    >
      {{ hint }}
    </p>
    <p
      v-if="error && errorMessage"
      class="text-xs text-red-500"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
