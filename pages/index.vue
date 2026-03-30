<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-blue-600">VideoAI</h1>
        <div class="space-x-4">
          <NuxtLink
            to="/login"
            class="text-gray-700 hover:text-blue-600 font-semibold"
          >
            Sign In
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-6 py-20 text-center text-white">
      <h2 class="text-5xl font-bold mb-6">Automate Your Video Creation</h2>
      <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Create viral short-form videos automatically. From script to posting, VideoAI handles it all.
      </p>
      <div class="space-x-4">
        <NuxtLink
          to="/register"
          class="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-block"
        >
          Start Free Trial
        </NuxtLink>
        <button
          class="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
        >
          Learn More
        </button>
      </div>
    </div>

    <!-- Features -->
    <div class="bg-white py-20">
      <div class="max-w-7xl mx-auto px-6">
        <h3 class="text-3xl font-bold text-center text-gray-800 mb-12">Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <Icon name="mdi:video" class="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h4 class="text-lg font-semibold text-gray-800 mb-2">Auto Video Generation</h4>
            <p class="text-gray-600">Generate professional videos from scripts automatically</p>
          </div>
          <div class="text-center">
            <Icon name="mdi:brain" class="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h4 class="text-lg font-semibold text-gray-800 mb-2">AI-Powered Scripts</h4>
            <p class="text-gray-600">Create engaging scripts using advanced AI technology</p>
          </div>
          <div class="text-center">
            <Icon name="mdi:trending-up" class="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h4 class="text-lg font-semibold text-gray-800 mb-2">Analytics Dashboard</h4>
            <p class="text-gray-600">Track performance and optimize your content strategy</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-blue-600 py-16">
      <div class="max-w-4xl mx-auto px-6 text-center text-white">
        <h3 class="text-3xl font-bold mb-4">Ready to automate your video creation?</h3>
        <p class="text-blue-100 mb-8">Join thousands of creators using VideoAI</p>
        <NuxtLink
          to="/register"
          class="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-block"
        >
          Get Started Now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Landing page
</script>
