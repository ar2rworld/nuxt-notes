<script setup>
defineProps({
  name: {
    type: String,
    default: 'Home'
  },
  path: {
    type: String,
    default: '/',
  }
})
</script>

<template>
  <li class="nav-item">
    <NuxtLink :to="path" class="nav-link">{{ name }}</NuxtLink>
  </li>
</template>

<style scoped>
.nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.nav-item {
  margin: 0;
}

.nav-link {
  text-decoration: none;
  color: #007BFF;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #0056b3;
}
</style>
