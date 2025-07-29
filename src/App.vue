<template>
  <nav class="container-fluid">
    <ul>
      <li><strong>🍽️ Recepti</strong></li>
    </ul>
    <ul>
      <li><a href="/">Početna</a></li>
    </ul>
  </nav>
  <nav>
  <router-link to="/favoriti">Favoriti</router-link>
</nav>


  <main class="container">
    <router-view />
  </main>
</template>

<script lang="ts" setup>
</script>
<style scoped>


nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

nav ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  display: flex;
}
</style>
