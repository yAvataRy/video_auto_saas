<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2">
      <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  loading: false,
  disabled: false,
  fullWidth: false,
});

defineEmits<{
  click: [event: Event];
}>();

const buttonClasses = computed(() => {
  const baseClasses = [
    "inline-flex items-center justify-center",
    "font-medium rounded-lg",
    "transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ];

  // Variant classes
  const variantClasses = {
    primary: [
      "bg-blue-600 text-white hover:bg-blue-700",
      "focus:ring-blue-500",
    ],
    secondary: [
      "bg-gray-600 text-white hover:bg-gray-700",
      "focus:ring-gray-500",
    ],
    outline: [
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
      "focus:ring-blue-500",
    ],
    danger: ["bg-red-600 text-white hover:bg-red-700", "focus:ring-red-500"],
  };

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return [
    ...baseClasses,
    ...variantClasses[props.variant],
    sizeClasses[props.size],
    props.fullWidth ? "w-full" : "",
  ].join(" ");
});
</script>