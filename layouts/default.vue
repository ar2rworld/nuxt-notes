<script setup>
const websiteStore = useWebsiteStore();

</script>
<template>
  <div>
    <AppHeader />
    <nav>
      <ul class="nav-list">
        <MyLink name="Home" path="/" />
        <MyLink name="About" path="/about" />

        <MyLink v-if="websiteStore.username === ''" name="Login" path="/login" />
        <MyLink v-else name="Logout" path="/logout" />
      </ul>
    </nav>
    <div class="py-2 px-4">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}
</style>
