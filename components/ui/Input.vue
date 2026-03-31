<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :id="inputId"
        :name="inputId"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />

      <div
        v-if="icon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <component :is="icon" class="h-5 w-5 text-gray-400" />
      </div>
    </div>

    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>

    <p v-if="hint && !error" class="text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: string;
  autocomplete?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  autocomplete: "off",
  disabled: false,
  readonly: false,
  required: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const inputRef = ref<HTMLInputElement>();
const inputId = computed(
  () => `input-${Math.random().toString(36).substr(2, 9)}`
);

const inputClasses = computed(() => {
  const baseClasses = [
    "block w-full px-3 py-2 border rounded-md shadow-sm",
    "placeholder-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "transition-colors duration-200",
  ];

  if (props.disabled) {
    baseClasses.push("bg-gray-50 text-gray-500 cursor-not-allowed");
  } else if (props.readonly) {
    baseClasses.push("bg-gray-50 text-gray-700");
  } else {
    baseClasses.push("bg-white text-gray-900");
  }

  if (props.error) {
    baseClasses.push("border-red-300 focus:ring-red-500 focus:border-red-500");
  } else {
    baseClasses.push("border-gray-300");
  }

  if (props.icon) {
    baseClasses.push("pr-10");
  }

  return baseClasses.join(" ");
});

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
});
</script>