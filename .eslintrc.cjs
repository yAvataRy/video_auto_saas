module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["@nuxt/eslint-config"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Regras básicas de qualidade de código
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "vue/no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
  },
  ignorePatterns: [".nuxt/", "node_modules/", ".output/", "dist/", "coverage/"],
};
