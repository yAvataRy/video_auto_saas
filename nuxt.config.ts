export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false, // Desabilitado para evitar problemas com Supabase no servidor

  // Módulos
  modules: ["@pinia/nuxt", "@nuxt/ui", "@nuxtjs/supabase"],

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
    },
  },

  supabase: {
    redirect: false, // Evita que o módulo bloqueie tudo sozinho
  },
  // Runtimes
  runtimeConfig: {
    // Variáveis privadas (servidor)
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,

    // Variáveis públicas (cliente + servidor)
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  // Compatibilidade
  compatibilityDate: "2024-01-01",

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false, // Desabilitado para evitar erros de tipos globais do vue-tsc
  },

  // Vite
  vite: {
    define: {
      __DEV__: true,
    },
    ssr: {
      noExternal: ["@supabase/supabase-js"],
    },
  },
});
