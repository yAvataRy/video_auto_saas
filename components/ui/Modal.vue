<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @keydown.escape="handleEscape"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50"
          @click="handleBackdropClick"
        />

        <!-- Modal -->
        <Transition
          enter-active-class="transition-all duration-300"
          leave-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden"
            :class="sizeClasses"
          >
            <!-- Header -->
            <div
              v-if="title || $slots.header"
              class="flex items-center justify-between p-6 border-b border-gray-200"
            >
              <div class="flex-1">
                <slot name="header">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ title }}
                  </h3>
                </slot>
              </div>

              <button
                v-if="showCloseButton"
                class="ml-3 inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                @click="close"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto p-6">
              <slot />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size: "md",
  showCloseButton: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  open: [];
  close: [];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: "max-w-md w-full mx-4",
    md: "max-w-lg w-full mx-4",
    lg: "max-w-2xl w-full mx-4",
    xl: "max-w-4xl w-full mx-4",
    "2xl": "max-w-6xl w-full mx-4",
  };
  return sizes[props.size];
});

const handleBackdropClick = () => {
  if (props.closeOnBackdropClick) {
    close();
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.closeOnEscape) {
    close();
  }
};

const open = () => {
  isOpen.value = true;
  emit("open");
};

const close = () => {
  isOpen.value = false;
  emit("close");
};

// Handle body scroll lock
watch(isOpen, (newValue) => {
  if (process.client) {
    if (newValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = "";
  }
});
</script>