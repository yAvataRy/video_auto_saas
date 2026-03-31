<template>
  <div :class="skeletonClasses" />
</template>

<script setup lang="ts">
interface Props {
  width?: string;
  height?: string;
  rounded?: boolean;
  variant?: "text" | "rectangular" | "circular";
}

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "1rem",
  rounded: false,
  variant: "text",
});

const skeletonClasses = computed(() => {
  const baseClasses = ["animate-pulse bg-gray-200", "relative overflow-hidden"];

  // Add shimmer effect
  baseClasses.push(
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:animate-shimmer"
  );

  if (props.rounded) {
    baseClasses.push("rounded");
  }

  const variantClasses = {
    text: "rounded",
    rectangular: "rounded-md",
    circular: "rounded-full",
  };

  baseClasses.push(variantClasses[props.variant]);

  return [...baseClasses, `w-[${props.width}]`, `h-[${props.height}]`].join(
    " "
  );
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>