<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200">
      <slot name="header" />
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-gray-200 bg-gray-50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  padding: "md",
  rounded: true,
});

const cardClasses = computed(() => {
  const baseClasses = ["bg-white"];

  if (props.rounded) {
    baseClasses.push("rounded-lg");
  }

  const variantClasses = {
    default: ["shadow-sm", "border", "border-gray-200"],
    elevated: ["shadow-lg", "border", "border-gray-200"],
    outlined: ["border-2", "border-gray-300"],
  };

  return [...baseClasses, ...variantClasses[props.variant]].join(" ");
});

const bodyClasses = computed(() => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return paddingClasses[props.padding];
});
</script>