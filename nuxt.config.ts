export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  experimental: {
    payloadExtraction: false,
  },

  // Módulos
  modules: ["@pinia/nuxt", "@nuxt/ui"],

  // CSS e Tailwind
  css: ["~/assets/main.css"],

  // Vite
  vite: {
    optimizeDeps: {
      include: ["pinia"],
    },
  },

  // Runtimes
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || "",
      supabaseKey: process.env.SUPABASE_KEY || "",
    },
  },

  // Compatibilidade
  compatibilityDate: "2024-04-01",

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false,
  },
});
