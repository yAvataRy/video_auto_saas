export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  experimental: {
    payloadExtraction: false,
  },

  // Módulos
  modules: ["@pinia/nuxt", "@nuxt/ui", "@vercel/analytics"],

  // CSS e Tailwind
  css: ["~/assets/main.css"],

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: "#3b82f6",
            secondary: "#8b5cf6",
            accent: "#ec4899",
          },
        },
      },
      safelist: [],
    },
  },

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
