<template>
  <li
    class="p-4 bg-white rounded-lg shadow transition-shadow hover:shadow-md mx-auto"
    style="max-width: 500px;"
  >
    <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate">
      {{ notename }}
    </h3>
    <p class="text-sm text-gray-600">
      {{ text }}
    </p>
  </li>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: '',
  },
  notename: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>
